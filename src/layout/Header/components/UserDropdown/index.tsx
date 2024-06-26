import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import classes from "./UserDropdown.module.scss";

/**
 * UserDropdown
 */
export default function UserDropdown() {
  const { t } = useTranslation();
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
        id="user-menu-button"
        aria-controls={open ? "user-menu-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "#fff", textTransform: "none", padding: "0 30px" }}
      >
        <span className={classes.username}> Username</span>
      </Button>
      <Menu
        id="user-menu-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-menu-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon style={{ minWidth: 26 }}></ListItemIcon>
          <ListItemText>{t("common:account_info")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon style={{ minWidth: 26 }}></ListItemIcon>
          <ListItemText>{t("common:logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
