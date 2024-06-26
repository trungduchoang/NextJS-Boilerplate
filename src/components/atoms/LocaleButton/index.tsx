import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "@/hooks/useRouter";
import { i18n as i18nConfigs } from "../../../../next-i18next.config";
import classes from "./LocaleButton.module.scss";

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
        Update Language
        <span className={classes.locale}>{currentLanguage}</span>
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
          <ListItemIcon style={{ minWidth: 26 }}>VN</ListItemIcon>
          <ListItemText>Việt Nam</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("en");
            handleClose();
          }}
        >
          <ListItemIcon style={{ minWidth: 26 }}>American</ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
