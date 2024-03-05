"use client";

import { useChatCtx } from "#stores/contexts/chat-context.provider";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { RootState } from "#stores/store";
import { Avatar } from "@mui/material";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import Loader from "#components/common/Loader";
import { UserInterface } from "#interfaces/index";
import FormInputText from "#components/common/form/mui/FormInputText";
import { BsSearch } from "react-icons/bs";
import { Control, FieldValues, useForm } from "react-hook-form";

interface Props {
  control: Control<FieldValues, any>;
}

const MessagePage: React.FC<Props> = ({ control }) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const chatCtx = useChatCtx();

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Messages",
        isBackActive: false,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: false,
      })
    );
  }, []);

  // console.log(user.data);

  if (!user.data) {
    return <Loader />;
  }
  return (
    <>
      <div className="w-full h-full py-5 px-3">
        <FormInputText
          control={control}
          name="search"
          type="text"
          label="Search"
          icon={<BsSearch />}
        />
        {chatCtx.chats?.length > 0 ? (
          chatCtx.chats.map((chat) => (
            <MessageItem
              key={chat.id}
              data={chat}
              user={user.data || ({} as UserInterface)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <p>No data found!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default MessagePage;
