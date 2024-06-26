import { ReactNode } from "react";
import { Provider } from "react-redux";
import { TStore } from "@/redux/store";

type TProps = {
  children: ReactNode;
  store: TStore;
};
export function ReduxProvider({ children, store }: TProps) {
  return <Provider store={store}>{children}</Provider>;
}
