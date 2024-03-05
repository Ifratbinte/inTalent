"use client";

import React from "react";
import Slider from "react-slick";
import { AiOutlineDollar } from "react-icons/ai";
import { dateFormat } from "#helpers/date-time-format";

type PaymentDetail = {
  event: {
    id: number;
    title: string;
    owner_id: number;
    category_id: number;
    description: string;
    location_id: number;
    exp_date: null | string;
    price: number;
    duration: number;
    disciplines_id: number;
    status: string;
    price_type: string;
    image: string;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    owner: {
      first_name: string;
      last_name: string;
    };
  };
  type: string;
  amount: number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

interface PropsWalletInfo {
  children: React.ReactNode;
  paymentDetails: PaymentDetail[];
}

const WalletPaymentInfo = ({ paymentDetails, children }: PropsWalletInfo) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <div className="my-8 px-4 pb-2">
      <h1 className="font-bold text-base text-gray-800">{children}</h1>
      <Slider {...settings}>
        {paymentDetails.map((item: PaymentDetail) => (
          <div
            key={item.event.id}
            className="shadow-lg rounded mt-3 p-4 mb-2 border"
          >
            <div className="flex justify-between items-center">
              <div className="bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center">
                <AiOutlineDollar
                  size={24}
                  className="font-bold rounded-full text-[#979797]"
                />
              </div>
              <h3 className="font-bold text-base"> ${item.amount}</h3>
            </div>
            <h5 className="mt-2 text-base font-semibold">
              {item.event.owner.first_name} {item.event.owner.last_name}
            </h5>
            <p className="text-sm text-gray-600">{item.event.title}</p>
            <p className="mt-2 text-xs text-gray-500">
              {dateFormat(item.event.created_at)}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WalletPaymentInfo;
