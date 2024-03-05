import ActiveContract from "#components/events/contracts";
import { useQuery } from "#hooks/use-query";
import { EventDetailsInterface } from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";
import { useMemo } from "react";
import { Loader } from "rsuite";

const Active = () => {
  // GET
  const { data, isLoading } = useQuery<CommonRes<EventDetailsInterface[]>>(
    ["events"],
    "events/"
  );

  const active_event: EventDetailsInterface[] = useMemo(
    () => data?.data?.filter((item) => item.status === "in_progress") || [],
    [data]
  );
  // isLoading
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="p-3 h-screen">
      {active_event?.length > 0 &&
        active_event.map((active, i: number) => {
          return (
            <ActiveContract
              key={i}
              ownerId={active.owner_id}
              id={active.id}
              badge={active.category.title}
              thumb={active.image}
              title={active.title}
              subtitle={`${active.owner.first_name}`}
              location={active.location.city}
              time={active.created_at}
            />
          );
        })}
    </div>
  );
};

export default Active;
