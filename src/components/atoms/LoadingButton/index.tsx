import { ReactNode } from "react";
import clsx from "clsx";
import { Button as MuiButton, ButtonProps } from "@mui/material";
import Spinner from "../Spinner";
import classes from "./LoadingButton.module.scss";

type PROPS = { loading?: boolean; label: ReactNode } & Omit<
  ButtonProps,
  "children"
>;

/**
 * LoadingButton
 * @example
 * <LoadingButton
 *   type="button"
 *   onClick={(e) => {
 *     e.preventDefault();
 *     executeLogin();
 *   }}
 *   className={classes["btn-login"]}
 *   label={t("login:login")}
 * />
 * @param loading
 * @param label
 * @params {...rest} @mui/material <Button />
 */
export default function LoadingButton({
  className,
  disabled,
  label,
  loading,
  onClick,
  style,
  variant,
  ...btnProps
}: PROPS) {
  let cls = className;
  if (!cls && !variant) cls = classes.defaultStyles;

  return (
    <MuiButton
      className={clsx(cls)}
      disabled={loading || disabled}
      style={{ position: "relative", ...style }}
      {...btnProps}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
    >
      <BtnLabel loading={loading} label={label} />
      {loading && <LoadingIcon />}
    </MuiButton>
  );
}

function LoadingIcon() {
  return (
    <Spinner
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

function BtnLabel({ label, loading }: { label: ReactNode; loading?: boolean }) {
  return (
    <span
      style={
        loading
          ? {
              color: "transparent",
            }
          : {}
      }
    >
      {label}
    </span>
  );
}
