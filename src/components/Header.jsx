import { useContext, useState } from "react";
import Modal from "./Modal";
import logo from "/sts-logo.png";
import { SkinToneContext } from "../store/SkinToneContext";
import InfoIcon from "./ui/InfoIcon";

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
          <div className="flex items-center">
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
            <InfoIcon />
          </button>
        </div>
      </header>

      {isModalOpen && <Modal toggleModal={toggleModal} />}
    </>
  );
};

export default Header;
