import React, { FC } from "react";

type TabsProps = {
  tabs: {
    label: string;
    icon?: any;
    index: number;
    Component: FC<{ index: number }>;
  }[];
  selectedTab: number;
  onClick: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  isButton?: boolean;
};

/**
 * Avalible Props
 * @param className string
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 * @param orientation Tab orientation Vertical | Horizontal
 */
const Tabs: FC<TabsProps> = ({
  className = "tabs-component",
  tabs = [],
  selectedTab = 0,
  onClick,
  orientation = "horizontal",
  isButton,
}) => {
  const CustomTab = tabs && tabs.find((tab) => tab.index === selectedTab);

  return (
    <div
      className={`h-full ${
        orientation === "vertical" ? className + " vertical" : className
      }`}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        className="flex justify-between flex-wrap relative bg-[#270341]"
      >
        {tabs.map((tab) => (
          <button
            className={`flex flex-col items-center justify-center gap-1 ${
              selectedTab === tab.index
                ? "active text-white border-orange-600"
                : "text-[#9880a7] border-transparent"
            } cursor-pointer inline-block font-normal text-[14px] tracking-wide uppercase mr-2.5 px-10 py-3 border-b-4`}
            onClick={() => onClick(tab.index)}
            key={tab.index}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.index}
            aria-controls={`tabpanel-${tab.index}`}
            tabIndex={selectedTab === tab.index ? 0 : -1}
            id={`btn-${tab.index}`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
        className="w-full h-full"
      >
        {CustomTab && <CustomTab.Component index={selectedTab} />}
      </div>
    </div>
  );
};
export default Tabs;
