"use client";
import Loader from "#components/common/Loader";
import ActiveEvent from "#components/events/open-event";
import { dateFormat } from "#helpers/date-time-format";
import generateImageUrl from "#helpers/generate-image-url";
import { useQuery } from "#hooks/use-query";
import {
  EventDetailsInterface,
  EventInterface,
} from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";
import Link from "next/link";
import { useMemo } from "react";

const Active = () => {
  // GET
  const { data, isLoading } = useQuery<CommonRes<EventDetailsInterface[]>>(
    ["events"],
    "events/"
  );

  const active_event = useMemo(
    () => data?.data?.filter((item) => item.status === "in_progress") || [],
    [data]
  );

  // isLoading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-3 h-full">
      {active_event?.map((active_event, i: number) => {
        return (
          <Link href={`/agent/events/${active_event.id}`}>
            <ActiveEvent
              ownerId={active_event.owner_id}
              key={i}
              badge={active_event.category.title}
              thumb={active_event.image}
              title={active_event.title}
              subtitle={active_event.description}
              location={active_event.location.city}
              time={dateFormat(active_event.created_at)}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Active;
