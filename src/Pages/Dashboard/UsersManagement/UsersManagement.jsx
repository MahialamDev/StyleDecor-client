import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { User, Shield, Trash2, Search } from "lucide-react";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const { data: users = [] } = useQuery({
    queryKey: ["users", searchText, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}&sort=${sort}`);
      return res.data;
    },
  });


  console.log(searchText)



  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        User Management
        <span className="text-primary ml-2">({users.length})</span>
      </h1>
      <span className="block h-1 mx-auto w-10 bg-secondary mb-8"></span>

      {/* Search Field */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            onChange={(e)=>setSearchText(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl shadow-sm focus:outline-primary"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="w-[200px] mt-5">
          <select onChange={e=> setSort(e.target.value)} defaultValue="Pick a color" className="select">
            <option disabled={true}>Select sort</option>
            <option value="">All</option>
            <option value='decorators'>Decoratos</option>
            <option value='admin'>Admin</option>
          </select>
        </div>


      </div>


      
      {/* No Result Found */}
{users.length === 0 && (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center w-full py-16"
  >

    <h2 className="text-xl font-semibold mt-6 text-gray-700">
      No matching users found
    </h2>

    <p className="text-gray-500 mt-1 text-sm">
      Try adjusting your search or filter settings.
    </p>
  </motion.div>
)}

      {/* User Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <motion.div
            key={user._id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-2xl shadow-md border border-primary/60 p-4 bg-white flex flex-col gap-4"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="User"
                className="w-14 h-14 rounded-full border shadow-sm object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <User size={16} /> Joined:{" "}
                <span className="font-medium">
                  {new Date(user.created_At).toLocaleDateString()}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Shield size={16} /> Role:{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
              </p>
            </div>

            {/* Delete Button */}
            <button className="mt-auto flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium shadow">
              <Trash2 size={18} /> Delete User
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UsersManagement;
