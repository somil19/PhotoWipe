import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
export default function Login() {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  // console.log(backendUrl);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user.name);
          console.log(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.name);
          setShowLogin(false);
          toast.success("Login Successfull");
        } else {
          toast.error("error");
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user.name);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.name);
          setShowLogin(false);
          toast.success("Sign Up Successfull");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Error arise" + error.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        action=""
        className="relative bg-white md:p-10 p-8 rounded-xl w-[90%] md:w-[30%]"
      >
        <h1 className="text-2xl text-center text-neutral-700 font-medium mb-3">
          {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center">
          Wlecome back! Please {state === "Login" ? "Login" : "Sign Up"} to
          continue
        </p>
        {state !== "Login" && (
          <div className="border-2 border-indigo-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.profile_icon} alt="" className="w-7" />
            <input
              className="outline-none text-sm"
              type="text"
              placeholder="Enter Your Full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="border-2 border-indigo-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" className="w-6" />
          <input
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Enter Your Email id"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="border-2 border-indigo-300 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" className="w-5" />
          <input
            className="outline-none text-sm"
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white w-full py-2 rounded-full mt-6 cursor-pointer transition-all duration-300 hover:scale-105 ">
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Dont have an account?{" "}
            <span
              onClick={() => setState("Signup")}
              className="text-violet-600 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-violet-600 cursor-pointer"
            >
              Login In
            </span>
          </p>
        )}
        <img
          src={assets.cross_icon}
          alt=""
          width={15}
          className="absolute top-5 right-5  cursor-pointer "
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
}
