import React from "react";
import BaseButton from "#components/common/button/baseButton";
import ProfileCard from "#components/common/profile-card";
import BtnTransparent from "#components/common/button/btnTransparent";

const Profile = () => {
  return (
    <>
      <div>
        <div className="p-3 ">
          <p className="my-4 text-slate-500 text-sm font-lato ">
            Member since 06 Jan 2023
          </p>
          <h4 className=" text-lg font-lato font-bold">Basic information</h4>
          <ProfileCard title="Label name" detail_value="Company name" />
          <h4 className=" text-lg mt-3 font-lato font-semibold">
            Main location
          </h4>
          <ProfileCard detail_value="Street address" />
          <ProfileCard detail_value="Address 2" />
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard detail_value="City" />
            </div>
            <div className="w-1/2 ">
              <ProfileCard detail_value="State" />
            </div>
          </div>
          <div className="flex gap-2 py-1">
            <div className="w-1/2">
              <ProfileCard detail_value="Zip code" />
            </div>
            <div className="w-1/2 ">
              <ProfileCard detail_value="Country" />
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1 border-slate-300" />
      <div className="p-3 my-3">
        <h4 className=" text-lg font-lato mb-3">Languages</h4>
        <div className="flex gap-2">
          <BtnTransparent btnText="English" />
          <BtnTransparent btnText="French" />
        </div>
      </div>
      <hr className="border-1 border-slate-300" />

      <div className="p-3 ">
        <h4 className=" text-lg font-lato font-bold">Company documents</h4>

        {/* grid doc */}
      </div>
    </>
  );
};

export default Profile;
