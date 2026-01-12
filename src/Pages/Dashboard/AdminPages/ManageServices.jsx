import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ScreenLoading from '../../../Components/Animation/ScreenLoading/ScreenLoading';
import { Pencil, Trash2, PlusCircle, LayoutGrid } from "lucide-react";
import Swal from 'sweetalert2';

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosSecure.get('/services');
      return res.data;
    }
  });

  const handleDeleteService = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}/delete`)
          .then(res => {
            refetch();
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
          .catch(err => console.log(err))
      }
    });
  }

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="p-4 md:p-6 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 border-b border-base-300 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3 text-base-content">
            <LayoutGrid className="text-primary" />
            Manage Services 
            <span className="text-sm font-medium opacity-50 bg-base-300 px-3 py-1 rounded-full">
              {services.length}
            </span>
          </h1>
          <p className="text-sm text-base-content/60 mt-1 font-medium">Edit, update or remove existing catalog assets.</p>
        </div>

        <Link
          to="/dashboard/add-new-service"
          className="btn btn-primary btn-md rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          <PlusCircle size={18} />
          Add New Service
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="group relative bg-base-100 border border-base-300 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Wrapper */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={service.imageUrl}
                alt={service.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="badge badge-secondary font-bold uppercase text-[10px] tracking-widest px-3 py-3 border-none">
                  {service.service_category}
                </span>
              </div>
            </div>

            {/* Content Wrapper */}
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-base-content line-clamp-1">
                  {service.service_name}
                </h2>
                <p className="text-sm text-base-content/60 line-clamp-2 leading-relaxed font-medium italic">
                  {service.description}
                </p>
              </div>

              {/* Price Details */}
              <div className="bg-base-200/50 p-4 rounded-2xl flex items-center justify-between border border-base-300/50">
                <span className="text-xs font-black uppercase opacity-40">Operational Cost</span>
                <p className="font-black text-lg text-primary">
                  ৳{service.cost}
                  <span className="text-[10px] text-base-content/40 uppercase ml-1 tracking-tighter">
                    / {service.unit}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 mt-auto">
                <Link
                  to={`/dashboard/edit-service/${service._id}`}
                  className="flex-1 btn btn-outline btn-info btn-sm rounded-xl gap-2 font-bold uppercase tracking-tighter"
                >
                  <Pencil size={14} />
                  Edit
                </Link>

                <button 
                  onClick={() => handleDeleteService(service._id)}
                  className="flex-1 btn btn-error btn-sm rounded-xl gap-2 font-bold uppercase tracking-tighter text-white"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-20 opacity-30">
          <LayoutGrid size={64} className="mx-auto mb-4" />
          <p className="text-xl font-bold">No services found in database</p>
        </div>
      )}
    </div>
  );
};

export default ManageServices;