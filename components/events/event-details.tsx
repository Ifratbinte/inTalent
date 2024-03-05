"use client";

import { Button } from "#components/common/button";
import BtnTransparent from "#components/common/button/btnTransparent";
import CategoryBadge from "#components/common/categoryBadge";
import FormInputText from "#components/common/form/mui/FormInputText";
import TextWithIcon from "#components/common/list/text-with-icon";
import BaseModal from "#components/common/modal/BaseModal";
import Rating from "#components/common/rating";
import { usePost } from "#hooks/use-query";
import { EventInterface } from "#interfaces/event-interface";
import { callConfirmationModal } from "#stores/global/globalSlice";
import { RootState, useAppDispatch } from "#stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiClock } from "react-icons/fi";
import { IoDocumentTextOutline, IoLocationSharp } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { IoCloseCircleOutline } from "react-icons/io5";

const EventDetailsCard: React.FC<EventInterface> = ({
  badge,
  thumb,
  title,
  publishedDate,
  isContracts,
  startDate,
  client,
  rating,
  review,
  desc,
  location,
  time,
  payment,
  ownerId,
}) => {
  // Redux
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  // State
  const [modal, setModal] = useState<null | "apply" | "finish-contract">(null);

  const agentUser = user.data?.Agent !== null;

  // Form controller
  const applyFormSchema = yup.object().shape({
    message: yup
      .string()
      .required("Message is required")
      .min(5, "Message must be at least 5 character"),
  });
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    resolver: yupResolver(applyFormSchema),
    defaultValues: { message: "" },
  });

  // Hooks
  const { mutate } = usePost("chats", {
    onSuccess: () => {
      reset();
      setModal(null);
      dispatch(
        callConfirmationModal({
          content: "Your application was sent successfully",
          time: 600,
        })
      );
    },
  });

  // Actions
  const onSubmit = (data: any) => {
    mutate({
      talent_id: user.data?.id,
      owner_id: user.data?.id,
      agent_id: ownerId,
      content: data?.message,
    });
  };

  // console.log(user.data);
  console.log(ownerId);
  // console.log(user.data?.id);

  const handleClose = () => {
    setModal(null);
  };
  return (
    <div>
      <BaseModal
        open={
          (isContracts && modal === "finish-contract") ||
          (!isContracts && modal === "apply")
        }
        handleClose={handleClose}>
        {isContracts ? (
          <>
            <h2 id="parent-modal-title">Finish contract modal</h2>
            <p id="parent-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="py-5 relative">
            <div
              className="absolute top-0 right-0 text-red-500 text-2xl hover:text-red-600 cursor-pointer"
              title="Close"
              onClick={handleClose}>
              <IoCloseCircleOutline />
            </div>
            <div className="flex flex-col items-center text-center">
              <IoDocumentTextOutline size={50} color="gray" className="mb-3" />

              <h3 className="text-xl font-bold mb-2">Event application</h3>
              <p className="text-gray-600 text-sm mb-3">
                An optional message to agent can be also included in your
                application.
              </p>
              <FormInputText
                control={control}
                name="message"
                multiline={true}
                label="Message to agent"
                rows={2}
                type="text"
                labelBG={false}
              />
              <Button label="Apply" variant="secondary" type="submit" />
            </div>
          </form>
        )}
      </BaseModal>
      <div className="relative">
        <Image
          src={thumb ?? ""}
          alt={title}
          width={400}
          height={160}
          layout="responsive"
          placeholder="blur"
          blurDataURL="/images/placeholder.png"
          className="w-full h-[200px]"
        />
        <span className="bg-[#81579c] w-fit px-4 py-[2px] uppercase rounded-full m-2 text-slate-100 text-[11px] tracking-wider absolute top-1">
          {badge}
        </span>
        <CategoryBadge badge={badge} />
      </div>

      <div className="bg-[#270341] p-4">
        <h4 className="text-white mb-2 text-xl font-lato">{title}</h4>
        <div className="flex justify-between items-center">
          <span className="text-[#b9a4c7] text-sm">{client}</span>
          <div className="flex gap-6">
            <Rating />
            <div className="flex gap-1">
              <span className="text-slate-300 text-[12px]">{rating}</span>
              <span className="text-slate-300 text-[12px]">({review})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5 px-3">
        <div className="text-gray-400 text-[13px] mb-4 font-lato">
          Published on <span>{publishedDate}</span>
        </div>
        {isContracts && (
          <div className="flex justify-between">
            <div className="text-gray-400 text-[13px] mb-4 font-lato">
              Published on <span>{publishedDate}</span>
            </div>
            <div className="text-gray-400 text-[13px] mb-4 font-lato">
              Started on <span>{startDate}</span>
            </div>
          </div>
        )}
        <div className="mt-2">
          <h5 className="text-base font-bold tracking-tight font-lato mb-2">
            Description
          </h5>
          <p className="mb-3 text-sm text-[#263238] line-clamp-3">{desc}</p>
        </div>
        <div className="mt-6">
          <h5 className="text-base font-bold tracking-tight font-lato my-2">
            Required languages
          </h5>
          <div className="flex gap-2">
            <BtnTransparent btnText="English" />
            <BtnTransparent btnText="French" />
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4">
        <ul className="mx-4 mb-10">
          <li className="py-2 my-1">
            <TextWithIcon icon={<IoLocationSharp />} text={location} />
          </li>
          <li className="py-2 my-1">
            <TextWithIcon
              icon={<FiClock />}
              // text="Job open till 30 January 2023"
              text={time}
            />
          </li>
          <li className="py-2 my-1">
            <TextWithIcon icon={<MdOutlineAttachMoney />} text={payment} />
          </li>
        </ul>
        {!agentUser ? (
          <Button
            label={!isContracts ? "Apply" : "Finish Contracts"}
            variant="secondary"
            type="submit"
            onClick={() => setModal(!isContracts ? "apply" : "finish-contract")}
          />
        ) : (
          <div>
            <Button label="Invite Talent" variant="secondary" type="submit" />
            <Button
              label=" Finish Event"
              variant="outline-secondary"
              type="submit"
            />
          </div>
        )}
        {/* <Button
          label={!isContracts ? "Apply" : "Finish Contracts"}
          variant="secondary"
          type="submit"
          onClick={() => setModal(!isContracts ? "apply" : "finish-contract")}
        /> */}
      </div>
    </div>
  );
};

export default EventDetailsCard;
