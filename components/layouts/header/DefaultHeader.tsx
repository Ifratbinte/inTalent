"use client";

import React from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { FaSearch, FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FaArrowLeft, FaHeart, FaPlusCircle, FaShareAlt } from "react-icons/fa";

import { RootState } from "#stores/store";
import { usePost } from "#hooks/use-query";
import { changeGlobalState } from "#stores/global/globalSlice";
import UserProfile from "#components/events/user-profile/UserProfile";
import { openSearchPanel, openUserDrawer } from "#stores/pages/pageCtxSlice";
import { MdEdit } from "react-icons/md";

interface HeaderInterface {
  headerRef: React.MutableRefObject<null>;
}

const DefaultHeader: React.FC<HeaderInterface> = ({ headerRef }) => {
  const param = useParams();
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const {
    title,
    isActiveShare,
    isBackActive,
    isCreateButtonActive,
    isFavoriteBtnActive,
    isSearchActive,
    isOpenUserDrawer,
    isUpdateButtonActive,
  } = useSelector((state: RootState) => state.pageCtx);

  const user = useSelector((state: RootState) => state.user);

  const { mutate } = usePost(
    "/events/favorites",
    {
      onSuccess: () => {
        dispatch(
          changeGlobalState({
            isLoading: false,
            isConfirmationModalOpen: true,
            confirmationModalMsg: "Event added to favorites!",
          })
        );

        setTimeout(() => {
          dispatch(
            changeGlobalState({
              isConfirmationModalOpen: false,
              confirmationModalMsg: "",
            })
          );
          router.push(
            path.startsWith("/talent")
              ? "/talent/events/favourites"
              : "/agent/events/favourites"
          );
        }, 600);
      },
      onError: (err) => {
        dispatch(
          changeGlobalState({
            isLoading: false,
            isError: true,
            error: err as string,
          })
        );
      },
    },
    {
      headers: {
        user_id: user?.data?.id,
      },
    }
  );

  const handleFavAction = () => {
    dispatch(changeGlobalState({ isLoading: true }));
    console.log("event id is: ", param?.id);

    mutate({
      event_id: Number(param?.id ?? 0),
    });
  };

  const handleOpenDrawer = () => {
    dispatch(openUserDrawer());
  };

  return (
    <div
      className="flex items-center justify-between bg-[#532c6d] py-5 px-4"
      ref={headerRef}>
      <div>
        {isBackActive ? (
          <div
            className="text-slate-200 text-xl w-[35px] h-[35px] flex justify-center items-center cursor-pointer"
            onClick={() => router.back()}>
            <FaArrowLeft />
          </div>
        ) : (
          <Avatar
            className="cursor-pointer"
            onClick={handleOpenDrawer}
            src={user.data?.avatar ?? ""}
            sx={{ width: 35, height: 35 }}
          />
        )}
        {isOpenUserDrawer && <UserProfile />}
      </div>

      <div>
        <div className="text-slate-200 font-normal text-xl">{title}</div>
      </div>

      <div className="flex items-center justify-end gap-4">
        {isFavoriteBtnActive && (
          <div
            className="cursor-pointer text-white text-2xl"
            onClick={handleFavAction}>
            <FaHeart />
          </div>
        )}
        {isSearchActive && (
          <span
            className="text-white text-xl"
            onClick={() => dispatch(openSearchPanel())}>
            <FaSearch />
          </span>
        )}
        {/* {isUpdateButtonActive && (
          <Link
            href="/talent/profile/edit"
            className="text-white text-xl cursor-pointer">
            <MdEdit />
          </Link>
        )} */}

        {isUpdateButtonActive && (
          <Link
            href={
              path.startsWith("/talent")
                ? "/talent/profile/edit"
                : "/agent/profile/edit"
            }
            className="text-white text-xl cursor-pointer">
            <MdEdit />
          </Link>
        )}
        {isActiveShare && (
          <span className="text-white text-xl">
            <FaShareAlt />
          </span>
        )}
        {isCreateButtonActive && (
          <Link
            href="/agent/events/event-create"
            className="text-white text-xl cursor-pointer">
            <FaPlusCircle />
          </Link>
        )}

        {/* <div>
          {createComponents && (
            <span className="text-white text-xl cursor-pointer" onClick={handleOpen}> {createComponents}</span>
          )}
          
         {open &&  <EventCreate onclickOpen={() => setOpen(false)} isOpen={open} />}
        </div> */}
      </div>
    </div>
  );
};

export default DefaultHeader;
