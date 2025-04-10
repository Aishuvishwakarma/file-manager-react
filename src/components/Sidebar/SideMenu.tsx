import { FiUser } from "react-icons/fi";

function SideMenu() {
  return (
    <div className="w-[70px] min-w-[70px] bg-[#2D336B] py-5 flex flex-col items-center justify-between h-screen">
      <div className="w-[45px] h-[45px] bg-[#A9B5DF] rounded-md"></div>
      <div className="flex flex-col flex-1 justify-center space-y-4 mt-5">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="w-[40px] h-[40px] bg-[#A9B5DF33] rounded-md hover:bg-[#A9B5DF55] transition"
          ></div>
        ))}
      </div>
      <div className="w-[40px] h-[40px] bg-[#A9B5DF33] rounded-full flex items-center justify-center hover:bg-[#A9B5DF55] transition">
        <FiUser size={20} className="text-white" />
      </div>
    </div>
  );
}

export default SideMenu;
