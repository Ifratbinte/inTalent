"use client";
// import ImageUpload from "#components/common/ImageUpload";
// import { Button } from "#components/common/button";
// import BaseButton from "#components/common/button/baseButton";
// import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
// import FormInputText from "#components/common/form/mui/FormInputText";
// import Privacy from "#components/common/privacy-text";
// import Title from "#components/common/title";
// import axios from "#helpers/axios";
// import generateImageUrl from "#helpers/generate-image-url";
// import { useQuery } from "#hooks/use-query";
// import {
//   CommonRes,
//   UserCategoryInterface,
//   UserInterface,
//   dropdownOptionType,
// } from "#interfaces/index";
// // import { addCategory, addUserData } from "#stores/users/userSlice";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import { useDispatch } from "react-redux";
// import * as Yup from "yup";
import AgentProfile from "./AgentProfile";
// import { UseQueryResult } from "@tanstack/react-query";

// type Inputs = {
//   firstName: string;
//   lastName: string;
//   phone: string;
//   category_id: string;
//   fieldRequired: string;
// };

// // field validation
// const schema = Yup.object().shape({
//   category_id: Yup.number().required(),
//   firstName: Yup.string().required().min(1),
// });

// interface Props {
//   type: number;
//   userData: UserInterface;
//   refetch: (options?: {
//     throwOnError: boolean;
//     cancelRefetch: boolean;
//   }) => Promise<UseQueryResult>;
//   handleReset: () => void;
// }

// const UpdateAgent: React.FC<Props> = ({ type, userData }) => {
//   const { data: userCategories } = useQuery<dropdownOptionType[]>(
//     ["user_type", type],
//     `categories?user_type=${type}`,
//     {
//       enabled: !!type,
//       select: (res: CommonRes<UserCategoryInterface[]>) =>
//         res.data.map((item) => ({ label: item?.name, value: item?.id })),
//     }
//   );

//   // return <AgentProfile userData={userData} categories={userCategories || []} />;

//   return <AgentProfile />;
// };

// export default UpdateAgent;

import React from "react";

const UpdateAgent = () => {
  return (
    <div>
      <AgentProfile />;
    </div>
  );
};

export default UpdateAgent;
