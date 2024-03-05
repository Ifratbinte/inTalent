"use client";
import React from "react";
import event_data from "#__mocks__/event.json";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "#hooks/use-query";
import { CommonRes } from "#interfaces/index";
import ContractDetailsCard from "#components/events/contract-details";
import Loader from "#components/common/Loader";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { dateFormat } from "#helpers/date-time-format";

const ContractDetails = ({ params }: { params: { id: number } }) => {
  const dispatch = useDispatch(); // Initializing useDispatch hook

  // Mock event details
  const ev_details = event_data.top_event_details;

  // Fetching event details using custom useQuery hook
  const { data } = useQuery<CommonRes<EventDetailsInterface>>(
    ["events-details"],
    `events/${params.id}`
  );

  const details = data?.data; // Storing event details in 'details' variable

  // Changing page context using Redux action on component mount
  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Active contract details",
        isBackActive: true,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: false,
      })
    );
  }, []);

  // Rendering Loader component if event details are not available
  if (!details) {
    return <Loader />;
  } else {
    // Rendering ContractDetailsCard component with event details
    return (
      <div>
        <ContractDetailsCard
          ownerId={details.owner_id}
          badge={details?.category?.title}
          thumb={details?.image ?? ""}
          title={details.title}
          client={ev_details?.client}
          rating={ev_details.rating}
          review={ev_details.review}
          publishedDate={dateFormat(details?.created_at ?? "")}
          desc={details?.description}
          location={details?.location.city}
          time={dateFormat(details?.created_at ?? "")}
          payment={details?.price}
        />
      </div>
    );
  }
};
export default ContractDetails;
