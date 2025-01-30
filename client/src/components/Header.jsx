import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

function Header() {
  const { removeBg } = useContext(AppContext);
  return (
    <motion.div
      className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 "
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* -------- Left side -------- */}
      <motion.div
        initial={{ opacity: 0.2, y: -20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          transition={{ delay: 0.4, duration: 2 }}
          animate={{ opacity: 1 }}
          className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight"
        >
          Remove the <br className="max-md:hidden " />{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent ">
            background
          </span>{" "}
          from <br className="max-md:hidden " /> images for free
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-6 text-[15px] text-gray-500"
        >
          {" "}
          Effortlessly erase backgrounds from any image with AI-powered
          precision. <br className="max-sm:hidden " />
          Get high-quality results in seconds—no design skills needed!
        </motion.p>
        <div>
          <input
            onChange={(e) => removeBg(e.target.files[0])}
            type="file"
            accept="image/*"
            id="upload1"
            hidden
          />
          <label
            htmlFor="upload1"
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700"
          >
            <img width={20} src={assets.upload_btn_icon} alt="" />
            <motion.p
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              transition={{
                default: { duration: 0.5 },
                opacity: { duration: 1, delay: 0.8 },
              }}
              animate={{ opacity: 1 }}
              className="text-white text-md font-semibold"
            >
              Upload your image
            </motion.p>
          </label>
        </div>
      </motion.div>
      {/* ------- Right side -------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="w-full max-w-md"
      >
        <img src={assets.header_img} alt="" />
      </motion.div>
    </motion.div>
  );
}

export default Header;
