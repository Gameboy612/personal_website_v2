import React from 'react'

export default function NavItem(
    { children, href, opened, description, i }: { children: React.ReactNode; href: string; opened: boolean; description: string; i: number }
) {

  const [hovered, setHovered] = React.useState(false);

  return (
    <li className={`flex flex-row gap-2 transition-all duration-[1500ms] ease-in-out ${opened ? 'translate-y-0' : 'translate-y-[-100vh]'}`}>
      <a href={href} className={`transition-all flex bg-gray-300 text-primary border-[4px] border-gray-400 hover:border-yellow-200 hover:bg-yellow-100 hover:text-yellow-600 items-center justify-center w-11 h-11 aspect-square rounded-full text-sm font-medium` } onMouseEnter={() => {
        setHovered(true);
      }} onMouseLeave={(e) => {
        setHovered(false);
      }}>
        {children}
        </a>
        <div className={`text-primary border-[3px] rounded-full min-w-[150px] px-3 py-1 text-sm font-medium flex items-center justify-center transition-all duration-[400ms] ease-in-out border-yellow-200 bg-yellow-100 text-yellow-600 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            {description}
        </div>

    </li>
  )
}
