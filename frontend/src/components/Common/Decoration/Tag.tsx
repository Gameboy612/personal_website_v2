export default function Tag({ children }: { children: React.ReactNode }) {
  return (
        <span 
        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
        ><span className="mr-0.5">#</span>{children}</span>
  )
}