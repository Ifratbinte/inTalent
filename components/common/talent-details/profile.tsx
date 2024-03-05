import React from "react";
import BaseButton from "#components/common/button/baseButton";
import ProfileCard from "#components/common/profile-card";
import BtnTransparent from "#components/common/button/btnTransparent";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Function to render buttons based on the route
  const renderButtons = () => {
    if (pathname === "/talent/profile") {
      return (
        <>
          <BaseButton
            btn_style="bg-transparent text-[#532c6d] uppercase font-medium border border-[#532c6d]"
            btn_text="SHOW ID CARD"
            isRoute
            withIdCardIcon
          />
        </>
      );
    } else if (pathname === "/agent/talents/details") {
      return (
        <>
          <BaseButton
            btn_style="bg-[#e95f24] text-white uppercase font-medium"
            btn_text="invite to open event"
            isSubmitButton
          />
          <BaseButton
            btn_style="bg-transparent text-[#532c6d] uppercase font-medium border border-[#532c6d]"
            btn_text="Send Message"
            isSubmitButton
          />
        </>
      );
    }
  };
  return (
    <>
      <div>
        <div className="p-3 ">
          <p className="my-4 text-slate-500 text-sm font-lato ">
            Member since 06 Jan 2023
          </p>
          <h4 className=" text-lg font-bold font-lato">Basic information</h4>
          <ProfileCard title="Date of birth" detail_value="20/2/2024" />
          <ProfileCard title="Location" detail_value="Dubai, UAE" />
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard title="Gender" detail_value="Female" />
            </div>
            <div className="w-1/2">
              <ProfileCard title="Rate per hour" detail_value="$25.00 usd" />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard title="Height" detail_value="1.78 / 5,7" />
            </div>
            <div className="w-1/2">
              <ProfileCard title="Weight" detail_value="1.78 / 5,7" />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <div className="w-1/3">
              <ProfileCard title="Hips" detail_value="1.78 / 5,7" />
            </div>
            <div className="w-1/3">
              <ProfileCard title="Waist" detail_value="1.78 / 5,7" />
            </div>
            <div className="w-1/3">
              <ProfileCard title="Hips" detail_value="1.78 / 5,7" />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard title="Eyes" detail_value="1.78 / 5,7" />
            </div>
            <div className="w-1/2">
              <ProfileCard title="Eyes" detail_value="1.78 / 5,7" />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard title="Dress size" detail_value="1.78 / 5,7" />
            </div>
            <div className="w-1/2">
              <ProfileCard title="Shoe size" detail_value="1.78 / 5,7" />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1 border-slate-300" />
      <div className="p-3 ">
        <h4 className=" text-lg font-lato">About me</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <hr className="border-1 border-slate-300" />
      <div className="p-3 ">
        <h4 className=" text-lg font-lato">Disciplines</h4>
        <div className="grid grid-cols-3 gap-2">
          <BtnTransparent btnText="Runway" />
          <BtnTransparent btnText="Event" />
          <BtnTransparent btnText="Promotional" />
          <BtnTransparent btnText="Cover" />
          <BtnTransparent btnText="Catalog" />
          <BtnTransparent btnText="Catalog" />
          <BtnTransparent btnText="Catalog" />
        </div>
      </div>
      <div className="p-3 ">
        <h4 className=" text-lg font-lato">Languages</h4>
        <div className="flex gap-2">
          <BtnTransparent btnText="English" />
          <BtnTransparent btnText="French" />
        </div>
        {/* Buttons */}

        <div className="mt-16 mb-10">
          {/* Render buttons based on the route */}
          {renderButtons()}
        </div>
      </div>
    </>
  );
};

export default Profile;
