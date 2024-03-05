"use client";
import TopTalentSearch from "#components/events/top-talent";
import Slider from "react-slick";

import talent_data from "#__mocks__/talent.json";
import AvailableTalents from "#components/events/available-talents";
import React, { useLayoutEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { changePageCtx } from "#stores/pages/pageCtxSlice";

const Events = () => {
  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Talent Search",
        isSearchActive: true,
        isActiveShare: false,
        isBackActive: false,
        isCreateButtonActive: false,
        isFavoriteBtnActive: true,
      })
    );
  }, []);
  return (
    <div className="px-2">
      <div>
        <h3 className="text-lg pt-4 pb-3 font-medium">
          Top talents in your area
        </h3>
        <Slider {...settings}>
          {talent_data.top_talent.map((talent: any, i: number) => {
            return (
              <TopTalentSearch
                key={i}
                ownerId={0}
                badge={talent.badge}
                thumb={talent.thumb}
                avatar={talent.avatar}
                title={talent.title}
                total_event={talent.total_events}
              />
            );
          })}
        </Slider>
      </div>
      <div>
        <h3 className="text-xl pt-6 pb-3 font-medium">All available talents</h3>
        <div className="-mt-5">
          {talent_data.available_talents.map(
            (available_talents: any, i: number) => {
              return (
                <AvailableTalents
                  key={i}
                  title=""
                  ownerId={0}
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
    </div>
  );
};

export default Events;
