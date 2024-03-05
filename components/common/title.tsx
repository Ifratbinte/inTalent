import React from 'react';
interface Props {
  title: string;
  title_style?: string;
}

const Title: React.FC<Props> = ({ title, title_style = 'text-center text-[#532C6D]'}) => {
  return <div className={`${title_style} text-lg mb-5 font-roboto font-medium`}>{title}</div>;
};

export default Title;
