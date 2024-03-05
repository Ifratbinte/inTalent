"use client";

import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";

import UserMenu from "./UserMenu";
import ProfileInfo from "./ProfileInfo";
import UserDashBoard from "./UserDashBoard";

import { RootState } from "#stores/store";
import { closeUserDrawer } from "#stores/pages/pageCtxSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const { isOpenUserDrawer } = useSelector((state: RootState) => state.pageCtx);

  const handleCloseDrawer = () => {
    dispatch(closeUserDrawer());
  };

  return (
    <div>
      <Drawer open={isOpenUserDrawer} onClose={handleCloseDrawer}>
        <UserDashBoard onToggle={handleCloseDrawer}>
          {data && <ProfileInfo data={data} />}
          <div className="bg-[#532c6d] w-full text-white font-lato">
            <UserMenu type={data?.user_type?.title} />
          </div>
        </UserDashBoard>
      </Drawer>
    </div>
  );
}
