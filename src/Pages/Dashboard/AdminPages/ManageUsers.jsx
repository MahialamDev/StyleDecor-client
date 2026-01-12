import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";
import Swal from "sweetalert2";
import { 
  UserCog, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Mail, 
  CalendarDays, 
  Users,
  Fingerprint,
  ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const searchInputRef = useRef();
  const [params, setParams] = useState({ text: "", sort: "" });

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", params.text, params.sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${params.text}&sort=${params.sort}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setParams(prev => ({ ...prev, text: searchInputRef.current.value }));
  };

  const updateUserRole = (userId, newRole) => {
    Swal.fire({
      title: "Update Permissions?",
      text: `Grant ${newRole.toUpperCase()} access level to this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role?id=${userId}&role=${newRole}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            toast.success(`Role updated successfully`);
          }
        });
      }
    });
  };

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="min-h-screen bg-transparent space-y-8 pb-10">
      {/* Header with Glass Effect */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 bg-base-200/40 border border-base-300 rounded-[2.5rem] backdrop-blur-md gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary/20 rounded-2xl text-primary">
              <Users size={28} />
            </div>
            <h1 className="text-3xl font-black text-base-content tracking-tight">Access Control</h1>
          </div>
          <p className="text-base-content/60 font-medium ml-1">Managing {users.length} system identities</p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full lg:w-auto gap-3">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search UID, Email..."
              className="input input-bordered w-full pl-12 bg-base-100/50 border-base-300 rounded-2xl focus:border-primary transition-all font-medium"
            />
          </div>
          <button type="submit" className="btn btn-primary rounded-2xl px-6 shadow-lg shadow-primary/20">
            Search
          </button>
        </form>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 px-2">
        {["", "admin", "decorator", "user"].map((role) => (
          <button
            key={role}
            onClick={() => setParams(prev => ({ ...prev, sort: role }))}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
              params.sort === role 
              ? "bg-secondary border-secondary text-secondary-content shadow-md shadow-secondary/20" 
              : "bg-base-200 border-base-300 text-base-content/50 hover:border-primary"
            }`}
          >
            {role === "" ? "All Members" : role + "s"}
          </button>
        ))}
      </div>

      {/* User List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <div 
            key={user._id} 
            className="group relative bg-base-100 border border-gray-300/20 rounded-[2rem] shadow p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-[1.5rem] ring-2 ring-base-300 ring-offset-base-100 ring-offset-4 group-hover:ring-primary transition-all">
                    <img src={user.photoURL || "/default-avatar.png"} alt="profile" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-base-content truncate max-w-[150px]">{user.name}</h3>
                  <div className={`badge badge-sm font-bold border-none py-3 px-3 rounded-lg mt-1 ${
                    user.role === 'admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'
                  }`}>
                    {user.role?.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="p-2 bg-base-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={20} className="text-base-content/40" />
              </div>
            </div>

            <div className="space-y-3 bg-base-200/50 p-4 rounded-2xl border border-base-300">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="opacity-40 flex items-center gap-1.5"><Mail size={14}/> Email</span>
                <span className="opacity-80 truncate ml-4 font-mono">{user.email}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="opacity-40 flex items-center gap-1.5"><CalendarDays size={14}/> Registered</span>
                <span className="opacity-80">{new Date(user.created_At).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                <span className="opacity-40 flex items-center gap-1.5"><Fingerprint size={14}/> ID</span>
                <span className="opacity-80 font-mono">...{user._id.slice(-6)}</span>
              </div>
            </div>

            <div className="mt-6">
              {user.role === "admin" ? (
                <button 
                  onClick={() => updateUserRole(user._id, "user")}
                  className="btn btn-block bg-error/10 hover:bg-error border-none text-error hover:text-white rounded-xl font-bold transition-all gap-2"
                >
                  <ShieldAlert size={18} /> Remove to Admin
                </button>
              ) : (
                <button 
                  onClick={() => updateUserRole(user._id, "admin")}
                  className="btn btn-block bg-primary/10 hover:bg-primary border-none text-primary hover:text-white rounded-xl font-bold transition-all gap-2"
                >
                  <ShieldCheck size={18} /> Promote to Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-base-300 rounded-[3rem] opacity-30">
          <Fingerprint size={80} strokeWidth={1} />
          <h2 className="text-2xl font-black mt-4 uppercase tracking-[0.3em]">No Identities Found</h2>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;