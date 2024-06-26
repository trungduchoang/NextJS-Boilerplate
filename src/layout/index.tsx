import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import classes from "./GlobalLayout.module.scss";
import { HEADER_HEIGHT } from "./variables";

type TProps = {
  children: ReactNode;
};
/**
 * GlobalLayout
 */
export default function GlobalLayout({ children }: TProps) {
  const [sideBarVisible, setSideBarVisible] = useState(false);

  return (
    <div className={classes.root}>
      <Header setSideBarVisible={setSideBarVisible} />
      <div
        className={classes.childrenWrapper}
        style={{
          paddingTop: HEADER_HEIGHT,
        }}
      >
        <div className={classes.childrenInner}>{children}</div>
      </div>
      <Sidebar
        sideBarVisible={sideBarVisible}
        setSideBarVisible={setSideBarVisible}
      />
    </div>
  );
}
