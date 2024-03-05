"use client";
import ImageUpload from "#components/common/ImageUpload";
import { Button } from "#components/common/button";
import BaseButton from "#components/common/button/baseButton";
import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
import FormInputText from "#components/common/form/mui/FormInputText";
import Privacy from "#components/common/privacy-text";
import Title from "#components/common/title";
import axios from "#helpers/axios";
import generateImageUrl from "#helpers/generate-image-url";
import { useQuery } from "#hooks/use-query";
import {
  CommonRes,
  UserCategoryInterface,
  UserInterface,
  dropdownOptionType,
} from "#interfaces/index";
// import { addCategory, addUserData } from "#stores/users/userSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AgentProfile from "./AgentProfile";
import { UseQueryResult } from "@tanstack/react-query";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  category_id: string;
  fieldRequired: string;
};

// field validation
const schema = Yup.object().shape({
  category_id: Yup.number().required(),
  firstName: Yup.string().required().min(1),
});

interface Props {
  type: string;
  typeId: number;
  userData: UserInterface;
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
  handleReset: () => void;
}

const Agent: React.FC<Props> = ({
  type,
  typeId,
  userData,
  refetch,
  handleReset,
}) => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const { data: userCategories } = useQuery<dropdownOptionType[]>(
    ["user_type", typeId],
    `categories?user_type=${typeId}`,
    {
      enabled: !!typeId,
      select: (res: CommonRes<UserCategoryInterface[]>) =>
        res.data.map((item) => ({ label: item?.name, value: item?.id })),
    }
  );

  const { user, error, isLoading } = useUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver<any>(schema),
  });

  const { nickname, sub, name } = user || {};
  // == For redirecting
  const { push } = useRouter();

  //Email Generating
  let email: any;
  if (!isLoading) {
    const emailHead = sub?.split("|")[0];
    if (emailHead === "google-oauth2") {
      email = nickname?.trim().concat("@gmail.com");
    } else {
      email = name;
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("phone", data.phone);
    formData.append("email", email);
    formData.append("category_id", data.category_id);
    formData.append("user_type_id", String(typeId));
    selectedFile && formData.append("avatar", selectedFile, selectedFile?.name);
    try {
      const res = await axios.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 201) {
        refetch();
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    if (userData?.Agent?.id) {
      router.push("/agent/talent-search");
    }
  }, [userData]);

  return userData?.id ? (
    <AgentProfile userData={userData} categories={userCategories || []} />
  ) : (
    <div className="px-3 py-8">
      <div className="flex justify-center items-center section-gap-b">
        <img
          src="/images/logo/logo-dark.png"
          alt=""
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div>
        <div className="flex justify-center items-center mb-3">
          <ImageUpload
            setSelectedFile={setSelectedFile}
            avatar={userData?.avatar ? generateImageUrl(userData.avatar) : ""}
          />
        </div>
        <Title title="Create your agent account" />
        <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="grid grid-cols-2 gap-3">
            {/* first name */}
            <FormInputText
              control={control}
              label="First Name"
              type="text"
              labelBG={false}
              multiline={false}
              name="firstName"
              rows={2}
            />
            {/* error msg */}
            {errors.fieldRequired && (
              <span className="text-red-500 text-xm pt-2">
                This field is required
              </span>
            )}
            {/* last name */}
            <FormInputText
              control={control}
              label="Last Name"
              type="text"
              labelBG={false}
              multiline={false}
              name="lastName"
              rows={2}
            />
          </div>

          {/* phone */}
          <FormInputText
            control={control}
            label="Phone"
            type="text"
            icon={<BsFillTelephoneFill />}
            labelBG={false}
            multiline={false}
            name="phone"
            rows={2}
          />
          {/* category */}

          <FormInputDropdown
            control={control}
            label="Select Category"
            name="category_id"
            options={userCategories ?? []}
            disabled={false}
          />
          <BaseButton
            btn_style="bg-[#532c6d] text-white"
            btn_text="NEXT"
            isSubmitButton
          />
          <Button label="Previous" onClick={handleReset} />
        </form>
        <Privacy />
      </div>
    </div>
  );
};

export default Agent;
