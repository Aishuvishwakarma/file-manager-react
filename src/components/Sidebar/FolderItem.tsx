import { useState } from "react";
import { FiFolder } from "react-icons/fi";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FolderType } from "../../types/fileSystem";
import { FaFileAlt } from "react-icons/fa";

function FolderItem({ folder }: { folder: FolderType }) {
  const [showChildren, setShowChildren] = useState(false);

  const handleToggle = () => {
    if (
      (folder.children && folder.children.length > 0) ||
      (folder.files && folder.files.length > 0)
    ) {
      setShowChildren(!showChildren);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
        <div className="flex items-center gap-3">
          <FiFolder size={18} />
          <span className="text-sm font-medium">{folder.name}</span>
        </div>
        <div
          onClick={handleToggle}
          className="p-1 flex items-center justify-center text-gray-700 hover:bg-yellow-300 hover:text-white bg-gray-300 rounded-full"
        >
          {showChildren ? <IoMdRemove size={14} /> : <IoMdAdd size={14} />}
        </div>
      </div>

      {showChildren && folder.files && (
        <div className="ml-6">
          {folder.files.map((file) => (
            <div
              key={file._id}
              className="flex items-center gap-2 p-2 pl-1 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
            >
              <FaFileAlt size={14} className="text-blue-500" />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )}

      {showChildren && folder.children && (
        <div className="ml-4">
          {folder.children.map((child) => (
            <FolderItem key={child._id} folder={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
