import { createFileRoute } from "@tanstack/react-router"
import Cover from "@/components/HomePage/Cover"
import Timeline from "@/components/HomePage/Timeline"
import WhoAmI from "@/components/HomePage/WhoAmI"
import NavBar from "@/components/Common/NavBar"
// import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/")({
  component: HomePage,
})

const tags = [
  "Full Stack",
  "Cyber Security (CTF)",
  "DSE Tutoring",
  "Nutrition",
  "Game Development"
]

function HomePage() {

  return (
    <>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col items-center justify-between">
        <Cover tags={tags}/>
        <WhoAmI />
        <Timeline />
        <p className="text-center text-sm text-gray-500 mb-4">© 2025 Kapakki Lo. All rights reserved.</p>
      </div>
    </>
  )
}
