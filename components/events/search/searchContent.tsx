"use client";

import event_data from "#__mocks__/event.json";
import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
import FormInputRadio from "#components/common/form/mui/FormInputRadio";
import FormInputText from "#components/common/form/mui/FormInputText";
import FormSearch from "#components/common/form/mui/FormSearch";
import { useQuery } from "#hooks/use-query";
import { EventCategoryInterface } from "#interfaces/event-interface";
import { CommonRes, CountryInterface } from "#interfaces/index";
import { closeSearchPanel } from "#stores/pages/pageCtxSlice";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Control, FieldValues, useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";

type Inputs = {
  firstName: string;
  lastName: string;
  phone: string;
  fieldRequired: string;
};

interface Props {
  control: Control<FieldValues, any>;
}

const SearchContent: React.FC<Props> = ({ control }) => {
  const dispatch = useDispatch();

  const { data: countries } = useQuery<CountryInterface[]>(
    ["countries"],
    "countries"
  );
  const { data: categories } = useQuery<CommonRes<EventCategoryInterface[]>>(
    ["categories"],
    "event-categories"
  );

  const orderbySearchOptions = [
    {
      id: 1,
      label: "Date created",
      value: "date",
    },
    {
      id: 2,
      label: "Ascending",
      value: "asc",
    },
    {
      id: 3,
      label: "Descending",
      value: "desc",
    },
    {
      id: 4,
      label: "Rating",
      value: "rating",
    },
    {
      id: 5,
      label: "Most popular",
      value: "popular",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center p-4 mt-2 mb-2">
        <h4 className="text-lg font-medium font-lato">Search</h4>
        <FiX
          onClick={() => dispatch(closeSearchPanel())}
          className="text-xl cursor-pointer hover:text-red-600 transition duration-150"
        />
      </div>
      <FormInputText
        control={control}
        name="search"
        type="text"
        label="Search"
        icon={<BsSearch />}
      />
      <div className="border-t-2 border-t-gray-200 mt-4"></div>
      <div className="p-4">
        <div className="mb-5">
          <h5 className="text-base font-medium font-lato my-2">Filters</h5>
          <FormInputDropdown
            control={control}
            name="category"
            label="Select Category"
            options={
              categories?.data
                ? categories?.data?.map((category) => ({
                    label: category.title,
                    value: category.id,
                  }))
                : []
            }
            disabled={false}
          />
          <FormInputDropdown
            control={control}
            name="location"
            label="Select Location"
            options={
              countries
                ? countries?.map((country) => ({
                    label: country.name,
                    value: country.id,
                  }))
                : []
            }
            disabled={false}
          />
        </div>
        <div>
          <h5 className="text-base font-medium font-lato my-3">Order By</h5>
          <FormInputRadio
            control={control}
            name="order"
            options={orderbySearchOptions}
          />
        </div>
      </div>
    </>
  );
};

export default SearchContent;
