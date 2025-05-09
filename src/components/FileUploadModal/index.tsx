import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaFileAlt, FaFileUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FilterType, FolderApiResponse } from "../../types/fileSystem";
import {
  useGetFoldersQuery,
  useGetFileSystemCountQuery,
} from "../../features/folder/fileSystemSliceApiSlice";
import { RootState } from "../../app/store";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

interface FileUploadModalProps {
  onClose: () => void;
  folderId?: string | null;
}

const FileUploadModal = ({ onClose, folderId }: FileUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);
  const { refetch: refetchCounts } = useGetFileSystemCountQuery();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (folderId) {
      formData.append("folderId", folderId);
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/file-system/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded / event.total) * 100);
              setUploadProgress(percent);
            }
          },
        }
      );
      refetch();
      refetchCounts();
      onClose();

      if (response.status === 200) {
        setUploadProgress(100);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000008d] z-50 flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-800">Upload document</h2>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>
        {!isUploading && (
          <div className="px-4 py-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Browse document
            </label>

            <div className="border border-gray-300 rounded-md h-32 flex items-center justify-center cursor-pointer hover:border-[#2D336B] transition-all duration-200">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaFileUpload className="text-5xl text-gray-300" />

                {file && (
                  <p className="mt-2 text-sm text-gray-600">{file.name}</p>
                )}
              </label>
            </div>
          </div>
        )}
        {isUploading && file && (
          <div className="px-4 py-4">
            {/* File icon and name */}
            <div className="flex items-center space-x-2 mb-4">
              <FaFileAlt size={22} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-800 truncate">
                {file.name}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>

            {/* Upload percentage text */}
            <p className="text-sm text-gray-600 mt-2 text-right">
              {uploadProgress}% upload completed
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="px-4 py-2 bg-[#2D336B] text-white rounded-md hover:bg-[#232955] disabled:opacity-50"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
