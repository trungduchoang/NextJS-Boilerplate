import { IconButton } from "@mui/material";
import Svg from "@/components/atoms/svg";
import UserArea from "./components/UserArea";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "@/hooks/useRouter";
import { HEADER_HEIGHT } from "../variables";
import classes from "./Header.module.scss";

type TProps = {
  setSideBarVisible: (visible: boolean) => void;
};
/**
 * Header
 */
export default function Header({ setSideBarVisible }: TProps) {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className={classes.root} style={{ height: HEADER_HEIGHT }}>
      <header className={classes.header}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => {
            setSideBarVisible(true);
          }}
          edge="start"
          className={classes["btn-menu"]}
        >
          <Svg src="/svgs/icon-menu.svg" />
        </IconButton>

        <div
          className={classes["header-child"]}
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <img
            className={classes.logo}
            src="/images/logo.png"
            alt=""
            style={{ width: 40 }}
          />
          <div className={classes.text}>
            {t("common:department_of_trade_promotion")}
          </div>
        </div>
        <div className={classes.right}>
          <UserArea />
        </div>
      </header>
    </div>
  );
}
