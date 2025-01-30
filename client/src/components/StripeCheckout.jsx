import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function StripeCheckout({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Confirm the payment without using return_url
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: "if_required", // Prevents redirection for card payments
    });

    if (error) {
      console.log("Payment failed:", error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      onSuccess(); // Call your success function here
      toast.success("Payment successful\nYour Credits have been added!");
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-30vw min-w-[300px] md:w-[60%] self-center shadow-md p-4 rounded-md m-auto bg-gradient-to-br from-purple-200 to-blue-300 "
    >
      <PaymentElement />
      <button
        disabled={!stripe || isLoading}
        className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center transition duration-300 transform hover:scale-105 active:scale-95 mx-auto mt-6"
      >
        {isLoading ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5 mr-3 text-white"
          >
            <circle
              strokeWidth="4"
              stroke="currentColor"
              r="10"
              cy="12"
              cx="12"
              className="opacity-25"
            ></circle>
            <path
              d="M4 12a8 8 0 018-8v8H4z"
              fill="currentColor"
              className="opacity-75"
            ></path>
          </svg>
        ) : (
          <span className="mr-3"></span>
        )}
        {isLoading ? "Loading..." : "Pay Now"}
      </button>
    </form>
  );
}
