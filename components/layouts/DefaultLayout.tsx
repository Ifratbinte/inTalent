"use client";

import React, { useEffect, useRef, useState } from "react";
import DefaultFooter from "./footer/DefaultFooter";
import DefaultHeader from "./header/DefaultHeader";
import { MenuInterface } from "#interfaces/index";
import CustomModal from "#components/common/modal/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "#stores/store";
import { changeGlobalState } from "#stores/global/globalSlice";
import Loader from "#components/common/Loader";

interface Props {
  children: JSX.Element | JSX.Element[];
  menu: MenuInterface[];
}

const DefaultLayout: React.FC<Props> = ({ children, menu }) => {
  const dispatch = useDispatch();

  const footerRef = useRef(null);
  const headerRef = useRef(null);
  const globalState = useSelector((state: RootState) => state.globalState);

  const [compHeight, setCompHeight] = useState({
    header: null,
    footer: null,
  });

  const handleModalClose = () => {
    dispatch(
      changeGlobalState({
        isConfirmationModalOpen: false,
        confirmationModalMsg: "",
      })
    );
  };

  useEffect(() => {
    if (!footerRef.current && !headerRef.current) return;

    setCompHeight({
      header: (headerRef.current as any)?.offsetHeight,
      footer: (footerRef.current as any)?.offsetHeight,
    });
  }, [footerRef, headerRef]);
  return (
    <React.Fragment>
      <DefaultHeader headerRef={headerRef} />
      <main
        style={{
          height: `calc(100vh - ${
            (compHeight.header ?? 0) + (compHeight.footer ?? 0)
          }px)`,
          maxWidth: `calc(100vw)`,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <CustomModal
          isOpen={globalState.isConfirmationModalOpen}
          onRequestClose={handleModalClose}
          confirmation_text={globalState.confirmationModalMsg ?? ""}
        />
        {globalState.isLoading ? <Loader /> : children}
      </main>
      <DefaultFooter footerRef={footerRef} menu={menu} />
    </React.Fragment>
  );
};

export default DefaultLayout;
