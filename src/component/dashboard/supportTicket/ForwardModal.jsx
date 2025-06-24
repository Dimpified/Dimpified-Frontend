import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const ForwardModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for users
  const users = [
    { id: 1, name: "Sola Adewunmi", role: "Sales Rep", email: "SolaAdewunmi@gmail.com" },
    { id: 2, name: "Amber Ola", role: "Product Team", email: "SolaAdewunmi@gmail.com" },
    { id: 3, name: "Amber Ola", role: "Product Team", email: "SolaAdewunmi@gmail.com" },
    { id: 4, name: "Amber Ola", role: "Product Team", email: "SolaAdewunmi@gmail.com" },
    { id: 5, name: "Amber Ola", role: "Product Team", email: "SolaAdewunmi@gmail.com" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-lg">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoClose className="text-gray-600 text-xl" />
        </button>

        {/* Search Bar */}
        <div className="relative mb-4 mt-10">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-3 text-gray-400" />
        </div>

        {/* Forward Message Title */}
        <p className="font-semibold mb-2">Forward Message to <span className="ml-2">➡</span></p>

        {/* User List */}
        <div className="space-y-3">
          {users
            .filter((user) =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((user) => (
              <div key={user.id} className="flex items-center gap-3 border-b pb-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-semibold">{user.name} <span className="text-gray-500 text-sm">({user.role})</span></p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ForwardModal;
