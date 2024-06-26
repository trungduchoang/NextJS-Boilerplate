import { Menu, MenuItem } from "@mui/material";
import { MouseEvent, ReactNode, useState, createContext } from "react";
import { nullPosition } from "./dataSources";
import classes from "./ContextMenu.module.scss";

type Position = {
  mouseX: null | number;
  mouseY: null | number;
};

const PositionContext = createContext<{
  pointerPosition: Position;
  setPointerPosition:(props: Position) => void;
}>({
  pointerPosition: { mouseX: null, mouseY: null },
  setPointerPosition: () => {},
});

/**
 * ContextMenu
 * @example
 *  <ContextMenu innerComponent={<div>Can be right click element</div>}>
 *    <ContextMenuItem
 *      onClick={() => {
 *        console.log("on ContextMenu item click");
 *      }}
 *    >
 *      Menu Item label
 *    </ContextMenuItem>
 *  </ContextMenu>
 */
export function ContextMenu({
  innerComponent,
  children,
}: {
  innerComponent: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}) {
  const [pointerPosition, setPointerPosition] =
    useState<Position>(nullPosition);

  const openContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setPointerPosition({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  return (
    <div className={classes.root} onContextMenu={openContextMenu}>
      <PositionContext.Provider
        value={{
          pointerPosition,
          setPointerPosition,
        }}
      >
        {innerComponent}
        <Menu
          keepMounted
          open={pointerPosition.mouseY !== null}
          onClose={() => setPointerPosition(nullPosition)}
          anchorReference="anchorPosition"
          anchorPosition={
            pointerPosition.mouseY !== null && pointerPosition.mouseX !== null
              ? { top: pointerPosition.mouseY, left: pointerPosition.mouseX }
              : undefined
          }
        >
          {/* Ref: Why we need a <div /> here? https://github.com/mui-org/material-ui/issues/15903 */}
          <div>{children}</div>
        </Menu>
      </PositionContext.Provider>
    </div>
  );
}

export function ContextMenuItem({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <PositionContext.Consumer>
      {({ setPointerPosition }) => (
        <MenuItem
          onClick={() => {
            if (onClick) onClick();
            setPointerPosition({ mouseX: null, mouseY: null });
          }}
        >
          {children}
        </MenuItem>
      )}
    </PositionContext.Consumer>
  );
}
