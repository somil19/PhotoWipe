import { useContext, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";
import StripeCheckout from "../components/StripeCheckout";

const BuyCredit = () => {
  const {
    backendUrl,
    token,
    loadCreditsData,
    setShowLogin,
    stripePromise,
    user,
  } = useContext(AppContext);

  const appearance = { theme: "stripe" };
  const [clientSecret, setClientSecret] = useState(null);
  const [credits, setCredits] = useState(0);
  const navigate = useNavigate();
  const createPaymentIntent = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay`,
        { planId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
        setCredits(data.credits);
        console.log(data.credits);
      } else {
        throw new Error("Failed to create PaymentIntent");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const updateCredits = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/update-credits`,
        { credits },
        { headers: { token } }
      );

      if (data.success) {
        loadCreditsData();
        setCredits(0);
        setClientSecret(null);
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update credits.", error);
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      {!clientSecret ? (
        <>
          <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
            Our Plans
          </button>
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent mb-6 sm:mb-10">
            Choose the plan that&apos;s right for you
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-left">
            {plans.map((item, index) => (
              <div
                className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-700 "
                key={index}
              >
                <img width={40} src={assets.logo_icon} alt="" />
                <p className="mt-3 font-semibold">{item.id}</p>
                <p className="text-sm">{item.desc}</p>
                <p className="mt-6">
                  <span className="text-3xl font-medium">${item.price}</span>/{" "}
                  {item.credits} credits
                </p>
                <button
                  onClick={() => createPaymentIntent(item.id)}
                  className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer"
                >
                  {user ? "Buy Now" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <StripeCheckout
            clientSecret={clientSecret}
            onSuccess={updateCredits}
          />
        </Elements>
      )}
    </div>
  );
};

export default BuyCredit;
