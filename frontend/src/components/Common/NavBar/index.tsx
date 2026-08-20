import { useState } from "react";
import BarCrossAnimated from "../Decoration/BarCrossAnimated";
import NavItem from "./NavItem";
import { IoIosGitBranch, IoIosHome, IoIosSettings } from "react-icons/io";

export default function NavBar() {
  const [opened, setOpened] =  useState(false);

  return (
      <nav className="left-7 sm:left-8 top-6 z-10 sm:top-7 fixed w-13">
        <div className="flex flex-col items-center gap-2">
          <BarCrossAnimated className="w-11" barClassName={"bg-gray-500"} opened={opened} setOpened={setOpened} />
          <ul className={`flex flex-col mt-2 gap-2`}>
            <NavItem href="#" opened={opened} description="Home">
              <IoIosHome size={24} color="currentColor" />
            </NavItem>
            <NavItem href="#timeline" opened={opened} description="Projects">
              <IoIosGitBranch size={24} color="currentColor" />
            </NavItem>
            <NavItem href="#setting" opened={opened} description="Settings">
              <IoIosSettings size={24} color="currentColor" />
            </NavItem>
          </ul>
          

        </div>
      </nav>
  )
}
