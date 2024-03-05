"use client";
import MessagePage from "#components/messages/MessagePage";
import React from "react";
import { Control, FieldValues, useForm } from "react-hook-form";

const page = () => {
  const { control } = useForm();
  return <MessagePage control={control} />;
};

export default page;
