
import { useSelector } from "react-redux";
import { RootState } from "./Store";

export const useCurrentUser = () => {
  return useSelector((state: RootState) => state.Auth.user);
};