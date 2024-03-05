"use client";
import TopEventSearch from "#components/events/top-event";
import OpenEventSearch from "#components/events/open-event";
import Slider from "react-slick";
import React, { useLayoutEffect, useMemo } from "react";
import { usePost, useQuery } from "#hooks/use-query";
import { EventInterface } from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";
import generateImageUrl from "#helpers/generate-image-url";
import Link from "next/link";
import Loader from "#components/common/Loader";
import { useDispatch } from "react-redux";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { dateFormat } from "#helpers/date-time-format";
import Search from "#components/events/search";
import { useForm, useWatch } from "react-hook-form";
import { useDebounce } from "#hooks/use-debounce";

const EventsComponent = () => {
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [search, category, location, order] = useWatch({
    control,
    name: ["search", "category", "location", "order"],
  });
  console.log({ category, location, order });

  const debouncedSearchTerm = useDebounce(search, 500);

  // GET
  const { data, isLoading } = useQuery<CommonRes<EventInterface[]>>(
    ["events", category, location, order, debouncedSearchTerm],
    "events/",
    {},
    {
      params: {
        orderBy: order,
        search: debouncedSearchTerm,
        category,
        location,
      },
    }
  );

  // const top_event = data?.location ?.filter((item: any) => item.city === "Dhaka");

  const open_event = useMemo(
    () => data?.data.filter((item: any) => item.status === "in_progress"),
    [data]
  );

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Event Search",
        isSearchActive: true,
        isActiveShare: false,
        isBackActive: false,
        isCreateButtonActive: false,
        isFavoriteBtnActive: true,
      })
    );
  }, []);

  // isLoading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="px-2">
      <Search control={control} />
      <div>
        <h3 className="text-lg pt-4 pb-3 font-medium">
          Top events in your area
        </h3>
        {open_event && open_event?.length > 0 ? (
          <Slider {...settings}>
            {open_event?.map((top_event: any, i: number) => {
              return (
                <Link href={`/talent/events/${top_event.id}`}>
                  <TopEventSearch
                    key={i}
                    ownerId={top_event?.owner_id ?? 0}
                    badge={top_event.category.title}
                    thumb={top_event.image}
                    title={top_event.title}
                    subtitle={top_event.description}
                    location={top_event.location.city}
                  />
                </Link>
              );
            })}
          </Slider>
        ) : (
          <div>No data found...</div>
        )}
      </div>
      <div>
        <h3 className="text-lg pt-4 pb-3 font-medium">All open events</h3>
        <div className="-mt-5">
          {open_event && open_event?.length > 0 ? (
            open_event?.map((open_event: any, i: number) => {
              return (
                <Link href={`/talent/events/${open_event.id}`}>
                  <OpenEventSearch
                    key={i}
                    ownerId={open_event?.owner_id ?? 0}
                    badge={open_event.category.title}
                    thumb={open_event.image}
                    title={open_event.title}
                    subtitle={open_event.description}
                    location={open_event.location.city}
                    time={dateFormat(open_event.created_at)}
                  />
                </Link>
              );
            })
          ) : (
            <div>No data found!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsComponent;
