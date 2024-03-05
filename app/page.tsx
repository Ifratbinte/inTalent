"use client";

import React from "react";

import Login from "./auth/page";
import { usePathname } from "next/navigation";
import MasterLayout from "./layout";
import { AppProps } from "next/app";
import Head from "#container/AppHead";
import Welcome from "./welcome/page";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Layout({ children }: any) {
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <>
      <Head />
      {pathname.startsWith("/auth") ? <Login /> : <Welcome />}
    </>
  );
}
