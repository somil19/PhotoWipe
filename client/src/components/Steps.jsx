import { assets } from "../assets/assets";
import { motion } from "framer-motion";
const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-4 lg:mx-44 py-20 xl:py-40"
    >
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent ">
        Steps to remove background <br /> image in seconds
      </h1>
      <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">
        <div className="flex max-w-sm items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.upload_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Upload image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Select an image from your device to remove its background
              instantly.
              <br /> Supports JPG, PNG, and more.
            </p>
          </div>
        </div>

        <div className="flex  max-w-sm  items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.remove_bg_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Remove background</p>
            <p className="text-sm text-neutral-500 mt-1">
              Our AI-powered tool automatically removes the background while
              keeping the details intact.
              <br /> No manual editing required.
            </p>
          </div>
        </div>

        <div className="flex max-w-sm  items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
          <img className="max-w-9" src={assets.download_icon} alt="" />
          <div>
            <p className="text-xl font-medium">Download image</p>
            <p className="text-sm text-neutral-500 mt-1">
              Save your high-quality, background-free image in one click.
              <br /> Perfect for professional and personal use.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Steps;
