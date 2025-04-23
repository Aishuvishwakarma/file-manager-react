import { FiUser } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-[70px] min-w-[70px] bg-[#2D336B] py-5 flex flex-col items-center justify-between h-screen relative">
      {/* Logo */}
      <div className="w-[45px] h-[45px] bg-[#A9B5DF] rounded-md" />

      {/* Menu Icons */}
      <div className="flex flex-col flex-1 justify-center space-y-4 mt-5">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="w-[40px] h-[40px] bg-[#A9B5DF33] rounded-md hover:bg-[#A9B5DF55] transition"
          />
        ))}
      </div>

      {/* User Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-[40px] h-[40px] bg-[#A9B5DF33] rounded-full flex items-center justify-center hover:bg-[#A9B5DF55] transition"
        >
          <FiUser size={20} className="text-white" />
        </button>

        {open && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 bg-white text-sm text-gray-700 rounded-md shadow-lg border z-50 w-36">
            <ul>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideMenu;
