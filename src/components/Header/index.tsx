import { useState, useRef, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { RiFilterFill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import FolderModal from "../FolderModal";
import FileUploadModal from "../FileUploadModal";
import { IoClose } from "react-icons/io5";

function HeaderBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileUploadModal, setShowFileUploaderModal] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const menuRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterPanel(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-[70px] bg-white flex items-center border-b-2 border-gray-200 justify-between px-4 relative z-10">
      <Breadcrumb />

      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <button
            className="bg-[#2d336bde] text-white p-2 rounded-sm relative"
            onClick={() => setShowFilterPanel((prev) => !prev)}
          >
            <RiFilterFill />
          </button>
          {showFilterPanel && (
            <div
              ref={filterRef}
              className="absolute top-[60px] right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[300px] z-40"
            >
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <span className="text-sm font-semibold">Filters</span>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-red-500">Clear</button>
                  <IoClose
                    className="cursor-pointer text-lg"
                    onClick={() => setShowFilterPanel(false)}
                  />
                </div>
              </div>

              <div className="px-4 py-3 space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    placeholder="Folder name"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Date</label>
                  <input
                    type="date"
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
                  />
                </div>
              </div>

              <div className="px-4 py-3 border-t flex justify-end gap-2">
                <button
                  className="px-3 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowFilterPanel(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#2D336B] text-white rounded-md text-sm hover:bg-[#232955]">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="bg-[#2D336B] text-white p-2 rounded-sm z-50 relative"
          >
            <IoAdd />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl border border-gray-100 text-sm text-gray-700 z-40">
              <ul className="py-1">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                  onClick={() => {
                    setShowFolderModal(true);
                    setMenuOpen(false);
                  }}
                >
                  Create Folder
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setShowFileUploaderModal(true);
                    setMenuOpen(false);
                  }}
                >
                  Upload Document
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {showFolderModal && (
        <FolderModal onClose={() => setShowFolderModal(false)} />
      )}
      {showFileUploadModal && (
        <FileUploadModal onClose={() => setShowFileUploaderModal(false)} />
      )}
    </div>
  );
}

export default HeaderBar;
