"use client";
import event_data from "#__mocks__/event.json";
import EventDetailsCard from "#components/events/event-details";
import { useQuery } from "#hooks/use-query";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";

import Loader from "#components/common/Loader";
import CustomModal from "#components/common/modal/CustomModal";
import axios from "#helpers/axios";
import { dateFormat } from "#helpers/date-time-format";
import generateImageUrl from "#helpers/generate-image-url";
import { RootState } from "#stores/store";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageCtx } from "#stores/pages/pageCtxSlice";

const EventDetails = ({ params }: { params: { id: number } }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const ev_details = event_data.top_event_details;
  // GET
  const { data } = useQuery<CommonRes<EventDetailsInterface>>(
    ["events-details"],
    `events/${params.id}`
  );

  const details = data?.data;

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFav = async (eventId: number) => {
    const headers = {
      accept: "*/*",
      user_id: user?.data?.id,
      "Content-Type": "application/json",
    };

    const data = {
      event_id: Number(eventId),
    };

    axios
      .post("/events/favorites", data, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const closeModalAndRedirect = () => {
    setIsModalOpen(false);
    router.push("/talent/events-search/favourites");
  };

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Event details",
        isBackActive: true,
        isFavoriteBtnActive: false,
        isActiveShare: false,
        isSearchActive: false,
        isCreateButtonActive: false,
      })
    );
  }, []);

  if (!details) {
    return <Loader />;
  } else {
    return (
      <div>
        <EventDetailsCard
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
        <CustomModal
          isOpen={isModalOpen}
          onRequestClose={closeModalAndRedirect}
          confirmation_text="Event added to favorites!"
        />
      </div>
    );
  }
};

export default EventDetails;
