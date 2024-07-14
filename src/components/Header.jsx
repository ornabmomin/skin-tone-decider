import { useContext, useState } from "react";
import Modal from "./Modal";
import logo from "/sts-logo.png";
import { SkinToneContext } from "../store/SkinToneContext";

const Header = () => {
  const { imageUploaded } = useContext(SkinToneContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-1 flex justify-between items-center">
          <div
            className={`flex items-center ${imageUploaded ? "opacity-0" : ""}`}
          >
            <img
              src={logo}
              alt="Logo"
              className={`${
                imageUploaded ? "w-12 h-12" : "w-24 h-24"
              } rounded-full`}
            />
            <span
              className={`${
                imageUploaded ? "text-sm" : "text-lg"
              } font-bold text-white`}
            >
              Skin Tone Decider
            </span>
          </div>
          <button
            onClick={toggleModal}
            className="text-white hover:text-gray-200 focus:outline-none"
            id="Info"
            aria-label="Info"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      {isModalOpen && <Modal toggleModal={toggleModal} />}
    </>
  );
};

export default Header;
