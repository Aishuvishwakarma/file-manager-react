import { useState } from "react";
import { FiFolder } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FolderType } from "../../types/fileSystem";

function FolderItem({ folder }: { folder: FolderType }) {
  const [showChildren, setShowChildren] = useState(false);

  const handleToggle = () => {
    if (folder.children && folder.children.length > 0) {
      setShowChildren(!showChildren);
    }
  };

  return (
    <div>
      {/* Main Row */}
      <div className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
        <div className="flex items-center gap-3">
          <FiFolder className="" size={18} />
          <span className="text-sm font-medium">{folder.name}</span>
        </div>

        {/* + Button toggles child folders */}
        <div
          onClick={handleToggle}
          className="p-1 flex items-center justify-center text-gray-700 hover:bg-yellow-300 hover:text-white bg-gray-300 rounded-full"
        >
          <IoMdAdd size={14} />
        </div>
      </div>

      {/* Children Tree */}
      {showChildren && folder.children && (
        <div className="ml-4">
          {folder?.children.map((child) => (
            <FolderItem key={child._id} folder={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
