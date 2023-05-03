// libs
import { useDispatch } from "react-redux";
// others
import { TDispatch } from "@/redux/store";

export const useAppDispatch = () => useDispatch<TDispatch>();
