import SideMenu from "./SideMenu";
import FolderTree from "./FolderTree";
import { FaRegFolder } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import { useGetFileSystemCountQuery } from "../../features/folder/fileSystemSliceApiSlice";
import { updateShowSideBar } from "../../features/folder/fileSystemSlice";
import { useSelector, useDispatch } from "react-redux";

function Index() {
  const { data: foldersCount } = useGetFileSystemCountQuery();
  const dispatch = useDispatch();
  const showSideBar = useSelector((state: any) => state.folder.showSideBar);
  console.log(foldersCount, "foldersCount");
  return (
    <div className="flex h-full relative">
      <SideMenu />
      <div onClick={() => dispatch(updateShowSideBar(!showSideBar))} className="absolute right-0  top-4 cursor-pointer flex justify-center items-center translate-x-1/2 z-40 w-[30px] h-[30px] rounded-full bg-gray-200 shadow-xl duration-300 ease-in-out">
        {showSideBar ? <MdArrowBackIos size={14} className='text-gray-800 ms-2' />
          : <MdArrowForwardIos size={14} className='text-gray-800' />}
      </div>
      {showSideBar && <div className="w-[300px] bg-white border-r-2 border-gray-300 h-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
        <div className="w-full h-[150px] border-b-2 border-gray-300 p-5 space-y-4">
          <p className="text-sm font-medium">Folders & Documents</p>
          <div className="flex space-x-8">
            <div className="space-y-1">
              <FaRegFolder style={{ fontSize: "25px" }} />
              <p className="text-sm font-normal">Folders</p>
              <p className="text-md font-medium">
                {foldersCount?.folders != null ? (foldersCount.folders < 200 ? foldersCount.folders : "200+") : "—"}
              </p>
            </div>

            <div className="border-l border-gray-300 pl-4 space-y-1">
              <FaRegFile style={{ fontSize: "25px" }} />
              <p className="text-sm font-normal">Documents</p>
              <p className="text-md font-medium">
                {foldersCount?.files != null ? (foldersCount.files < 200 ? foldersCount.files : "200+") : "—"}
              </p>
            </div>
          </div>
        </div>
        <FolderTree />
      </div>}

    </div>
  );
}

export default Index;
