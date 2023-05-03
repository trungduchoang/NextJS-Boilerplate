// libs
import { TypedUseSelectorHook, useSelector as _useSelector } from "react-redux";
// others
import type { AppState, TReducerNames } from "../../redux/store";

const useSelector: TypedUseSelectorHook<AppState> = _useSelector;

export const useAppSelector = <T extends TReducerNames>(reducerName: T) =>
  useSelector(
    (state) => state[reducerName] as AppState[T],
    (prev, next) => prev === next
  );
