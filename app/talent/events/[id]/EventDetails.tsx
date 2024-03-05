"use client";
import event_data from "#__mocks__/event.json";
import Loader from "#components/common/Loader";
import EventDetailsCard from "#components/events/event-details";
import { dateFormat } from "#helpers/date-time-format";
import generateImageUrl from "#helpers/generate-image-url";
import { useQuery } from "#hooks/use-query";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { RootState } from "#stores/store";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EventDetails = ({ params }: { params: { id: number } }) => {
  const dispatch = useDispatch();
  // TODO: remove mock data and use real data from api
  const ev_details = event_data.top_event_details;
  // GET
  const { data, isLoading, isError, error } = useQuery<
    CommonRes<EventDetailsInterface>
  >(["events-details"], `events/${params.id}`);

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Event details",
        isBackActive: true,
        isFavoriteBtnActive: true,
        isActiveShare: true,
        isSearchActive: false,
      })
    );
  }, []);

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>{(error as any)?.response?.data?.message}</p>
      </div>
    );
  }

  if (!data && isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        <EventDetailsCard
          badge={data?.data?.category?.title}
          thumb={data?.data?.image ?? ""}
          title={data?.data.title}
          client={`${data?.data.owner.first_name} ${data?.data.owner.last_name}`}
          rating={ev_details.rating}
          review={ev_details.review}
          publishedDate={dateFormat(data?.data?.created_at ?? "")}
          desc={data?.data?.description}
          location={data?.data?.location.city}
          time={dateFormat(data?.data?.created_at ?? "")}
          payment={data?.data?.price}
          ownerId={data.data.owner_id}
        />
      </div>
    );
  }
};

export default EventDetails;
