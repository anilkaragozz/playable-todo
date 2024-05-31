import { useEffect } from "react";
import { getAccessToken } from "@/lib/helper";
import { redirect } from "react-router-dom";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = getAccessToken();

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        redirect("/");
      });
    } else {
      redirect("/todo");
    }
  }, [token]);

  return <>{children}</>;
};

export default PrivateRoute;
