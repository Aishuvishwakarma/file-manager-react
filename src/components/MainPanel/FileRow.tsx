import { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiFolderPlus, FiFolder } from "react-icons/fi";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { RiFolderUploadFill } from "react-icons/ri";
import {
  FilterType,
  FolderApiResponse,
  FolderType,
  FileType,
} from "../../types/fileSystem";
import FolderModal from "../FolderModal";
import FileUploadModal from "../FileUploadModal";
import {
  useDeleteFolderAndFileMutation,
  useGetFoldersQuery,
  useGetFileSystemCountQuery,
} from "../../features/folder/fileSystemSliceApiSlice";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { formatDateTimeParts } from "../../utils/date";
import FileItemRow from "./FileItemRow";
import { updateBreadcrumb } from "../../features/folder/fileSystemSlice";

// same imports...

function FileRow({
  folder,
  level = 0,
}: {
  folder: FolderType;
  level?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showfileModal, setShowFileModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editFolder, setEditFolder] = useState<FolderType | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const dispatch = useDispatch();
  const [deleteFolder] = useDeleteFolderAndFileMutation();
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);
  const { refetch: refetchCounts } = useGetFileSystemCountQuery();

  const toggleChildren = () => {
    setIsOpen(!isOpen);
    dispatch(updateBreadcrumb({ folderId: folder._id }));
  }
  const handleOpenCreateFolder = (parentId?: string) => {
    setSelectedParent(parentId || null);
    setEditFolder(null);
    setMode("create");
    setShowModal(true);
  };

  const handleOpenUploadFile = (parentId?: string) => {
    setShowFileModal(true);
    setSelectedParent(parentId || null);
  };

  const handleUpdateFolder = (folder: FolderType) => {
    setEditFolder(folder);
    setSelectedParent(null);
    setMode("edit");
    setShowModal(true);
  };

  const handleDeleteFolder = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this folder?");
    if (confirmed) {
      await deleteFolder(id);
      refetch();
      refetchCounts();
    }
  };

  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const created = formatDateTimeParts(folder.createdAt as string);
  const updated = formatDateTimeParts(folder.updatedAt as string);


  return (
    <>
      <div
        className={
          `bg-[${isOpen ? "#f2f2f2" : "#f8fafc"}] ${isOpen ? "shadow-none" : "shadow-sm"}  transition grid grid-cols-5 items-center px-3 py-5 ${folder.parent ? "mb-0 rounded-none border border-gray-200" : "mt-4 rounded-xl"}`
        }
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <div
            className="relative w-6 h-6 cursor-pointer"
            onClick={toggleChildren}
            style={{ marginLeft: `${level * 20}px` }}
          >
            {isOpen ? (
              <AiFillCaretDown size={18} />
            ) : (
              <AiFillCaretRight size={18} />
            )}
          </div>

          <div className="relative">
            <FiFolder size={20} className="text-gray-600" />
            <span className="absolute -top-1 -left-1 bg-yellow-400 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow">
              {(folder.children?.length || 0) +
                (Array.isArray(folder.files) ? folder.files.length : 0)}
            </span>
          </div>

          <span>{folder.name}</span>
        </span>

        <span className="text-sm text-gray-600">
          {folder.description || "—"}
        </span>
        <span className="text-sm text-gray-600">
          <span>{created.date}</span>{" "}
          <span className="font-semibold">{created.time}</span>
        </span>
        <span className="text-sm text-gray-600">
          <span>{updated.date}</span>{" "}
          <span className="font-semibold">{updated.time}</span>
        </span>
        <span className="relative flex justify-end" ref={menuRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <HiDotsVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white border rounded shadow-md z-50">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => handleUpdateFolder(folder)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FaPen size={14} /> Edit
                </li>
                <li
                  onClick={() => handleDeleteFolder(folder._id!)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <MdDelete size={14} /> Delete
                </li>
                <li
                  onClick={() => handleOpenCreateFolder(folder._id!)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FiFolderPlus size={14} /> Create Folder
                </li>
                <li
                  onClick={() => handleOpenUploadFile(folder._id!)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <RiFolderUploadFill size={14} /> Upload Document
                </li>
              </ul>
            </div>
          )}
        </span>
      </div>


      {isOpen &&
        folder.children?.map((child) => (
          <FileRow key={child._id} folder={child} level={level + 1} />
        ))}
      {isOpen &&
        folder.files?.map((file: FileType, index) => (
          <FileItemRow key={file._id} index={index} file={file} level={level + 1} />
        ))}

      {showModal && (
        <FolderModal
          onClose={() => {
            setShowModal(false);
            setEditFolder(null);
          }}
          parentId={mode === "create" ? selectedParent : null}
          mode={mode}
          initialData={editFolder || undefined}
        />
      )}
      {showfileModal && (
        <FileUploadModal
          folderId={selectedParent}
          onClose={() => {
            setSelectedParent(null);
            setShowFileModal(false);
          }}
        />
      )}
    </>
  );
}

export default FileRow;

