import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FileList from "../components/MainPanel/FileList";
import { useGetFoldersQuery } from "../features/folder/folderApiSlice";
import { FolderApiResponse } from "../types/fileSystem";
const Dashboard = () => {
  useGetFoldersQuery<FolderApiResponse>();

  return (
    <div className="text-xl flex h-screen">
      <Sidebar />
      <div className="w-[calc(100% - 370px)] h-full bg-[#e2ecf8] flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="overflow-y-auto custom-scroll p-4 h-full w-full">
          <FileList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
