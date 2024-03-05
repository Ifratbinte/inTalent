"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { MdStar, MdHelp } from "react-icons/md";
import { BiSolidUser, BiDollarCircle } from "react-icons/bi";
import { IoSettingsSharp, IoShareSocial } from "react-icons/io5";

import MenuTitle from "./MenuTitle";

interface PropsType {
  type: string | undefined;
}

const UserMenu = ({ type }: PropsType) => {
  const router = useRouter();

  const linkUserProfile = `/${type?.toLowerCase()}/profile`;
  const linkUserWallet = `/${type?.toLowerCase()}/wallet`;

  const handleSignOut = () => {
    router.push("/api/auth/logout");
  };

  return (
    <React.Fragment>
      <List>
        <MenuTitle Icon={BiSolidUser}>
          <Link href={linkUserProfile}>User Profile</Link>
        </MenuTitle>
        <MenuTitle Icon={BiDollarCircle}>
          <Link href={linkUserWallet}>Wallet</Link>
        </MenuTitle>
        <MenuTitle Icon={MdStar}> Go Premium</MenuTitle>
        <MenuTitle Icon={IoSettingsSharp}> Settings</MenuTitle>
        <MenuTitle Icon={MdHelp}> Help & Support</MenuTitle>
        <MenuTitle Icon={IoShareSocial}> Share</MenuTitle>
        <Divider />
        <MenuTitle Icon={null}> Terms & Use</MenuTitle>
        <Divider />
        <MenuTitle Icon={null}> Privacy & Policy</MenuTitle>
        <Divider />
        <MenuTitle Icon={null} onClick={handleSignOut}>
          Sign out
        </MenuTitle>
      </List>
      <p className="text-xs text-gray-300 py-4 ps-4">inTalents Version 0.2</p>
      <div className="flex justify-end">
        <img className="pb-6 pt-[84px] pr-4" src="" alt="inTalents" />
      </div>
    </React.Fragment>
  );
};

export default UserMenu;
