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

type TReactSvg = Omit<Props, "src" | "loading" | "wrapper" | "ref"> &
  HTMLAttributes<"span">;
type PROPS =
  | ({
      type: SvgTypes;
    } & TReactSvg)
  | ({
      src: string;
    } & TReactSvg);
/**
 * Svg
 * @description Collections of SVG files from feather icons store in /public/svgs
 * @description Render SVG files by react-svg
 * @see https://feathericons.com/
 * @see https://github.com/tanem/react-svg
 */
export default function Svg({ type, className, ...props }: PROPS) {
  return (
    <ReactSVG
      src={`/svgs/${type}.svg`}
      loading={Spinner}
      wrapper="span"
      className={clsx(classes.root, className)}
      {...props}
    />
  );
}
