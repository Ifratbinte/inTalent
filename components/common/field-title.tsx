import React from 'react';
interface Props {
  title: string;
}

const FieldTitle: React.FC<Props> = ({ title }) => {
  return <div className="font-lato font-semibold text-base my-2">{title}</div>;
};

export default FieldTitle;
