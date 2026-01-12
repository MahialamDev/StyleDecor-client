import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  BadgeCheck,
  BadgeX,
  Hammer,
} from "lucide-react";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const { data: decorators = [], isLoading, refetch } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  // Dark-mode aware SweetAlert helper
  const toast = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
    });
  };

  const handleApproveDecorator = (email) => {
    const updateRole = "decorator";
    axiosSecure
      .patch(
        `/decorators/role?email=${email}&role=${updateRole}&application_status=approved`
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast("Updated!", "Approved Decorator Successfully.", "success");
        }
      });
  };

  const handleRejectDecorator = (email) => {
    axiosSecure
      .patch(`/decorators/role?email=${email}&application_status=rejected`)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast("Updated!", "Rejected Decorator Successfully.", "success");
        }
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-base-content opacity-50">
        Loading decorators...
      </div>
    );

  if (decorators.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-base-content opacity-50">
        No decorator applications found.
      </div>
    );

  return (
    // Changed bg-slate-100 to bg-base-200
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-12 text-base-content">
        Decorator Management
        <span className="ml-2 text-primary">({decorators.length})</span>
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {decorators.map((decorator) => (
          <div
            key={decorator._id}
            // Changed bg-white to bg-base-100 and border color
            className="relative bg-base-100 border border-base-300 rounded-3xl shadow-lg hover:shadow-2xl transition"
          >
            {/* Status Ribbon */}
            <div
              className={`absolute top-5 right-5 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                decorator.application_status === "approved"
                  ? "bg-green-500/10 text-green-500"
                  : decorator.application_status === "rejected"
                  ? "bg-red-500/10 text-red-500"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}
            >
              {decorator.application_status === "approved" && (
                <BadgeCheck size={14} />
              )}
              {decorator.application_status === "rejected" && (
                <BadgeX size={14} />
              )}
              <span className="capitalize">{decorator.application_status}</span>
            </div>

            {/* Header */}
            <div className="p-6 border-b border-base-300">
              <h2 className="text-xl font-semibold text-base-content">
                {decorator.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-base-content opacity-60 mt-1">
                <Mail size={14} />
                {decorator.email}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-sm text-base-content">
              <div className="flex items-center gap-3">
                <Phone size={16} className="opacity-40" />
                <span>{decorator.phone || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="opacity-40" />
                <span>
                  {decorator.district || "N/A"},{" "}
                  {decorator.region || "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={16} className="opacity-40" />
                <span>
                  {decorator.application_At
                    ? new Date(
                        decorator.application_At
                      ).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Hammer size={16} className="opacity-40" />
                <span
                  className={`font-semibold capitalize ${
                    decorator.work_status === "available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {decorator.work_status || "N/A"}
                </span>
              </div>
            </div>

            {/* Action */}
            {/* Changed bg-gray-50 to bg-base-200/50 */}
            <div className="p-5 border-t border-base-300 bg-base-200/50 rounded-b-3xl">
              {decorator.application_status === "approved" ? (
                <button
                  onClick={() => handleRejectDecorator(decorator.email)}
                  className="w-full py-2.5 rounded-xl bg-error hover:bg-error/80 text-error-content font-semibold transition"
                >
                  Reject Decorator
                </button>
              ) : (
                <button
                  onClick={() => handleApproveDecorator(decorator.email)}
                  className="w-full py-2.5 rounded-xl bg-success hover:bg-success/80 text-success-content font-semibold transition"
                >
                  Approve Decorator
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDecorators;