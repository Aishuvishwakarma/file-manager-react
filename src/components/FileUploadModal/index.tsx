import { IoClose } from "react-icons/io5";
import { FaFileUpload } from "react-icons/fa";

interface FileUploadModalProps {
  onClose: () => void;
}

const FileUploadModal = ({ onClose }: FileUploadModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#0000008d]  z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-800">Upload document</h2>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Browse document</label>

          <div className="border border-gray-300 rounded-md h-32 flex items-center justify-center cursor-pointer hover:border-[#2D336B] transition-all duration-200">
            <input type="file" className="hidden" id="fileUpload" />
            <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
              <FaFileUpload className="text-5xl text-gray-300" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#2D336B] text-white rounded-md hover:bg-[#232955]">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
