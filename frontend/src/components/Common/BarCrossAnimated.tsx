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
      className={`relative m-3 aspect-square ${className}`}
      onClick={() => setOpened((value) => !value)}
      type="button"
    >
      <span
        className={`bar-cross-animated-rectangle ${opened ? "rotate-45 top-[50%]" : "top-[20%]"}`}
      >
        <span
          className={`${barClassName} block h-full transition-all duration-[300ms] ease-in-out ${opened ? "w-1/2" : "w-full"}`}
        />
      </span>
      <span
        className={`bar-cross-animated-rectangle ${barClassName} top-[50%] ${opened ? "rotate-[-45deg]" : ""}`}
      />
      <span
        className={`bar-cross-animated-rectangle flex flex-row-reverse ${opened ? "rotate-45 top-[50%]" : "top-[80%]"}`}
      >
        <span
          className={`${barClassName} block h-full transition-all duration-[300ms] ease-in-out ${opened ? "w-1/2" : "w-full"}`}
        />
      </span>
    </button>
  )
}
