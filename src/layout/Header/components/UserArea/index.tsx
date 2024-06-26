import { ReactNode } from "react";
import { Button } from "@mui/material";
import { useAuth } from "@/providers/Auth";
import { useRouter } from "@/hooks/useRouter";
import { useTranslation } from "@/hooks/useTranslation";
import UserDropdown from "../UserDropdown";
import classes from "./UserArea.module.scss";

/**
 * UserArea
 */
export default function UserArea() {
  const router = useRouter();
  const { status, isLoggedIn } = useAuth();
  const { t } = useTranslation();
  let content: ReactNode = "";
  if (status === "idle") content = <>&nbsp;</>;
  if (status === "checked" && isLoggedIn) content = <UserDropdown />;
  if (status === "checked" && !isLoggedIn)
    content = (
      <>
        <Button
          className={classes["btn-register"]}
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          <img
            alt=""
            src="/svgs/pen 1.svg"
            className={classes["icon-register"]}
          />
          {t("common:btn_register")}
        </Button>
        <Button
          className={classes["btn-login"]}
          onClick={() => {
            router.push("/login");
          }}
        >
          <img
            alt=""
            src="/svgs/login 2.svg"
            className={classes["icon-login"]}
          />
          {t("common:btn_login")}
        </Button>
      </>
    );

  return <div className={classes.root}>{content}</div>;
}
