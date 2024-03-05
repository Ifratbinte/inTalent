"use client";

import optionData from "#__mocks__/talent-options.json";
import BaseButton from "#components/common/button/baseButton";
import FieldTitle from "#components/common/field-title";
import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
import FormInputText from "#components/common/form/mui/FormInputText";
import Privacy from "#components/common/privacy-text";
import Title from "#components/common/title";
import axios from "#helpers/axios";
import { UserInterface, dropdownOptionType } from "#interfaces/index";
import { addUser } from "#stores/users/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import CustomModal from "#components/common/modal/CustomModal";
import CustomDatePicker from "#components/common/form/customDatePicker";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

// types interface
type Inputs = {
  category: string;
  user_id: number;
  name: string;
  language_id: string;
  fullName: string;
  dob: string;
  street_address: string;
  street_address_2: string;
  city: string;
  state: string;
  country_code: string;
  zip: string;
};

interface Props {
  userData: UserInterface;
  categories: dropdownOptionType[];
}

const AgentProfile: React.FC<Props> = ({ userData, categories }) => {
  // hooks
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);

  // states
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);

  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const getLanguages = async () => {
    const res = await axios.get("/languages");
    if (res) {
      setLanguages(res.data);
    }
  };
  const getCountries = async () => {
    const res = await axios.get("/countries");
    if (res) {
      setCountries(res.data);
    }
  };
  useEffect(() => {
    getLanguages();
    getCountries();
  }, []);

  // api formating is incomplete
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("category", String(userData.category_id));
    // formData.append("user_id", userData?.data?.id);
    formData.append("user_id", String(userData.id));
    // if (type === "Company") {
    formData.append("name", data.name);
    formData.append("language_id", data.language_id);
    // }
    if (type === "Individual") {
      // formData.append("fullName", data.fullName);
      formData.append("dob", data.dob);
    }
    formData.append("street_address", data.street_address);
    formData.append("street_address_2", data.street_address_2);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country_id", data.country_code);
    formData.append("zip", data.zip);

    try {
      const res = await axios.post("/agents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 201) {
        setIsConfirm(true);
        // dispatch(addUser(true));
        // push("/");
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  // select options mapping
  const createOptions = (label: any, value: any) => {
    return { label, value };
  };

  const selectOption = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.name, item.name);
      return newData;
    });
    return fieldData;
  };
  const selectOptionWithId = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.name, item.id);
      return newData;
    });
    return fieldData;
  };

  let language: [] = selectOptionWithId(languages);
  let state: any = selectOptionWithId(optionData?.state);
  let country: [] = selectOptionWithId(countries);

  const closeModal = () => {
    setIsConfirm(false);
    push("/");
    // Additional logic if needed when the modal is closed
  };

  return (
    <div className="px-3 py-8">
      <div className="flex justify-center items-center section-gap-b">
        <img
          src="/images/logo/logo-dark.png"
          alt=""
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div>
        <Title title="About your business" />
        <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FieldTitle title="Selected category" />

            <FormInputDropdown
              control={control}
              label={
                categories?.find((item) => item?.value == userData.category_id)
                  ?.label || ""
              }
              name="category"
              options={categories}
              disabled={true}
            />
          </div>
          {userData.category_id === 3 ? (
            <div>
              <FieldTitle title="Company Information" />
              <FormInputText
                control={control}
                label="Company name"
                type="text"
                labelBG={false}
                multiline={false}
                name="name"
                rows={2}
              />
              <FormInputDropdown
                control={control}
                label="Language"
                name="language_id"
                options={language}
                disabled={false}
              />
            </div>
          ) : (
            <div>
              <FieldTitle title="Agent information" />
              <FormInputText
                control={control}
                label="Full name"
                type="text"
                labelBG={false}
                multiline={false}
                name="name"
                rows={2}
              />

              <CustomDatePicker
                control={control}
                name="dob"
                label="Date of Birth"
                max={new Date()}
                isRequired
                dateOnly
              />

              <FormInputDropdown
                control={control}
                label="Language"
                name="language_id"
                options={language}
                disabled={false}
              />
            </div>
          )}

          <div>
            <FieldTitle title="Main Location" />
            {/* <Controller
                render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
                  <FormControl
                    size="medium"
                    variant="outlined"
                    error={!!error}
                    fullWidth
                    className="rounded-xl my-2 bg-gray-100"
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
                    }}>
                    <InputLabel id={`category-label`}>Street Address</InputLabel>
                    <Select labelId={`category-label`} label="Street Address" value={value}>
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {generateSingleOptions()}
                    </Select>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
                control={control}
                name="street_address"
              /> */}
            <FormInputText
              control={control}
              label="Street Address"
              type="text"
              labelBG={false}
              multiline={false}
              name="street_address"
              rows={2}
            />
            <FormInputText
              control={control}
              label="Address 2"
              type="text"
              labelBG={false}
              multiline={false}
              name="street_address_2"
              rows={2}
            />
          </div>
          <div className="flex -mt-5 gap-4">
            <div className="w-1/2 mt-5">
              <FormInputText
                control={control}
                label="City"
                type="text"
                labelBG={false}
                multiline={false}
                name="city"
                rows={2}
              />
            </div>
            <div className="w-1/2 mt-5">
              <FormInputDropdown
                control={control}
                label="State"
                name="state"
                options={state}
                disabled={false}
              />
            </div>
          </div>
          <div className="flex -mt-5 gap-4">
            <div className="w-1/2 mt-5">
              <FormInputText
                control={control}
                label="Zip Code"
                type="text"
                labelBG={false}
                multiline={false}
                name="zip"
                rows={2}
              />
            </div>
            <div className="w-1/2 mt-5">
              <FormInputDropdown
                control={control}
                label="Country"
                name="country_code"
                options={country}
                disabled={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5"></div>
          <div className="grid grid-cols-2 gap-5"></div>
          <div>
            <FieldTitle title="Agent documents" />
            <FormInputText
              control={control}
              type="file"
              icon={<BsUpload />}
              labelBG={false}
              multiline={false}
              name="agent_doc"
              rows={2}
            />
            {/* <BaseButton
              btn_style="bg-transparent border border-[#532c6d] text-[#532c6d]"
              btn_text="UPLOAD FILES"
              isRoute
            /> */}
          </div>
          <div className="mt-14">
            {/* <input type="submit" /> */}
            <div>
              <BaseButton
                btn_style="bg-[#532c6d] text-white"
                btn_text="CREATE PROFILE"
                isSubmitButton
              />
            </div>

            {/* <SuccessAlert isOpen={open} onclickOpen={handleOpen} title="Your talent account was created successfully" /> */}

            <BaseButton
              btn_style="bg-transparent text-[#532c6d] border border-[#532c6d]"
              btn_text="COMPLETE PROFILE LATER"
              isRoute
            />
          </div>
        </form>
        <Privacy />
        {/* Confirmation modal */}
        {isConfirm && (
          <CustomModal
            isOpen
            onRequestClose={closeModal}
            confirmation_text="Your agent account was created successfully"
          />
        )}
      </div>
    </div>
  );
};

export default AgentProfile;
