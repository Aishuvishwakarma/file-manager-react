import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  useCreateFolderMutation,
  useGetFolderCountQuery,
  useGetFoldersQuery,
  useUpdateFolderMutation,
} from "../../features/folder/folderApiSlice";

import { FilterType, FolderApiResponse } from "../../types/fileSystem";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface FolderModalProps {
  onClose: () => void;
  parentId?: string | null;
  mode?: "create" | "edit";
  initialData?: {
    _id?: string;
    name?: string;
    description?: string;
  };
}

const FolderModal = ({
  onClose,
  mode = "create",
  parentId,
  initialData,
}: FolderModalProps) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [createFolder, { isLoading: creating }] = useCreateFolderMutation();
  const [updateFolder, { isLoading: updating }] = useUpdateFolderMutation();
  
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { refetch } = useGetFoldersQuery<FolderApiResponse>(filters);
  const { refetch: refetchCounts } = useGetFolderCountQuery();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return alert("Folder name is required!");

    try {
      if (mode === "create") {
        await createFolder({ ...form, parent: parentId || null }).unwrap();
      } else if (mode === "edit" && initialData?._id) {
        await updateFolder({ id: initialData._id, data: form }).unwrap();
      }
      refetch();
      refetchCounts()
      onClose();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000008d] z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-800">
            {mode === "edit" ? "Edit Folder" : "Create Folder"}
          </h2>
          <button onClick={onClose} className="text-xl">
            <IoClose />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Folder name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D336B]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Folder Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D336B]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3 border-t border-gray-200">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={creating || updating}
            className="px-4 py-2 bg-[#2D336B] text-white rounded-md hover:bg-[#232955] disabled:opacity-50"
          >
            {creating || updating
              ? "Saving..."
              : mode === "edit"
                ? "Update"
                : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderModal;
