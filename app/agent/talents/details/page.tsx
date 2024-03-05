"use client";
import React, { FormEvent, MouseEvent, useState } from "react";
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

const EventDetails = () => {
  const details = talent_data.talent_details;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFav = async () => {
    // e.preventDefault();
    const headers = {
      accept: "*/*",
      user_id: user?.data?.id,
      "Content-Type": "application/json",
    };

    const data = {
      event_id: 26,
    };

    axios
      .post("/events/favorites", data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    // "/events-search" bolte ki kono route ase ki na...?
    router.push("/talent/events-search/favourites");
  };

  return (
    <div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModalAndRedirect}
        confirmation_text="Added to favorites!"
      />
      <div>
        <TalentDetailsCard
          title="hello"
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
      </div>
    </div>
  );
};

export default EventDetails;
