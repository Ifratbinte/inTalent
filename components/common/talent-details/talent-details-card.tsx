import React, { useLayoutEffect } from "react";
import { EventInterface } from "#interfaces/event-interface";
import CategoryBadge from "../categoryBadge";
import Rating from "../rating";
import Badge from "../badge";
import { IoEye } from "react-icons/io5";
import { changePageCtx } from "#stores/pages/pageCtxSlice";
import { useDispatch } from "react-redux";

const TalentDetailsCard: React.FC<EventInterface> = ({
  badge,
  thumb,
  avatar,
  talent_name,
  total_event,
  viewers,
  badge_OPT,
}) => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(
      changePageCtx({
        title: "Talent details",
        isSearchActive: false,
        isActiveShare: true,
        isBackActive: true,
        isCreateButtonActive: false,
        isFavoriteBtnActive: true,
      })
    );
  }, []);
  return (
    <div>
      <div className="relative">
        <img src={thumb} alt="" className="w-full h-[220px]" />
        <span className="bg-[#81579c] w-fit px-4 py-[2px] uppercase rounded-full m-2 text-slate-100 text-[11px] tracking-wider absolute top-1">
          {badge}
        </span>
        <CategoryBadge badge={badge} />
      </div>

      <div className="bg-[#270341] pt-6 pb-4 px-4">
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            <img src={avatar} alt="" className="w-fit h-fit" />
            <div>
              <h4 className="text-white mb-2 text-xl font-lato">
                {talent_name}
              </h4>
              <div className="flex items-center gap-3">
                <Rating />
                <span className="text-xs text-[#e3dee6]">
                  {total_event} Events
                </span>
              </div>
            </div>
          </div>
          <div>
            {badge_OPT && <Badge badge_text="Open to work" isGreen />}

            <div className="flex items-center gap-3 mt-2 text-[#e3dee6]">
              <IoEye className="text-xl" />
              <span className="text-sm font-medium">{viewers} Viewers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetailsCard;
