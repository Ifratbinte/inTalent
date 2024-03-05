import moment from "moment";
import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "rsuite";

interface Props {
  control: any;
  name: string;
  label: string;
  min?: any;
  max?: any;
  hideLabel?: boolean;
  readOnly?: boolean;
  dateOnly?: boolean;
  isQueryField?: boolean;
  otherProps?: any;
  isRequired: boolean;
}

const CustomDatePicker: React.FC<Props> = ({
  control,
  name,
  label,
  min,
  max,
  hideLabel = false,
  readOnly = false,
  dateOnly = true,
  isQueryField = false,
  isRequired = false,
}) => {
  const handleDateDisable = (date: any) => {
    const isMinValid = min ? moment(min).isValid() : true;
    const isMaxValid = max ? moment(max).isValid() : true;

    if (!isMinValid || !isMaxValid) {
      return false;
    }

    if (min && max) {
      return (
        moment(date).subtract(1, "days").isBefore(min) ||
        moment(date).isAfter(max)
      );
    } else if (min) {
      return moment(date).subtract(-1, "days").isBefore(min);
    } else if (max) {
      return moment(date).isAfter(max);
    }

    return false;
  };
  return (
    <div className="row align-items-center">
      <div>{label}</div>

      <div>
        <Controller
          name={name}
          control={control}
          defaultValue={isQueryField ? "" : null}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            const dateValue = moment(value);
            const isValidDate = !!value && dateValue?.isValid();

            return (
              <Fragment>
                <DatePicker
                  block
                  size="lg"
                  editable={false}
                  disabled={readOnly}
                  // placeholder={
                  //   dateOnly ? "DD MMM, YYYY" : "DD MMM, YYYY - HH:MM"
                  // }
                  classPrefix="date-picker"
                  // format={dateOnly ? "dd MMM, yyyy" : "dd MMM, yyyy - HH:mm"}
                  shouldDisableDate={handleDateDisable}
                  value={isValidDate ? dateValue.toDate() : null}
                  onSelect={(value) => {
                    onChange(
                      value
                        ? moment(value).format("YYYY-MM-DDTHH:mm:ss")
                        : isQueryField
                        ? ""
                        : null
                    );
                  }}
                  onChange={(value) =>
                    onChange(
                      value
                        ? moment(value).format("YYYY-MM-DDTHH:mm:ss")
                        : isQueryField
                        ? ""
                        : null
                    )
                  }
                />

                {error && <p className="text-danger m-0">{error?.message}</p>}
              </Fragment>
            );
          }}
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
