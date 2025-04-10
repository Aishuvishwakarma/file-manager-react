import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useGetFoldersQuery } from "../../features/folder/folderApiSlice";
import { FolderApiResponse } from "../../types/fileSystem";

interface FolderFilterModalProps {
  onClose: () => void;
  onApply: (filters: {
    name?: string;
    description?: string;
    createdAt?: string;
  }) => void;
  onClear: () => void;
  filters: any;
}

const FolderFilterModal = ({
  onClose,
  onApply,
  onClear,
  filters,
}: FolderFilterModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);

  useEffect(() => {
    refetch();
  }, [filters]);

  const handleApply = () => {
    onApply({
      name: name.trim() || undefined,
      description: description.trim() || undefined,
      createdAt: createdAt || undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setName("");
    setDescription("");
    setCreatedAt("");
    onClear();
  };

  return (
    <div className="absolute top-[60px] right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-[300px] z-40">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <span className="text-sm font-semibold">Filters</span>
        <div className="flex items-center gap-2">
          <button onClick={handleClear} className="text-xs text-red-500">
            Clear
          </button>
          <IoClose className="cursor-pointer text-lg" onClick={onClose} />
        </div>
      </div>

      <div className="px-4 py-3 space-y-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D336B]"
          />
        </div>
      </div>

      <div className="px-4 py-3 border-t flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-3 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-[#2D336B] text-white rounded-md text-sm hover:bg-[#232955]"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FolderFilterModal;
