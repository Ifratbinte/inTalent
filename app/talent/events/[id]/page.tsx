import React from "react";
import EventDetails from "./EventDetails";

const page = ({ params }: { params: { id: number } }) => {
  return <EventDetails params={params} />;
};

export default page;
