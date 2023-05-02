// libs
import {
  configureStore as _configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
// others
import reducer from "./reducers";
import { useMemo } from "react";

export function configureStore(preloadedState: TObject = {}) {
  return _configureStore({
    reducer,
    preloadedState,
  });
}

export type TStore = ReturnType<typeof configureStore>;

let store: TStore;

// TODO: Move config store to NextJS-BL
const initializeStore = (preloadedState: TObject) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let _store: TStore = store ?? configureStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = configureStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined as any;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

const makePageDataReducer = (initialState: TObject) => {
  const { reducerName, ...restData } = initialState;
  return {
    [reducerName]: restData,
  };
};

export const useInitStore = (initialState: TObject) => {
  const store = useMemo(
    () => initializeStore(makePageDataReducer(initialState)),
    [initialState],
  );
  return store;
};

export type AppState = ReturnType<typeof store.getState>;

export type TReducerNames = keyof AppState;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
