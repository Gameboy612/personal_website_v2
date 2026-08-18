import type React from "react"

export default function BarCrossAnimated({
    opened,
    setOpened,
    className = "w-15",
    barClassName = "bg-black",
}: {
    opened: boolean,
    setOpened: React.Dispatch<React.SetStateAction<boolean>>,
    className?: string,
    barClassName?: string
}) {
  return (
    <button
      aria-label={opened ? "Close navigation" : "Open navigation"}
      className={`relative aspect-square ${className}`}
      onClick={() => setOpened((value) => !value)}
      type="button"
    >
      <span
        className={`bar-cross-animated-rectangle transition-all duration-[300ms] flex flex-row-reverse left-[0%] top-[20%] ${opened ? "origin-[50%_57.5%] rotate-45 top-[50%]" : ""}`}
      >
        <span
          className={`${barClassName} block h-full transition-all duration-[270ms] ease-in-out w-full ${opened ? "origin-[0%_57.5%] scale-x-50" : ""}`}
        />
      </span>
      <span
        className={`bar-cross-animated-rectangle flex ${barClassName} top-[50%] ${opened ? "origin-[50%_57.5%] flex-row-reverse rotate-[-45deg]" : ""}`}
      />
      <span
        className={`bar-cross-animated-rectangle flex flex-row-reverse transition-all duration-[300ms] left-[0%] ${opened ? "origin-[50%_57.5%] rotate-45 top-[50%]" : "top-[80%]"}`}
      >
        <span
          className={`${barClassName} block h-full transition-all duration-[270ms] ease-in-out w-full ${opened ? "origin-[100%_57.5%] scale-x-50" : ""}`}
        />
      </span>
    </button>
  )
}
