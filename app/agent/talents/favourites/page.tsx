"use client";
import favourites_data from "#__mocks__/talent.json";
import FavouriteTalents from "#components/events/available-talents";
import { useLayoutEffect } from "react";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { useDispatch } from "react-redux";

const Favourites = () => {
  const dispatch = useDispatch();
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
    <div>
      <div className="p-4">
        {favourites_data.available_talents.map(
          (available_talents: any, i: number) => {
            return (
              <FavouriteTalents
                key={i}
                ownerId={0}
                id={available_talents?.id ?? 0}
                title={available_talents.title}
                badge={available_talents.badge}
                thumb={available_talents.thumb}
                talent_name={available_talents.talent_name}
                subtitle={available_talents.subtitle}
                total_event={available_talents.event}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Favourites;
