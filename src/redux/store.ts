// libs
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// others
import reducer from "./reducers";

export function makeStore() {
  return configureStore({
    reducer,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type TReducerNames = keyof AppState;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
