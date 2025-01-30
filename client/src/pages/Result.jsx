import { useContext, useState } from "react";
// import { assets } from '../assets/assets';
import { AppContext } from "../context/AppContext";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { toast } from "react-toastify";
const Result = () => {
  const { resultImage, resultImageUrl, image, removeBg } =
    useContext(AppContext);
  const [showShareModal, setShowShareModal] = useState(false);
  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        {/* ------- Image Container -------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* -------- Left Side ------- */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            <img
              className="rounded-md border"
              src={image ? URL.createObjectURL(image) : ""}
              alt="Original"
            />
          </div>

          {/* -------- Right Side ------- */}
          <div className="flex flex-col">
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="rounded-md border border-gray-300 h-full relative bg-layer overflow-hidden">
              <img
                src={resultImage ? resultImage : ""}
                alt="Background Removed"
              />
              {!resultImage && image && (
                <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
                  <div className="border-4 border-violet-600 rounded-full h-12 w-12 border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>

            {/* ------ Buttons Container (Right-Aligned) -------- */}
            {resultImage && (
              <div className="flex justify-end items-center gap-4 mt-6 md:flex-row flex-col ">
                {/* <button className="px-4 py-2 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 hover:bg-violet-50 transition-transform duration-300">
                  Try another image
                </button> */}
                <input
                  onChange={(e) => removeBg(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  id="upload2"
                  hidden
                />

                {/* Label Wrapped Button */}
                <label htmlFor="upload2" className="block">
                  <p className="px-4 py-2 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 hover:bg-violet-50 transition-transform duration-300">
                    Try another image
                  </p>
                </label>
                <a
                  href={resultImage}
                  download
                  className="bg-purple-500 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none"
                >
                  Download image
                </a>
                <button
                  onClick={() => setShowShareModal(true)}
                  // className="flex items-center gap-2 px-4 py-2 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 hover:shadow-lg transition-transform duration-300"
                  className="bg-purple-500 flex items-center gap-1 text-white px-4 py-2 rounded-full transition duration-200 ease-in-out hover:bg-purple-700 active:bg-purple-900 focus:outline-none"
                >
                  Share
                  <svg
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon h-4 w-4"
                  >
                    <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"></path>
                  </svg>
                </button>

                {showShareModal && (
                  <div className="fixed inset-0 bg-black/50  flex backdrop-blur-sm items-center justify-center z-50 ">
                    <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                      <button
                        onClick={() => setShowShareModal(false)}
                        className="absolute top-2 right-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                            fill="var(--c-text-secondary)"
                          ></path>
                        </svg>
                      </button>
                      <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-600 text-lg ">Share Image</p>
                        <hr className="my-2 h-1  text-black" />
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          <FacebookShareButton
                            url={resultImageUrl}
                            quote="Check out this image I generated!"
                          >
                            <FacebookIcon size={48} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={resultImageUrl}
                            title="Check out this image I generated!"
                          >
                            <TwitterIcon size={48} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={resultImageUrl}
                            title="Check out this image I generated!"
                          >
                            <WhatsappIcon size={48} round />
                          </WhatsappShareButton>
                          <TelegramShareButton
                            url={resultImageUrl}
                            title="Check out this image I generated!"
                          >
                            <TelegramIcon size={48} round />
                          </TelegramShareButton>
                        </div>
                        <div className="flex gap-2 w-full">
                          <input
                            type="text"
                            readOnly
                            value={resultImageUrl}
                            className="flex-1 p-2 border rounded-md text-black"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(resultImageUrl);
                              toast.success("Copied to clipboard!");
                            }}
                            className="px-4 py-2 cursor-pointer text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-md hover:scale-105 transition-all duration-700"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
