import React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showStatusMessage } from "@/app/store/authentication/authThunk";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      console.log("token", token);
      localStorage.setItem("token", token);
      dispatch(
        showStatusMessage({ message: "Успішний вхід", type: "success" }),
      );
      navigate("/");
    } else {
      console.log("Not token");
      navigate("/auth");
    }
  }, [searchParams, navigate]);

  return <p>Loading...</p>;
};

export default OAuth2Callback;
