import type { Components } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as prismstyle } from "react-syntax-highlighter/dist/esm/styles/prism"

export const mdxComponents: Components = {
    ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc ml-4 mt-4">{children}</ul>,
    ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal ml-4 mt-4">{children}</ol>,
    li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => <li className="mt-1">{children}</li>,
    h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="mt-4 text-2xl font-bold">{children}</h1>,
    h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mt-10 text-xl font-bold">{children}</h2>,
    h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-4 text-lg font-bold">{children}</h3>,
    h4: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className="mt-4 text-md font-bold">{children}</h4>,
    h5: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => <h5 className="mt-4 text-sm font-bold">{children}</h5>,
    h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => <h6 className="mt-4 text-xs font-bold" {...props}>{children}</h6>,
    hr: () => <hr className="my-6 border-gray-600" />,
    p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mt-4">{children}</p>,
    a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a className="text-blue-500 hover:underline" href={href} rel="noreferrer" target="_blank">{children}</a>
    ),
    pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-x-auto">{children}</pre>
    ),
    code: ({ children, className, ...rest }: React.HTMLAttributes<HTMLElement>) => {
        const match = /language-(\w+)/.exec(className || '')
        return match ? (
          <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={prismstyle}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={`inline text-red-600 rounded px-1 py-4 ${className || ""}`}>{children}</code>
        )
      },
    blockquote: ({ children }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-gray-400 pl-4 w-[100%] italic overflow-x-auto">{children}</blockquote>
    ),
    img: ({ alt, src }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <div className="relative w-full aspect-video drop-shadow-xl">
            <img
                className="object-contain w-full h-full rounded-lg mt-4 mb-4"
                src={src}
                alt={alt}
            />
            <p className="text-center text-gray-500">{alt}</p>
        </div>
    ),
    // ...
};
