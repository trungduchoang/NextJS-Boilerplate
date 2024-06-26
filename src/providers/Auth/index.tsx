import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "@/constants";
import { cookie } from "@/utils/storage/cookie";

type TStatus = "idle" | "checking" | "checked";
type TUserInfo = {
  name: string;
  email: string;
  phone: string;
};
type TContextProps = {
  status: TStatus;
  isLoggedIn: boolean;
  userInfo?: TUserInfo;
  logout: () => void;
};
/**
 * Auth Context
 * @description Include Authentication information
 */
const AuthContext = createContext<TContextProps>({
  status: "idle",
  isLoggedIn: false,
  logout: () => {},
});
export const useAuth = () =>
  useContext<ShallowExpand<TContextProps>>(AuthContext);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<TStatus>("idle");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserInfo | undefined>();

  const logout = () => {
    cookie.remove(STORAGE_KEYS.ACCESS_TOKEN);
    cookie.remove(STORAGE_KEYS.REFRESH_TOKEN);
    setIsLoggedIn(false);
    setUserInfo(undefined);
  };

  useEffect(() => {
    (() => {
      setStatus("checking");
      const accessToken = cookie.get(STORAGE_KEYS.ACCESS_TOKEN);
      if (!accessToken) {
        setStatus("checked");
        setIsLoggedIn(false);
      }
      if (accessToken)
        fetch("/fetch-user-info")
          .then((res: any) => {
            setUserInfo({
              name: res.name,
              email: res.email,
              phone: res.phone,
            });
            setIsLoggedIn(true);
            setStatus("checked");
          })
          .catch(() => {
            logout();
            setStatus("checked");
          });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ status, isLoggedIn, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
