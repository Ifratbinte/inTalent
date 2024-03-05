"use client";

import UserPage from "#components/pages/user";
import Agent from "#components/pages/user/Agent";
import Talent from "#components/pages/user/Talent";
import { useQuery } from "#hooks/use-query";
import { CommonRes, UserInterface, UserTypeInterface } from "#interfaces/index";
import { addUser } from "#stores/users/userSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

//

const UserAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const {
    user: sessionData,
    error: sessionError,
    isLoading: sessionIsLoading,
  } = useUser();

  const userEmail = useMemo(() => {
    if (!sessionIsLoading) {
      const { nickname, sub, name } = sessionData || {};
      const emailHead = sub?.split("|")[0];
      if (emailHead === "google-oauth2") {
        return nickname?.trim().concat("@gmail.com");
      } else {
        return name;
      }
    }
  }, [sessionIsLoading, sessionData]);

  const [type, setType] = useState<string | null>(null);

  const { data } = useQuery<CommonRes<UserTypeInterface[]>>(
    ["user_type"],
    "user-types/"
  );
  const {
    data: userData,
    refetch: refetchUserData,
    isLoading,
  } = useQuery<CommonRes<UserInterface>>(
    ["user", `${userEmail}`],
    `users/find?email=${userEmail}`,
    {
      enabled: !!userEmail,
    }
  );

  const handleTypeChange = (type: UserTypeInterface) => {
    setType(type.title);
    const params = new URLSearchParams(searchParams);
    params.set("type", type.title);
    router.push(pathname + "?" + params.toString());
  };

  const handleReset = () => {
    setType(null);
    router.push(pathname);
  };

  // Effects
  useEffect(() => {
    const param = searchParams.get("type");
    if (param) {
      setType(param);
    }
  }, []);

  useEffect(() => {
    if (!userData?.data) return;
    dispatch(addUser(userData.data));

    if (userData?.data?.Agent?.id) {
      router.push("/agent/events");
    } else if (userData?.data?.Talent?.id) {
      router.push("/talent/events");
    } else if (
      !userData?.data?.Agent &&
      !userData?.data?.Talent &&
      userData?.data?.id
    ) {
      setType(userData.data.user_type.title);
      router.push(`/user?type=${userData.data.user_type.title}`);
    }
  }, [userData]);

  switch (type) {
    case "Talent":
      return (
        <Talent
          type={type}
          typeId={data?.data.find((i) => i.title == "Talent")?.id ?? 0}
          userData={userData?.data ?? ({} as UserInterface)}
          email={userEmail ?? ""}
          refetch={refetchUserData}
          handleReset={handleReset}
        />
      );
    case "Agent":
      return (
        <Agent
          type={type}
          typeId={data?.data.find((i) => i.title == "Agent")?.id ?? 0}
          userData={userData?.data ?? ({} as UserInterface)}
          refetch={refetchUserData}
          handleReset={handleReset}
        />
      );
    default:
      return (
        <UserPage userType={data?.data} handleTypeChange={handleTypeChange} />
      );
  }
};

export default UserAccount;
