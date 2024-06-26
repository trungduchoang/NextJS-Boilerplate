import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Svg from "@/components/atoms/svg"; import LocaleButton from "@/components/atoms/LocaleButton";

type TProps = {
  sideBarVisible: boolean;
  setSideBarVisible: (visible: boolean) => void;
};
/**
 * Sidebar
 */
export default function Sidebar({ sideBarVisible, setSideBarVisible }: TProps) {
  return (
    <div className={classes.root}>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#eee",
            padding: "22px 42px",
          },
        }}
        // variant="persistent"
        anchor="left"
        open={sideBarVisible}
        onClose={() => {
          setSideBarVisible(false);
        }}
      >
        <div className={classes.drawerHeader}>
          <LocaleButton />
          <IconButton
            aria-label="open drawer"
            onClick={() => {
              setSideBarVisible(false);
            }}
            edge="start"
            sx={{ mr: 0, color: "white", cursor: "pointer" }}
          >
            <Svg type="x" />
          </IconButton>
        </div>
        <List>
          <ListItem sx={{ minWidth: 252 }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* <IconButton
                  aria-label="open drawer"
                  edge="start"
                  sx={{
                    ml: 3,
                    color: "white",
                  }}
                ></IconButton> */}
              </ListItemIcon>
              <ListItemText
                primary=""
                style={{ color: "#FFFFFF" }}
                sx={{
                  ml: 3,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
