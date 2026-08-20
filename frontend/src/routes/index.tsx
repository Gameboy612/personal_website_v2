import { createFileRoute } from "@tanstack/react-router"
import Cover from "@/components/HomePage/Cover"
import Timeline from "@/components/HomePage/Timeline"
import WhoAmI from "@/components/HomePage/WhoAmI"
import NavBar from "@/components/Common/NavBar"
import WhoAreYou from "@/components/HomePage/WhoAreYou"
import { useState } from "react"
import Projects from "@/components/HomePage/Projects"
import { UserContext } from "@/context/UserContext"


export const Route = createFileRoute("/")({
  component: HomePage,
})

const tags = [
  "AI Engineer",
  "Cyber Security (CTF)",
  "Game Development",
  "Nutrition",
  "Full Stack"
]




function HomePage() {

  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavBar />
      <div className="w-full min-h-screen flex flex-col items-center justify-between">
        <Cover tags={tags}/>
        <WhoAmI />
        <WhoAreYou />
        {
          ["Recruiter", "Business Owner"].includes(user) && <Projects />
        }
        {
          ["Recruiter"].includes(user) && <Timeline />
        }
        
        {/* <p className="text-center text-sm text-gray-500 mb-4">© 2026 Kapakki Lo. All rights reserved.</p> */}
      </div>
    </UserContext.Provider>
  )
}
