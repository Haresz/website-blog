import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const setToken = () => {
  const inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
  Cookies.set("token", uuidv4(), { expires: inThirtyMinutes });
};

export const validateToken = (toast: any) => {
  const token = Cookies.get("token");

  if (!token) {
    toast({
      title: "Token expired",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    sessionStorage.removeItem("userData");
    return false;
  }
  return true;
};
