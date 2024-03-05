"use client";
import event_data from "#__mocks__/event.json";
import BaseButton from "#components/common/button/baseButton";
import FieldTitle from "#components/common/field-title";
import FormInputDropdown from "#components/common/form/mui/FormInputDropdown";
import FormInputText from "#components/common/form/mui/FormInputText";
import CustomModal from "#components/common/modal/CustomModal";
import Title from "#components/common/title";
import axios from "#helpers/axios";
import { RootState } from "#stores/store";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPencilFill } from "react-icons/bs";
import { useSelector } from "react-redux";

// interface
type Inputs = {
  event_image: any;
  event_name: string;
  description: string;
  category: [];
  hourly_rate: string;
  total_hour: number;
  street_address: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: number;
  country: [];
  language: [];
  disciplines: [];
  contract: string;
};

const EventCreate = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  //**-------- array data get from api-------**
  // states
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [contract, setContract] = useState<string>("");
  const [isConfirm, setIsConfirm] = useState(false);
  const { push } = useRouter();

  const user = useSelector((state: RootState) => state.user.data);

  const getCategories = async () => {
    const res = await axios.get("/event-categories");
    if (res) {
      setCategories(res.data.data);
    }
  };

  const getCountries = async () => {
    const res = await axios.get("/countries");
    if (res) {
      setCountries(res.data);
    }
  };
  const getLanguage = async () => {
    const res = await axios.get("/languages");
    if (res) {
      setLanguages(res.data);
    }
  };
  const getDisciplines = async () => {
    const res = await axios.get("/disciplines");
    if (res) {
      setDisciplines(res.data);
    }
  };

  // useEffect
  useEffect(() => {
    getCategories();
    getCountries();
    getLanguage();
    getDisciplines();
  }, []);

  // select options mapping
  const createOptions = (label: any, value: any) => {
    return { label, value };
  };

  const selectOptionWithTitle = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.title, item.id);
      return newData;
    });
    return fieldData;
  };
  const selectOptionWithFile = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.image, item.id);
      return newData;
    });
    return fieldData;
  };
  const selectOptionWithName = (params: any) => {
    let fieldData: any = [];
    fieldData = params?.map((item: any, i: number) => {
      let newData = createOptions(item.name, item.id);
      return newData;
    });
    return fieldData;
  };

  // ** text field data **
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData: any = new FormData();
    formData.append("image", fileData);
    formData.append("title", data?.event_name);
    formData.append("description", data?.description);
    formData.append("price", data?.hourly_rate);
    formData.append("duration", data?.total_hour);
    formData.append("street_address", data?.street_address);
    formData.append("street_address_2", data?.address_2);
    formData.append("city", data?.city);
    formData.append("zip", data?.zip_code);
    formData.append("state", data?.state);
    formData.append("category_id", data?.category);
    formData.append("country_id", data?.country);
    formData.append("languages", data?.language);
    formData.append("disciplines_id", data?.disciplines);
    formData.append("price_type", contract.toLowerCase());
    formData.append("owner_id", user?.id);
    formData.append("status", "in_progress");

    try {
      const response = await axios.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // if create successfully
      if (response?.status === 201) {
        setIsConfirm(true);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  // dropdown data
  let category: [] = selectOptionWithTitle(categories);
  let country: [] = selectOptionWithName(countries);
  let language: [] = selectOptionWithName(languages);
  let discipline: [] = selectOptionWithTitle(disciplines);

  const [fileData, setFileData] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setFileData(file);
    }
  };

  // modal close
  const closeModal = () => {
    setIsConfirm(false);
    push("/");
  };

  return (
    <>
      <div className="p-4">
        <Title title="Main event image" title_style="font-semibold my-2" />
        {/* <pre>
          {JSON.stringify(fileData)}
        </pre> */}
        <form className="gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FieldTitle title="Upload primary event image" />

          {/* <FormInputText
            control={control}
            type="file"
            icon={<BsUpload />}
            onChange={handleFileChange}
            labelBG={false}
            multiline={false}
            name="event_image"
            rows={2}
          /> */}

          <div className="bg-grey-lighter flex w-full items-center">
            <label className="flex w-72 cursor-pointer flex-col items-center rounded-md border bg-white px-4 py-2 uppercase tracking-wide shadow-md">
              <input
                id="image"
                className="pl-12"
                type="file"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <FieldTitle title="Event Information" />
          <FormInputText
            control={control}
            label="Event Name"
            type="text"
            labelBG={false}
            multiline={false}
            name="event_name"
            rows={2}
          />
          <FormInputText
            control={control}
            label="Description"
            type="text"
            icon={<BsPencilFill />}
            labelBG={false}
            multiline={false}
            name="description"
            rows={2}
          />
          <FormInputDropdown
            control={control}
            label="Event Category"
            name="category"
            options={category}
            disabled={false}
          />
          <FieldTitle title="Type of contract" />
          <div className="flex justify-between">
            {/* <RadioGroup name="contract">

              {event_data.contract.map((contract: any, i: number) => {
                return (
                  <FormControlLabel
                    key={i}
                    value={contract.value}
                    control={<Radio color="primary" />}
                    label={contract.title}
                    defaultValue={contract.i}
                  />
                );
              })}
            </RadioGroup> */}

            <RadioGroup
              aria-labelledby="contract-type-radio"
              name="contract-type-radio-name"
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              className="!flex !flex-row !justify-around w-full">
              {event_data.contract.map((item) => (
                <FormControlLabel
                  key={item.id}
                  value={item.title}
                  control={<Radio color="primary" />}
                  label={item.title}
                />
              ))}
            </RadioGroup>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputText
                control={control}
                label="Hourly rate"
                type="text"
                labelBG={false}
                multiline={false}
                name="hourly_rate"
                rows={2}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputText
                control={control}
                label="Total hours"
                type="text"
                labelBG={false}
                multiline={false}
                name="total_hour"
                rows={2}
              />
            </div>
          </div>
          <FieldTitle title="Main Location" />
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
            name="address_2"
            rows={2}
          />
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
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
            <div className="w-1/2 mb-2">
              {/* <FormInputDropdown
                control={control}
                label="State"
                name="state"
                options={height}
                disabled={false}
              /> */}
              <FormInputText
                control={control}
                label="State"
                type="text"
                labelBG={false}
                multiline={false}
                name="state"
                rows={2}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 mb-2">
              <FormInputText
                control={control}
                label="Zip code"
                type="text"
                labelBG={false}
                multiline={false}
                name="zip_code"
                rows={2}
              />
            </div>
            <div className="w-1/2 mb-2">
              <FormInputDropdown
                control={control}
                label="Country"
                name="country"
                options={country}
                disabled={false}
              />
            </div>
          </div>
          <div className="mb-2">
            <FieldTitle title="Requirements" />
            <FormInputDropdown
              control={control}
              label="Language"
              name="language"
              options={language}
              disabled={false}
            />
          </div>
          <div className="mb-2">
            <FormInputDropdown
              control={control}
              label="Disciplines"
              name="disciplines"
              options={discipline}
              disabled={false}
            />
          </div>
          <div className="mt-6">
            <BaseButton
              btn_style="bg-[#532c6d] text-white uppercase"
              btn_text="Create event"
              isSubmitButton
            />
          </div>
        </form>
        {/* Confirmation modal */}
        {isConfirm && (
          <CustomModal
            isOpen
            onRequestClose={closeModal}
            confirmation_text="Your Event Name was created successfully"
            small_text="Your Event would be published soon"
            isEvent
          />
        )}
      </div>
    </>
  );
};

export default EventCreate;
