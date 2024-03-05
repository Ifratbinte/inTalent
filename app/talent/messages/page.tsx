"use client";
import React from "react";
import MessagePage from "#components/messages/MessagePage";
import { Control, FieldValues, useForm } from "react-hook-form";

const page = () => {
  const { control } = useForm();
  return <MessagePage control={control} />;
};

export default page;
