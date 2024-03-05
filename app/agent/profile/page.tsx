"use client";
import React, { FormEvent, MouseEvent, useState, useLayoutEffect } from "react";
import agent_data from "#__mocks__/agents/agents.json";
import Profile from "./profile";

import CustomTab from "#components/common/tab/CustomTabDetails";
import axios from "#helpers/axios";
import CustomModal from "#components/common/modal/CustomModal";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "#stores/store";
import AgentDetailsCard from "./agent-details";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { useDispatch } from "react-redux";

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

const AgentProfile = () => {
  const dispatch = useDispatch();
  const details = agent_data.agent_details;
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    router.push("/talent/events-search/favourites");
  };
  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Agent Profile",
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
    <div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={closeModalAndRedirect}
        confirmation_text="Added to favorites!"
      />
      <div>
        <AgentDetailsCard
          title=""
          ownerId={0}
          badge={details.badge}
          thumb={details.thumb}
          avatar={details.avatar}
          agent_name={details.agent_name}
          total_event={details.total_event}
        />
      </div>
      <Profile />
    </div>
  );
};

export default AgentProfile;
