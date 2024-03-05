"use client";

import { Avatar } from "@mui/material";
import { UserInterface } from "#interfaces/index";

interface PropsData {
  data: UserInterface;
}

const ProfileInfo = ({ data }: PropsData) => {
  const { first_name, last_name, user_type } = data;

  return (
    <div className="bg-[#270341] w-full font-lato">
      <div className="ps-4 text-white py-4 tracking-wide">
        <div className="pt-[52px]">
          <Avatar src={user_type?.banner} alt={first_name} />
        </div>

        <h4 className="pt-8 font-semibold text-xl">
          {first_name} {last_name}
        </h4>
        <p className="text-sm text-gray-200 pt-1">{user_type?.title}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
