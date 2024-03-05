import React, { useMemo } from "react";
import event_data from "#__mocks__/event.json";
import InActiveEvent from "#components/events/open-event";
import { useQuery } from "#hooks/use-query";
import { CommonRes } from "#interfaces/index";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { Loader } from "rsuite";
import { dateFormat } from "#helpers/date-time-format";

const InActive = () => {
  // GET
  const { data, isLoading } = useQuery<CommonRes<EventDetailsInterface[]>>(
    ["events"],
    "events/"
  );

  const inactive_event: EventDetailsInterface[] = useMemo(
    () => data?.data?.filter((item) => item.status != "in_progress") || [],
    [data]
  );

  // isLoading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-3 h-full">
      {inactive_event?.length > 0 ? (
        inactive_event.map((inactive, i: number) => {
          return (
            <InActiveEvent
              key={i}
              ownerId={inactive.owner_id}
              badge={inactive.category.title}
              thumb={inactive.image}
              title={inactive.title}
              subtitle={`${inactive.owner.first_name} ${inactive.owner.last_name}`}
              location={inactive.location.city}
              time={dateFormat(inactive.created_at)}
            />
          );
        })
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>No data found!</p>
        </div>
      )}
    </div>
  );
};

export default InActive;
