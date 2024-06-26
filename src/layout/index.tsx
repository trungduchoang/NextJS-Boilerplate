import { ReactNode } from "react";
import classes from "./GlobalLayout.module.scss";

type TProps = {
  children: ReactNode;
};
/**
 * GlobalLayout
 */
export default function GlobalLayout({ children }: TProps) {
  return (
    <div className={classes.root}>
      <div className={classes.childrenWrapper}>
        <div className={classes.childrenInner}>{children}</div>
      </div>
    </div>
  );
}
