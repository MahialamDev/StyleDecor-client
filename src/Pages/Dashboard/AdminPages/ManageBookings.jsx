import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Settings2, UserCheck, Calendar, MapPin, Mail, CreditCard } from "lucide-react";

// Updated colors for dark mode compatibility
const statusColors = {
  paid: "bg-success/20 text-success",
  pending: "bg-warning/20 text-warning",
  cancelled: "bg-error/20 text-error",
};

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [sort, setSort] = useState("");

  const { data: bookings = [], refetch: decRefetch } = useQuery({
    queryKey: ["bookings", sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?sort=${sort}`);
      return res.data;
    },
  });

  const handleFindDecorators = (booking) => {
    modalRef.current.showModal();
    setSelectedBooking(booking);
  };

  const { data: decorators = [], refetch } = useQuery({
    queryKey: ["decorators", selectedBooking],
    queryFn: async () => {
      if (!selectedBooking) return [];
      const res = await axiosSecure(
        `/decorators?district=${selectedBooking.booking_district}&work_status=available&application_status=approved`
      );
      return res.data;
    },
    enabled: !!selectedBooking,
  });

  const handleAssignDecorators = (decorator) => {
    axiosSecure.patch(`/assign-decorator?booking_id=${selectedBooking._id}`, decorator)
      .then(() => {
        modalRef.current.close();
        Swal.fire({
          title: "Assigned Successfully!",
          icon: "success",
        });
        refetch();
        decRefetch();
      });
  };

  return (
    <div className="p-4 md:p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-base-300 pb-6">
        <div>
          <h1 className="text-2xl font-black text-base-content tracking-tight flex items-center gap-3">
            <Settings2 className="text-primary" />
            Manage Bookings
            <span className="badge badge-primary badge-outline font-mono">{bookings.length}</span>
          </h1>
          <p className="text-sm text-base-content/60 mt-1">Assign decorators and monitor event statuses.</p>
        </div>

        <div className="flex items-center gap-3 bg-base-200 p-1 rounded-xl border border-base-300">
          <span className="text-xs font-bold uppercase tracking-widest px-3 opacity-50">Sort</span>
          <select
            onChange={(e) => setSort(e.target.value)}
            defaultValue=""
            className="select select-sm select-ghost focus:bg-transparent text-base-content"
          >
            <option value="">All Transactions</option>
            <option value="service_status=cancelled">Cancelled</option>
            <option value="payment_status=paid">Pending (Paid)</option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            whileHover={{ y: -5 }}
            className="group bg-base-100 border border-primary/20 rounded-[2rem] p-6 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-base-content leading-tight group-hover:text-primary transition-colors">
                {booking.service_name}
              </h2>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${statusColors[booking.payment_status] || "bg-base-200 text-base-content"}`}>
                {booking.payment_status}
              </span>
            </div>

            {/* Date & Decorator */}
            <div className="flex items-center gap-4 text-xs font-bold mb-6">
              <div className="flex items-center gap-1.5 text-base-content/50">
                <Calendar size={14} />
                {booking.booking_date}
              </div>
              <div className="flex items-center gap-1.5 text-success">
                <UserCheck size={14} />
                {booking?.decorator_name || "Unassigned"}
              </div>
            </div>

            {/* Core Info */}
            <div className="space-y-3 p-4 bg-base-200/50 rounded-2xl border border-base-300/50 text-sm mb-6">
              <div className="flex items-center gap-2 text-base-content/70">
                <Mail size={14} className="opacity-40" />
                <span className="truncate">{booking.client_email}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/70">
                <MapPin size={14} className="opacity-40" />
                <span>{booking.booking_district}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-base-300">
                <span className="text-[10px] font-black uppercase opacity-40 italic">{booking.service_category}</span>
                <span className="font-black text-primary flex items-center gap-1">
                  <CreditCard size={14} /> ৳{booking.booking_cost}
                </span>
              </div>
            </div>

            {/* Footer Action */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold opacity-30 italic">
                Dep: {booking.created_At.slice(0, 10)}
              </p>

              {booking?.service_status === "cancelled" ? (
                <span className="badge badge-error badge-outline h-9 px-4 font-bold text-[10px] uppercase">Terminated</span>
              ) : booking?.payment_status !== "paid" ? (
                <span className="badge badge-warning badge-outline h-9 px-4 font-bold text-[10px] uppercase tracking-tighter">Awaiting Payment</span>
              ) : booking?.service_status === "wait_for_assign" ? (
                <button
                  onClick={() => handleFindDecorators(booking)}
                  className="btn btn-primary btn-sm rounded-xl h-9 px-4 font-bold shadow-lg shadow-primary/20"
                >
                  Find Decorator
                </button>
              ) : (
                <span className="badge badge-success badge-outline h-9 px-4 font-bold text-[10px] uppercase">{booking?.service_status}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Section */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box max-w-3xl p-0 overflow-hidden bg-base-100 border border-base-300 rounded-3xl">
          {/* Modal Header */}
          <div className="bg-primary p-6 text-primary-content">
            <h3 className="font-black text-2xl uppercase tracking-tighter">Assign Personnel</h3>
            <div className="flex items-center justify-between mt-2 opacity-80">
              <p className="text-sm font-medium">District Filter: {selectedBooking?.booking_district}</p>
              <p className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full italic">Available: {decorators.length}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-200/30">
              <table className="table table-zebra">
                <thead>
                  <tr className="border-base-300 text-base-content/50 uppercase text-[10px] tracking-widest">
                    <th>#</th>
                    <th>Full Name</th>
                    <th>District</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-base-content font-medium">
                  {decorators.map((decorator, i) => (
                    <tr key={decorator._id} className="border-base-300 hover:bg-base-300/50 transition-colors">
                      <th className="opacity-30">{i + 1}</th>
                      <td className="font-bold">{decorator.name}</td>
                      <td className="opacity-70 italic">{decorator.district}</td>
                      <td className="text-right">
                        <button
                          onClick={() => handleAssignDecorators(decorator)}
                          className="btn btn-primary btn-xs rounded-lg px-4 h-8"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {decorators.length === 0 && (
                <div className="p-10 text-center text-base-content/30 italic font-medium">
                  No available decorators found in this district.
                </div>
              )}
            </div>
          </div>

          <div className="modal-action px-6 pb-6">
            <form method="dialog">
              <button className="btn btn-ghost font-bold uppercase tracking-widest text-xs">Dismiss</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;