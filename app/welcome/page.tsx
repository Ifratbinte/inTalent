"use client";

import welcome_data from "#__mocks__/welcome.json";
import { RootState } from "#stores/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const Welcome = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // == For redirecting
  const { push } = useRouter();

  // const isUser = useSelector((state: RootState) => state?.user);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user?.data?.id) {
      push("/user");
    }
  }, []);

  return user?.data?.id ? (
    <div className="relative">
      <div
        onClick={() =>
          push(
            `${
              !user?.data?.id
                ? "/user"
                : user?.data?.user_type.title == "Talent"
                ? "/talent/events"
                : "/agent/events"
            }`
          )
        }
        className="absolute cursor-pointer right-10 top-10"
      >
        <AiOutlineClose className="font-bold text-xl text-[#270341]" />
      </div>
      <div className="px-4 py-32">
        <div className="flex justify-center">
          <img src="./images/logo/logo-dark.png" alt="" />
        </div>
        <Slider {...settings}>
          {welcome_data.welcome.map((data: any, i: number) => (
            <div className="" key={i}>
              <div className="py-6 px-3 text-lg text-[#270341] text-center font-medium">
                {data.title}
              </div>
              <img
                src={data.thumb}
                alt=""
                className="py-14 flex justify-center mx-auto"
              />
              <div className="text-center">{data.description}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Welcome;
