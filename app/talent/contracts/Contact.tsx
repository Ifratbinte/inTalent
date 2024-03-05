"use client";
import CustomTab from "#components/common/tab/CustomTabDetails";
import React, { useLayoutEffect, useState } from "react";
import Active from "./ActiveTab";
import Inactive from "./InActiveTab";
import { useDispatch } from "react-redux";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { FaLeaf } from "react-icons/fa";

const Contact = () => {
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

  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "My Contracts",
        isBackActive: false,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: false,
      })
    );
  }, []);
  return (
    <CustomTab selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
  );
};

export default Contact;
