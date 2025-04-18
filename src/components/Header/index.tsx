import { useState, useRef, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { RiFilterFill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import FolderModal from "../FolderModal";
import FileUploadModal from "../FileUploadModal";
import FilterPanel from "../FilterPanel";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../features/folder/fileSystemSlice";
import { RootState } from "../../app/store";

function HeaderBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileUploadModal, setShowFileUploaderModal] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector<any>((state) => state.folder.filter);
  const selectedFolderId = useSelector((state: RootState) => state.folder.breadcrumb.selectedFolderId);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const menuRef: any = useRef(null);
  const filterRef: any = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
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
    <div className="h-[70px] bg-white flex items-center border-b-2 border-gray-200 justify-between  px-4 relative z-10">

      <div>
        <Breadcrumb selectedFolderId={selectedFolderId} />
      </div>

      <div className="relative flex items-center space-x-4">
        <div className="relative">
          <button
            className="bg-[#2d336bde] text-white p-2 rounded-sm relative"
            onClick={() => setShowFilterPanel((prev) => !prev)}
          >
            <RiFilterFill />
          </button>
          {showFilterPanel && (
            <FilterPanel
              onClose={() => setShowFilterPanel(false)}
              onApply={(appliedFilters) => dispatch(setFilters(appliedFilters))}
              onClear={() =>
                dispatch(
                  setFilters({ name: "", description: "", createdAt: "" })
                )
              }
              filters={filters}
            />
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
