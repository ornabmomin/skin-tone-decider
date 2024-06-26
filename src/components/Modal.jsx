import PropTypes from "prop-types";

const Modal = ({ toggleModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-20 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            About <p className="display: inline italic">Skin Tone Decider</p>
          </h2>
          <div className="text-gray-600 dark:text-gray-300">
            <p className="pb-4">
              <span className="display: inline italic">Skin Tone Decider</span>{" "}
              is an educational tool that seeks to help people decide which skin
              tone they should choose for their emojis.
            </p>
            <p className="pb-4">
              None of this has been fact checked by anyone or anything. I do not
              guarantee its accuracy or efficacy.
            </p>
            <p className="pb-4">Don&apos;t get yourself cancelled.</p>
            <p className="font-bold text-gray-800 dark:text-white">
              Do you store the photos I upload?
            </p>
            <p>Nah dawg that&apos;d be weird af ngl.</p>
          </div>
        </div>
        <div className="px-6 py-2 pb-8">
          <button
            onClick={toggleModal}
            className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
       bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
       hover:bg-gradient-to-l hover:from-purple-600 hover:via-pink-500 hover:to-red-500
       transition-all duration-500 ease-in-out hover:font-extrabold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
