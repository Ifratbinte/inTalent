import { dropdownOptionType } from "#interfaces/index";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface FormDropdownInterface {
  name: string;
  control: any;
  thumb?: string;
  label: string;
  options: dropdownOptionType[];
  disabled: boolean;
}

const FormInputDropdown: React.FC<FormDropdownInterface> = ({
  name,
  control,
  label,
  thumb,
  options,
  disabled,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.thumb} {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControl
          size="medium"
          variant="outlined"
          error={!!error}
          fullWidth
          disabled={disabled}
          className="rounded-lg !my-2 bg-gray-100"
          sx={{
            ".MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
          }}
        >
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            label={label}
            onChange={onChange}
            value={value}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {generateSingleOptions()}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
      control={control}
      name={name}
    />
  );
};
export default FormInputDropdown;
