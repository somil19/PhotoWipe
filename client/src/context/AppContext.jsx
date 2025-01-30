/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("");
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
    navigate("/");
  };
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });
      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      loadCreditsData();
      console.log("Token", token);
    }
  }, [token, credit]);
  const removeBg = async (image) => {
    try {
      if (!token) {
        setShowLogin(true);
        return;
      }
      setImage(image);
      setResultImage(false);
      setLoading(true);
      navigate("/result");
      const formData = new FormData();
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-bg",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        setLoading(false);
        setResultImage(data.resultImage);
        setResultImageUrl(data.resultImageUrl);
        toast.success(data.message);
        data.creditBalance && setCredit(data.creditBalance);
        // loadCreditsData();
      } else {
        toast.error(data.message);
        data.creditBalance && setCredit(data.creditBalance);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    credit,
    setCredit,
    showLogin,
    setShowLogin,
    user,
    setUser,
    token,
    setToken,
    backendUrl,
    stripePromise,
    image,
    setImage,
    removeBg,
    resultImage,
    resultImageUrl,
    setResultImage,
    loadCreditsData,
    logout,
    loading,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
