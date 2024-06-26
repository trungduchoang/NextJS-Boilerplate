import { useDispatch } from "react-redux";
import { TDispatch } from "@/redux/store";

export const useAppDispatch = () => useDispatch<TDispatch>();
