"use client";
import optionData from "#__mocks__/talent-options.json";
import BaseButton from "#components/common/button/baseButton";
import FieldTitle from "#components/common/field-title";
import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
import FormInputText from "#components/common/form/mui/FormInputText";
import Switch from "#components/common/form/switchGreen";
import Privacy from "#components/common/privacy-text";
import Title from "#components/common/title";
import axios from "#helpers/axios";
import { UserInterface } from "#interfaces/index";
import { addUser } from "#stores/users/userSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPencilFill, BsUpload } from "react-icons/bs";
import { useDispatch } from "react-redux";
import CustomModal from "#components/common/modal/CustomModal";
import CustomDatePicker from "#components/common/form/customDatePicker";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

type Inputs = {
  category: number;
  dob: string;
  gender: string;
  country_id: string;
  about_me: string;
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
  eyes: string;
  hair: string;
  dress_size: string;
  shoe_size: string;
  shoe_size_unit: string;
  discipline_id: string;
  dress_size_unit: string;
  portfolio: string;
  is_open_to_work: string;
  location: [];
  fieldRequired: string;
};

interface Props {
  userData: UserInterface;
}

const TalentProfile: React.FC<Props> = ({ userData }) => {
  // == State of all select option
  const [countries, setCountries] = useState([]);
  const [catagories, setCatagories] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false);

  const dispatch = useDispatch();

  // == For redirecting
  const { push } = useRouter();

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const getCatagories = async () => {
    const res = await axios.get("/categories");
    if (res) {
      setCatagories(res.data.data);
    }
  };
  const getDiscipliness = async () => {
    const res = await axios.get("/disciplines");
    if (res) {
      setDisciplines(res.data);
    }
  };
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
    // set value in category select box (Not working)
    if (userData?.Talent?.id) {
      push("/talent/events-search");
    }
  }, []);

  useEffect(() => {
    getCatagories();
    getLanguages();
    getDiscipliness();
    getCountries();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const obj = {
      user_id: userData?.id,
      dob: data?.dob ? new Date(data.dob) : null,
      gender: data?.gender?.toLowerCase(),
      about_me: data?.about_me,
      height: data?.height,
      weight: data?.weight,
      bust: data?.bust,
      waist: data?.waist,
      hips: data?.hips,
      eyes: data?.eyes,
      hair: data?.hair,
      dress_size: data?.dress_size,
      dress_size_unit: data?.dress_size_unit,
      shoe_size: data?.shoe_size,
      shoe_size_unit: data?.shoe_size_unit,
      discipline_id: data?.discipline_id,
      portfolio: data?.portfolio,
      country_id: data?.country_id,
      is_open_to_work: true,
    };

    try {
      const res = await axios.post("/talents", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.status === 201) {
        setIsConfirm(true);
        // dispatch(updataIsUser(true));
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

  const selectOptionWithId = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.name, item.id);
      return newData;
    });
    return fieldData;
  };
  const selectOptionWithTitle = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.title, item.id);
      return newData;
    });
    return fieldData;
  };
  const selectOption = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.name, item.name);
      return newData;
    });
    return fieldData;
  };

  let location: [] = selectOptionWithId(countries);
  let gender: [] = selectOption(optionData?.gender);
  let height: [] = selectOptionWithId(optionData?.height);
  let weight: [] = selectOptionWithId(optionData?.weight);
  let bust: [] = selectOptionWithId(optionData?.bust);
  let waist: [] = selectOptionWithId(optionData?.waist);
  let hips: [] = selectOptionWithId(optionData?.hips);
  let eyes: [] = selectOption(optionData?.eyes);
  let hair: [] = selectOption(optionData?.hair);
  let dress: [] = selectOptionWithId(optionData?.dress_size);
  let shoe: [] = selectOptionWithId(optionData?.shoe_size);
  let unit: [] = selectOption(optionData?.unit);
  let discipline: [] = selectOptionWithTitle(disciplines);
  let language: [] = selectOptionWithId(languages);
  let category: [] = selectOptionWithId(catagories);

  // Datepicker
  const handleDateChange = (date: any) => {
    // 'date' is the selected date object
    setSelectedDate(date);

    // Convert the date to a string (customize the format as needed)
    const dateString = date ? date.toLocaleDateString() : "";
  };

  // success popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const selectedOption: any = category.find((item: any) => {
    return item.value === userData?.category_id;
  });
  const label: any = selectedOption?.label;

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
        <Title title="About your talent profile" />
        <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FieldTitle title="Selected category" />
            <FormInputDropdown
              control={control}
              label={`${label ? label : ""}`}
              name="category"
              options={category}
              disabled={true}
            />
          </div>
          <div>
            <FieldTitle title="Talent Information" />

            <CustomDatePicker
              control={control}
              name="dob"
              label="Date of Birth"
              max={new Date()}
              isRequired
              dateOnly
            />

            <div className="mb-2">
              <FormInputDropdown
                control={control}
                label="Location"
                name="country_id"
                options={location}
                disabled={false}
              />
            </div>
            <FormInputDropdown
              control={control}
              label="Gender"
              name="gender"
              options={gender}
              disabled={false}
            />
            <FormInputText
              control={control}
              label="About me"
              type="text"
              icon={<BsPencilFill />}
              labelBG={false}
              multiline={false}
              name="about_me"
              rows={2}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Height"
                name="height"
                options={height}
                disabled={false}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Weight"
                name="weight"
                options={weight}
                disabled={false}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Bust"
                name="bust"
                options={bust}
                disabled={false}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Waist"
                name="waist"
                options={waist}
                disabled={false}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Hips"
                name="hips"
                options={hips}
                disabled={false}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Eyes"
                name="eyes"
                options={eyes}
                disabled={false}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Hair"
                name="hair"
                options={hair}
                disabled={false}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Dress Size"
                name="dress_size"
                options={dress}
                disabled={false}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Shoe Size"
                name="shoe_size"
                options={shoe}
                disabled={false}
              />
            </div>
            {/* <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Dress Size Unit"
                name="dress_size_unit"
                options={unit}
                disabled={false}
              />
            </div> */}
          </div>
          {/* <div className="flex gap-4"> */}
          {/* <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Shoe Size Unit"
                name="shoe_size_unit"
                options={unit}
                disabled={false}
              />
            </div> */}
          {/* </div> */}
          <div className="flex gap-4">
            <div className="w-1/2 mb-2"></div>
          </div>

          <div className="mb-2">
            <FieldTitle title="Disciplines & Languages" />
            <FormInputDropdown
              control={control}
              label="Select Disciplines"
              name="discipline_id"
              options={discipline}
              disabled={false}
            />
          </div>
          <div className="mb-2">
            <FormInputDropdown
              control={control}
              label="Select Language"
              name="language"
              options={language}
              disabled={false}
            />
          </div>
          <div>
            <FormInputText
              control={control}
              type="file"
              icon={<BsUpload />}
              labelBG={false}
              multiline={false}
              name="portfolio"
              rows={2}
            />
            {/* <FieldTitle title="Portfolio" />
            <p className="text-[15px] font-lato">
              Upload photos and videos that showcase your talent.
            </p>
            <BaseButton
              btn_style="bg-transparent border border-[#532c6d] text-[#532c6d]"
              btn_text="UPLOAD FILES"
              isSubmitButton
            /> */}
          </div>
          <div className="mt-5">
            <FieldTitle title="Availability" />
            <p className="text-[15px] font-lato">
              Set up your current availability to appear in the agent’s talent
              search.
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <FieldTitle title="Open to work" />
            <Switch />
          </div>
          <div className="mt-6">
            {/* <input type="submit" /> */}
            <div onClick={togglePopup}>
              <BaseButton
                btn_style="bg-[#532c6d] text-white"
                btn_text="CREATE PROFILE"
                isSubmitButton
              />
            </div>
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
            confirmation_text="Your talent account was created successfully"
          />
        )}
      </div>
    </div>
  );
};

export default TalentProfile;
