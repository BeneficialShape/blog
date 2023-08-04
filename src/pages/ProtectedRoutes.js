import { useNavigate } from "react-router";
import { useUserAuth } from "../store/auth-context";
import { useEffect } from "react";

const ProtectedRoutes = ({ Component }) => {
  let { user } = useUserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !localStorage.getItem("isLoggedIn")) {
      navigate("/Login");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
};

export default ProtectedRoutes;
