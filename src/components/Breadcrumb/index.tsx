import { MdArrowForwardIos } from "react-icons/md";
import { useGetBreadCrumbQuery } from "../../features/folder/fileSystemSliceApiSlice";

function Breadcrumb({ selectedFolderId }: { selectedFolderId?: string }) {
  const { data: breadcrumbData, isLoading } = useGetBreadCrumbQuery(selectedFolderId!, {
    skip: !selectedFolderId,
  });

  if (!selectedFolderId || isLoading || !breadcrumbData) return null;

  return (
    <div className="flex items-center space-x-2 ml-4">
      {breadcrumbData.map((item, index) => (
        <div key={item._id} className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-800">{item.name}</span>
          {index !== breadcrumbData.length - 1 && (
            <MdArrowForwardIos size={16} className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
