import {
  FileType,
  FilterType,
  FolderApiResponse,
} from "../../types/fileSystem";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { formatDateTimeParts } from "../../utils/date";
import { FaFileAlt } from "react-icons/fa";
import { useDeleteFolderAndFileMutation } from "../../features/folder/fileSystemSliceApiSlice";
import { useGetFoldersQuery } from "../../features/folder/fileSystemSliceApiSlice";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

function FileItemRow({ file, level = 0, index }: { file: FileType, level?: number, index?: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [deleteFiles] = useDeleteFolderAndFileMutation();
  const isChild = Boolean(file.parent);
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);

  const created = formatDateTimeParts(file.createdAt as string);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteFile = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this file?");
    if (confirmed) {
      await deleteFiles(id);
      refetch();
    }
  };


  return (
    <div key={index} className={
      `bg-[#f8fafc] shadow-sm hover:shadow-md transition grid grid-cols-5 items-center px-3 py-5
      ${isChild ? `border border-gray-200` : 'mt-4 rounded-xl'}`

    }>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-800" style={{ marginLeft: `${level * 20}px` }}>
        <FaFileAlt size={18} className="text-blue-500" />
        <span>{file.name}</span>
      </div>

      <div className="text-sm text-gray-600">—</div>

      <div className="text-sm text-gray-600 space-x-2">
        <span>{created.date}</span>
        <span className="font-semibold">{created.time}</span>
      </div>

      <div className="text-sm text-gray-600">—</div>

      <div className="relative flex justify-end" ref={menuRef}>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <HiDotsVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 w-48 bg-white border rounded shadow-md z-50">
            <ul className="text-sm text-gray-700">
              <li
                onClick={() => file?._id && handleDeleteFile(file._id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <MdDelete size={14} /> Delete
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileItemRow;
