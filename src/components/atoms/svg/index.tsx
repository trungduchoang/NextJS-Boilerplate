// libs
import { HTMLAttributes } from "react";
import { Props, ReactSVG } from "react-svg";
import clsx from "clsx";
// components
import Spinner from "@/components/atoms/Spinner";
// types
import { SvgTypes } from "./type";
// others
import classes from "./Svg.module.scss";

type TReactSvg = Omit<Props, "src" | "loading" | "wrapper" | "ref" | "type"> &
  HTMLAttributes<"span">;
type PROPS =
  | {
      type: SvgTypes;
      src?: never;
    }
  | {
      src: string;
      type?: never;
    };
/**
 * Svg
 * @description Lazy load display and caching for svg
 * @param type - one of names inside Collections of SVG files from feather icons store in /public/svgs
 * @param src - svg url
 * @see https://feathericons.com/
 * @see https://github.com/tanem/react-svg
 * @example <Svg src="/svgs/menu-mui.svg" />
 * @example <Svg type="menu" />
 */
export default function Svg({
  type,
  src,
  className,
  ...props
}: PROPS & TReactSvg) {
  return (
    <ReactSVG
      src={src || `/svgs/${type}.svg`}
      loading={Spinner}
      wrapper="span"
      className={clsx(classes.root, className)}
      {...props}
    />
  );
}
