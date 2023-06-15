// libs
import clsx from "clsx";
import { KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
// others
import classes from "./InputField.module.scss";
import { focusNextInput } from "./tools";

type TProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onPressEnter?: (e: KeyboardEvent<HTMLDivElement>) => void;
  // Add effects that run after native events is fired
  sideEffect?: {
    // Add effects that run after input value change
    afterChange?: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    // Add effects that run after input is blured
    afterBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  };
  labelClassName?: string;
  shouldFocusNextInput?: boolean;
} & TextFieldProps;
/**
 * InputField
 * @example
 * <InputField {...register("field-name")} label="Label" />
 */
const InputField = ({
  name,
  control,
  className,
  labelClassName,
  onPressEnter,
  onKeyPress,
  helperText,
  sideEffect,
  label,
  required = false,
  shouldFocusNextInput = true,
  ...rest
}: TProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error: { message: fieldErrorMsg = "" } = {} },
      }) => (
        <>
          <label className={labelClassName} htmlFor={name}>
            {label} {required && <span style={{ color: "red" }}>*</span>}
          </label>
          <TextField
            id={name}
            ref={ref}
            name={name}
            error={!!fieldErrorMsg}
            onChange={(e) => {
              onChange(e);
              if (sideEffect?.afterChange) sideEffect.afterChange(e);
            }}
            onBlur={(e) => {
              onBlur();
              if (sideEffect?.afterBlur) sideEffect.afterBlur(e);
            }}
            value={value}
            className={clsx(classes.root, className)}
            onKeyPress={overridedOnKeyPress}
            helperText={<HelperTextAndErrorMsg fieldErrorMsg={fieldErrorMsg} />}
            {...rest}
          />
        </>
      )}
    />
  );

  function overridedOnKeyPress(e: KeyboardEvent<HTMLDivElement>) {
    if (shouldFocusNextInput && e.key === "Enter") {
      e.preventDefault();
      focusNextInput(name);
    }
    if (onPressEnter && e.key === "Enter") {
      onPressEnter(e);
    }
    if (onKeyPress) onKeyPress(e);
  }
  function HelperTextAndErrorMsg({
    fieldErrorMsg,
  }: {
    fieldErrorMsg?: string;
  }) {
    return (
      <>
        {fieldErrorMsg && (
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: "red",
                marginTop: "8px",
              }}
            >
              <img
                alt=""
                src="/svgs/warning_red.svg"
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "5px",
                }}
              />
              <span style={{ color: "#f71010" }}>{fieldErrorMsg}</span>
              <br />
            </span>
          </>
        )}
        {helperText}
      </>
    );
  }
};

export default InputField;
