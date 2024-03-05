"use client";
import CustomTab from "#components/common/tab/CustomTabDetails";
import { RootState } from "#stores/store";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Active from "./active";
import Inactive from "./inactive";
import { changePageCtx } from "#stores/pages/pageCtxSlice";

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Active",
    index: 1,
    Component: Active,
  },
  {
    label: "Inactive",
    index: 2,
    Component: Inactive,
  },
];

const Event = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const user = useSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "My Events",
        isBackActive: false,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: true,
      })
    );
  }, []);

  return (
    <>
      {/* <Header
        avatar="/images/avatar/avatar-2.png"
        title="My Events"
        createComponents={<BsPlusCircleFill />}
      /> */}
      <CustomTab
        selectedTab={selectedTab}
        onClick={setSelectedTab}
        tabs={tabs}
      />
    </>
  );
};

export default Event;
