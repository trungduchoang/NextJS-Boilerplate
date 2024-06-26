import { TypedUseSelectorHook, useSelector as _useSelector } from "react-redux";
import type { AppState, TReducerNames } from "@/redux/store";

const useSelector: TypedUseSelectorHook<AppState> = _useSelector;

export const useAppSelector = <T extends TReducerNames>(
  reducerName: T,
  compareFn?: (prevProps: AppState[T], nextProps: AppState[T]) => boolean,
) =>
  useSelector(
    (state) => state[reducerName] as AppState[T],
    // Default using shallow compare for reducing re-render
    (compareFn as any) || ((prev, next) => prev === next),
  );
