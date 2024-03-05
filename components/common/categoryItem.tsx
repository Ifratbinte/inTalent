import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface ItemsInterface {
  avatar: string;
  category: string;
  value: string;
}

const CategoryItem: React.FC<ItemsInterface> = ({ avatar, category, value }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <img src={avatar} alt={category} className="mr-3" />
        <span className="font-lato font-medium text-[14px] text-[#270341]">{category}</span>
      </div>
      <FormControlLabel value="female" control={<Radio />} label="" className='!right-10'/>
    </div>
  );
};

export default CategoryItem;
