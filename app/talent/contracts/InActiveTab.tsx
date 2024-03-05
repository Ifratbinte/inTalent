import React, { useMemo } from "react";
import event_data from "#__mocks__/event.json";
import InActiveContract from "#components/events/contracts";
import { useQuery } from "#hooks/use-query";
import { CommonRes } from "#interfaces/index";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { Loader } from "rsuite";

const Inactive = () => {
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
    <div className="p-3 h-screen opacity-50">
      {inactive_event.map((inactive, i: number) => {
        return (
          <InActiveContract
            key={i}
            ownerId={inactive.owner_id}
            badge={inactive.category.title}
            thumb={inactive.image}
            title={inactive.title}
            subtitle={inactive.owner.first_name}
            location={inactive.location.city}
            time={inactive.created_at}
          />
        );
      })}
    </div>
  );
};

export default Inactive;
