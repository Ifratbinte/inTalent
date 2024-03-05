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
import { yupResolver } from "@hookform/resolvers/yup";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import * as Yup from "yup";
import TalentProfile from "./TalentProfile";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  category: any;
  fieldRequired: string;
};

// field validation
const schema = Yup.object().shape({
  category: Yup.number().required(),
  firstName: Yup.string().required().min(1),
});

interface Props {
  type: string;
  typeId: number;
  userData: UserInterface;
  email: string;
  handleReset: () => void;
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch: boolean;
  }) => Promise<UseQueryResult>;
}

const Talent: React.FC<Props> = ({
  type,
  typeId,
  userData,
  email,
  refetch,
  handleReset,
}) => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const { data: categories } = useQuery<dropdownOptionType[]>(
    ["categories", typeId],
    `categories?user_type=${typeId}`,
    {
      enabled: !!typeId,
      select: (res: CommonRes<UserCategoryInterface[]>) =>
        res?.data?.map((item) => ({ label: item.name, value: item.id })),
    }
  );

  // == For redirecting

  //  google= {
  //     "given_name": "Mosnur",
  //     "family_name": "Ahmed",
  //     "nickname": "mosnurahmed01",
  //     "name": "Mosnur Ahmed",
  //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocLexVZlyfOChKRrpE14l3D1nHWbZkYRcNJEUskqvTrGqw=s96-c",
  //     "locale": "en",
  //     "updated_at": "2023-11-01T16:00:20.271Z",
  //     "sub": "google-oauth2|116051855370652427935",
  //     "sid": "ztocPSHfJijtEd3SZg4z9ZCgl6X5WjGu"
  // }

  // email={
  //   "nickname": "xeref36486",
  //   "name": "xeref36486@soebing.com",
  //   "picture": "https://s.gravatar.com/avatar/47400bbfdb98b8b571b7a11475f8c367?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fxe.png",
  //   "updated_at": "2023-11-01T16:55:58.454Z",
  //   "sub": "auth0|6542831e26841df79a7e0b89",
  //   "sid": "H4C7Bx-Qho-8xLXYU0kdOJ6jAqDg5gto"
  // }

  // react hook
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver<any>(schema),
  });

  useEffect(() => {
    if (userData?.Talent?.id) {
      router.push("/talent/events-search");
    }
  }, [userData]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("phone", data.phone);
    formData.append("category_id", data.category);
    formData.append("email", email);
    formData.append("user_type_id", String(typeId));
    selectedFile && formData.append("avatar", selectedFile, selectedFile?.name);

    try {
      const res = await axios.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status >= 200 && res?.status <= 300) {
        refetch();
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return userData?.id ? (
    <TalentProfile userData={userData} />
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
        <Title title="Create your talent account" />
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
          <FormInputDropdown
            control={control}
            label="Select Category"
            name="category"
            options={categories ?? []}
            disabled={false}
          />

          {/* <input type="submit" /> */}
          <BaseButton
            // path="/user/talent/about-talent"
            btn_style="bg-primary text-white"
            btn_text="NEXT"
            // isRoute
            isSubmitButton
          />

          <Button label="Previous" onClick={handleReset} />
        </form>
        <Privacy />
      </div>
    </div>
  );
};

export default Talent;
