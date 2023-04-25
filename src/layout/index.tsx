// libs
import { ReactNode } from "react";
// others
import classes from "./GlobalLayout.module.scss";
import Sidebar from "./Sidebar";

type TProps = {
  children: ReactNode;
};
/**
 * GlobalLayout
 */
export default function GlobalLayout({ children }: TProps) {
  return (
    <div className={classes.root}>
      <Sidebar />
      {children}
    </div>
  );
}
