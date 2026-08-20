import React from 'react'

export default function NavItem(
    { children, href, opened, description }: { children: React.ReactNode; href: string; opened: boolean; description: string }
) {

  const [hovered, setHovered] = React.useState(false);

  return (
    <li className={`w-14 flex flex-row gap-2 transition-all duration-[1150ms] ease-in-out ${opened ? 'translate-y-0' : 'translate-y-[-100vh]'}`}>
      <a href={href} className={`transition-all flex items-center p-1 bg-transparent border-[3px] border-gray-400 hover:border-primary justify-center w-14 h-14 aspect-square rounded-full text-sm font-medium` } onMouseEnter={() => {
        setHovered(true);
      }} onMouseLeave={() => {
        setHovered(false);
      }}>
        <div className={`w-full h-full aspect-square rounded-full transition-all text-sm font-medium flex items-center justify-center ${hovered ? ' bg-primary text-primary-text' : 'bg-primary-inactive text-primary-inactive-text '}`}>
          {children}

        </div>
      </a>
      <div className={`flex flex-row items-center  ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-0 h-0 border-y-[10px] border-r-[20px] border-transparent border-r-primary">
        </div>
        <div className={`text-primary-text min-w-[150px] px-3 py-3 text-md font-bold font-mono flex items-center justify-center transition-all duration-[400ms] ease-in-out bg-primary`}>
            {description}
        </div>

      </div>

    </li>
  )
}
