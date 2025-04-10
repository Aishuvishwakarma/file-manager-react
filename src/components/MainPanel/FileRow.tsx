import { useState, useRef, useEffect, forwardRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiFolderPlus, FiFolder } from "react-icons/fi";
import { AiFillCaretRight } from "react-icons/ai";
import { RiFolderUploadFill } from "react-icons/ri";
import { FolderApiResponse, FolderType } from "../../types/fileSystem";
import FolderModal from "../FolderModal";
import { useDeleteFolderMutation, useGetFoldersQuery } from "../../features/folder/folderApiSlice";

function formatDateTimeParts(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    date: `${day}/${month}/${year}`,
    time: `${hours}:${minutes}`,
  };
}

function FileRow({ folder, level = 0 }: { folder: FolderType; level?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteFolder] = useDeleteFolderMutation();
  const [editFolder, setEditFolder] = useState<FolderType | null>(null);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const { refetch } = useGetFoldersQuery<FolderApiResponse>();

  const handleOpenCreateFolder = (parentId?: string) => {
    setSelectedParent(parentId || null);
    setEditFolder(null);
    setMode("create");
    setShowModal(true);
  };

  const handleUpdateFolder = (folder: FolderType) => {
    setEditFolder(folder);
    setSelectedParent(null);
    setMode("edit")
    setShowModal(true);
  };

  const handleDeleteFolder = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this folder?");
    if (confirmed) {
      await deleteFolder(id);
      refetch();
    }
  };

  forwardRef
  const toggleChildren = () => {
    setIsOpen(!isOpen);
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
      <tr className="bg-[#f8fafc] border border-gray-200 rounded-lg" style={{ marginBottom: "10px" }}>
        {/* Folder Icon and Name */}
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 flex items-center gap-3">
          <div
            className="relative w-6 h-6 cursor-pointer"
            onClick={toggleChildren}
            style={{ marginLeft: `${level * 20}px` }}
          >
            {isOpen ? <AiFillCaretRight size={24} /> : <FiFolder size={24} />}
            <span className="absolute -top-1 -left-1 bg-yellow-400 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow">
              {folder.children ? folder.children.length : 0}
            </span>
          </div>
          {folder.name}
        </td>

        {/* Description */}
        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
          {folder.description || "No description"}
        </td>

        {/* Created At */}
        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
          <div className="flex space-x-2">
            <span>{created.date}</span>
            <span className="font-semibold text-black">{created.time}</span>
          </div>
        </td>

        {/* Updated At */}
        <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
          <div className="flex space-x-2">
            <span>{updated.date}</span>
            <span className="font-semibold text-black">{updated.time}</span>
          </div>
        </td>

        {/* Actions Menu */}
        <td className="px-4 py-4 text-right relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <HiDotsVertical
              size={18}
              className="text-gray-500 hover:text-gray-700"
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li onClick={() => handleUpdateFolder(folder)} className="flex items-center border-b border-gray-200 gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <FaPen size={16} /> Edit
                </li>
                <li onClick={() => handleDeleteFolder(folder._id!)} className="flex items-center border-b border-gray-200 gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <MdDelete size={16} /> Delete
                </li>
                <li onClick={() => handleOpenCreateFolder(folder._id!)} className="flex items-center border-b border-gray-200 gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <FiFolderPlus size={16} /> Create Folder
                </li>
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <RiFolderUploadFill size={16} /> Upload Document
                </li>
              </ul>
            </div>
          )}
        </td>

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
      </tr>

      {/* Render Children if Open */}
      {isOpen && folder.children?.map((child) => (
        <FileRow key={child._id} folder={child} level={level + 1} />
      ))}
    </>
  );
}

export default FileRow;
