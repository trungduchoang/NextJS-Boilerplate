// libs
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useState } from "react";
// components
import Svg from "@/components/atoms/svg";
// hooks
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "@/hooks/useRouter";
// others
import { i18n as i18nConfigs } from "../../../../next-i18next.config";
import classes from "./LocaleButton.module.scss";
import { getFlagByLanguage } from "./tools";

/**
 * LocaleButton
 */
export default function LocaleButton() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as TSupportedLanguages;
  const supportedLanguages = i18nConfigs.locales;

  const changeLanguage = (locale: TSupportedLanguages) => {
    let { asPath } = router;
    supportedLanguages.forEach((lang) => {
      if (asPath.includes(`/${lang}/`))
        asPath = asPath.replace(`/${lang}/`, "/");
    });
    window.open(`/${locale}${asPath}`, "_self");
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        id="locale-button"
        aria-controls={open ? "locale-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "#fff", textTransform: "none" }}
      >
        <Svg
          src={getFlagByLanguage(currentLanguage)}
          className={classes.localFlag}
        />
        <span className={classes.locale}>{currentLanguage}</span>
        <Svg type="chevron-down" className={classes.arrow} />
      </Button>
      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "locale-button",
        }}
      >
        <MenuItem
          onClick={() => {
            changeLanguage("vi");
            handleClose();
          }}
        >
          <ListItemIcon style={{ minWidth: 26 }}>
            <Svg src="/flags/vietnam.svg" className={classes.localeMenuItem} />
          </ListItemIcon>
          <ListItemText>Việt Nam</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("en");
            handleClose();
          }}
        >
          <ListItemIcon style={{ minWidth: 26 }}>
            <Svg src="/flags/american.svg" className={classes.localeMenuItem} />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
