import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface FormInputInterface {
  name: string;
  control: any;
  label: string;
  type: string;
  multiline: any;
  rows: any;
  labelBG: boolean;
  icon?: any;
}

const FormDateTime: React.FC<FormInputInterface> = ({
  name,
  control,
  label,
  type,
  multiline,
  rows,
  labelBG,
  icon,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          sx={{
            ".MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
            '& > label[data-shrink="true"]': labelBG
              ? {
                  bgcolor: "primary.main",
                  color: "#fff",
                  px: 2,
                  py: "2px",
                  borderRadius: ".5rem",
                }
              : {},
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{icon}</InputAdornment>
            ),
          }}
          style={{ border: "none !important" }}
          helperText={error ? error.message : null}
          size="medium"
          error={!!error}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fullWidth
          type={type}
          label={label}
          variant="outlined"
          // multiline={multiline}
          rows={rows}
          className="rounded-xl !my-2 bg-gray-100 border-none date-picker"
        />
      )}
    />
  );
};
export default FormDateTime;
