import BaseButton from "#components/common/button/baseButton";
import PortfolioCard from "#components/common/portfolio";
import React from "react";

const Portfolio = () => {
  return (
    <div className="p-3">
      <div className="flex gap-2 py-1">
        <div className="w-2/3">
          <PortfolioCard
            thumb="/images/thumb/md.png"
            title="Bogota fashion week"
          />
        </div>
        <div className="w-1/3">
          <div className="pb-2">
            <PortfolioCard thumb="/images/thumb/sm.png" title="Photoshoot" />
          </div>
          <div>
            <PortfolioCard
              thumb="/images/thumb/sm.png"
              title="Beauty campaign"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2 py-1">
        <div className="w-1/3">
          <PortfolioCard thumb="/images/thumb/sm.png" title="Photoshoot" />
        </div>
        <div className="w-2/3">
          <PortfolioCard
            thumb="/images/thumb/lg.png"
            title="Colombia next top model"
          />
        </div>
      </div>
      <div className="flex gap-2 py-1">
        <div className="w-2/3">
          <PortfolioCard thumb="/images/thumb/lg.png" title="Runway" />
        </div>
        <div className="w-1/3">
          <PortfolioCard thumb="/images/thumb/sm.png" title="Photoshoot" />
        </div>
      </div>
      <div className="mt-16 mb-10">
        <BaseButton
          btn_style="bg-[#e95f24] text-white uppercase font-medium"
          btn_text="invite to open event"
          isSubmitButton
        />
        <BaseButton
          btn_style="bg-transparent text-[#532c6d] uppercase font-medium border border-[#532c6d]"
          btn_text="Send Message"
          isSubmitButton
        />
      </div>
    </div>
  );
};

export default Portfolio;
