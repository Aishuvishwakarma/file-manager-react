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
import { useDeleteFileMutation, useGetFilesCountQuery } from "../../features/file/fileApiSlice";
import { useGetFoldersQuery } from "../../features/folder/folderApiSlice";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

function FileItemRow({ file }: { file: FileType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [deleteFiles] = useDeleteFileMutation();
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);
  const { refetch: refetchCounts } = useGetFilesCountQuery();

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
      refetchCounts()
    }
  };

  return (
    <tr className="bg-[#f8fafc] border border-gray-200">
      <td className="px-4 py-4 text-sm font-medium text-gray-800 flex items-center gap-2">
        <FaFileAlt size={18} className="text-blue-500" />
        {file.name}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">—</td>
      <td className="px-4 py-4 text-sm text-gray-600">
        <div className="space-x-2">
          <span>{created.date}</span>
          <span className="font-semibold">{created.time}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">—</td>
      <td className="px-4 py-4 relative" ref={menuRef}>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          <HiDotsVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 w-48 bg-white border rounded shadow-md z-50">
            <ul className="text-sm text-gray-700">
              <li
                onClick={() => file && file?._id && handleDeleteFile(file?._id)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <MdDelete size={14} /> Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}

export default FileItemRow;
