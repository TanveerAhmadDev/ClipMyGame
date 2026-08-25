import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData, setAuthLoading } from "./features/auth/authSlice";
import api from "./utils/axios";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        // No token = definitely not logged in
        if (!token) {
          dispatch(setAuthLoading(false));
          return;
        }

        const { data } = await api.get("/user/me");

        dispatch(
          setUserData({
            user: data.data.user,
            roleData: data.data.roleData,
          }),
        );
      } catch (error) {
        console.log("Authentication check failed:", error);

        dispatch(setAuthLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
