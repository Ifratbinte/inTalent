"use client";
import FavouritesEventSearch from "#components/events/open-event";
import { useQuery } from "#hooks/use-query";
import { EventInterface } from "#interfaces/event-interface";
import { CommonRes } from "#interfaces/index";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { RootState } from "#stores/store";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Favourites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const user_id = user?.data?.id;
  // GET
  const { data, isLoading } = useQuery<CommonRes<EventInterface[]>>(
    ["favourites"],
    "events/favorites",
    {
      onSuccess: (data: any) => {
        console.log("From success log: ", { data });
      },
      enabled: !!user?.data?.id,
    },
    {
      headers: {
        user_id: user?.data?.id,
      },
    }
  );

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Favorites",
        isBackActive: true,
        isActiveShare: false,
        isCreateButtonActive: false,
        isFavoriteBtnActive: false,
        isSearchActive: false,
      })
    );
  }, []);

  return (
    <div className="p-4">
      {data?.data.map((favourites: any, i: number) => {
        return (
          <FavouritesEventSearch
            key={i}
            ownerId={favourites?.owner_id ?? 0}
            badge="Model"
            thumb={favourites.event.image}
            title={favourites.event.title}
            subtitle={favourites.event.description}
            location="Canada"
            time={favourites.event.created_at}
          />
        );
      })}
    </div>
  );
};

export default Favourites;
