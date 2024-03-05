"use client";
import React, { FormEvent, MouseEvent, useState, useLayoutEffect } from "react";
import { BsShareFill } from "react-icons/bs";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import talent_data from "#__mocks__/talent.json";
import TalentDetailsCard from "#components/common/talent-details/talent-details-card";
import Profile from "#components/common/talent-details/profile";
import Portfolio from "#components/common/talent-details/portfolio";
import CustomTab from "#components/common/tab/CustomTabDetails";
import axios from "#helpers/axios";
import CustomModal from "#components/common/modal/CustomModal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "#stores/store";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { useDispatch } from "react-redux";
type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Profile Details",
    index: 1,
    Component: Profile,
  },
  {
    label: "Portfolio",
    index: 2,
    Component: Portfolio,
  },
];

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const details = talent_data.talent_details;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Talent Profile",
        isSearchActive: false,
        isActiveShare: true,
        isBackActive: true,
        isCreateButtonActive: false,
        isFavoriteBtnActive: false,
        isUpdateButtonActive: true,
      })
    );
  }, []);

  return (
    <>
      <TalentDetailsCard
        title=""
        ownerId={0}
        badge={details.badge}
        thumb={details.thumb}
        avatar={details.avatar}
        talent_name={details.talent_name}
        total_event={details.total_event}
        viewers={details.viewers}
        badge_OPT
      />

      <CustomTab
        selectedTab={selectedTab}
        onClick={setSelectedTab}
        tabs={tabs}
      />
    </>
  );
};

export default ProfileDetails;
