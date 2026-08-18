import { useState } from "react";
import BarCrossAnimated from "../BarCrossAnimated";
import NavItem from "./NavItem";
import { IoIosGitBranch, IoIosHome, IoIosSettings } from "react-icons/io";

export default function NavBar() {
  const [opened, setOpened] =  useState(false);

  return (
      <nav className="left-11 top-7 fixed w-full">
        <BarCrossAnimated className="w-11" barClassName={"bg-gray-500"} opened={opened} setOpened={setOpened} />
        <ul className={`flex flex-col mt-2 gap-2`}>
          <NavItem href="#" opened={opened} description="Home">
            <IoIosHome size={20} color="currentColor" />
          </NavItem>
          <NavItem href="#timeline" opened={opened} description="Projects">
            <IoIosGitBranch size={20} color="currentColor" />
          </NavItem>
          <NavItem href="#setting" opened={opened} description="Settings">
            <IoIosSettings size={20} color="currentColor" />
          </NavItem>
        </ul>
        
      </nav>
  )
}
