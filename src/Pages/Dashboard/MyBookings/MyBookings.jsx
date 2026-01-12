import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  Calendar,
  XCircle,
  CheckCircle,
  Trash2,
  SquarePen,
  MapPinned,
  PackageSearch,
  ArrowRight,
  Info
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";
import Swal from "sweetalert2";
import { useForm, useWatch } from "react-hook-form";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";
import { toast } from "react-toastify";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosInstance();
  const modalRef = useRef();
  const [edit, setEdit] = useState("");
  const [bookings, setBookings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { data: bookingRes = {}, isLoading, refetch } = useQuery({
    queryKey: ["my-bookings", user?.email, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const skip = (currentPage - 1) * limit;
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}&skip=${skip}&limit=${limit}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (bookingRes?.bookingsRes) {
      setBookings(bookingRes.bookingsRes);
      setTotalPages(Math.ceil(bookingRes.count / limit));
    }
  }, [bookingRes, limit]);

  const handlePayment = (id, booking_id) => {
    axiosSecure.post("/create-checkout-session", { serviceId: id, email: user.email, booking_id })
      .then((res) => window.location.assign(res.data.url));
  };

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Cancel booking?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))',
      confirmButtonText: "Yes, Cancel",
      confirmButtonColor: "#f87171",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/cancel-booking?cancel_id=${id}`).then(() => {
          refetch();
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        });
      }
    });
  };

  const { data: serviceCenters = [], isLoading: centersLoading } = useQuery({
    queryKey: ['coverages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coverages');
      return res.data;
    }
  });

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const selectedRegion = useWatch({ control, name: 'booking_region' });
  const regions = [...new Set(serviceCenters.map(c => c.region))];
  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters.filter(c => c.region === region).map(c => c.district);
  };

  const handleEditBooking = (id) => {
    setEdit(id);
    modalRef.current.showModal();
  };

  const handleUpdateBooking = data => {
    const updateInfo = {
      booking_region: data.booking_region || 'N/A',
      booking_district: data.booking_district || 'N/A',
      client_message: data.client_message || 'N/A',
      booking_date: data.booking_date,
    };

    axiosSecure.patch(`/bookings/${edit}/update`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          modalRef.current.close();
          toast.success("Booking Updated!");
          reset();
        }
      });
  };

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Delete permanently?",
      icon: "error",
      showCancelButton: true,
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))',
      confirmButtonText: "Delete",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-bookings/${id}/delete`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Record removed.", "success");
          }
        });
      }
    });
  };

  if (isLoading || centersLoading) return <ScreenLoading />;

  return (
    <div className="bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3 text-base-content">
            <PackageSearch className="text-primary" size={32} />
            My Bookings
          </h1>
          <p className="text-base-content/60 mt-1 font-medium italic">Track and manage your decoration events</p>
        </div>
        <div className="badge badge-primary badge-outline font-bold p-4 rounded-xl">
           Total: {bookingRes.count || 0}
        </div>
      </div>

      {/* Bookings Table-Like View */}
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-30">
          <PackageSearch size={80} />
          <h2 className="text-xl font-bold mt-4">No bookings found</h2>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group bg-base-200/50 hover:bg-base-200 border border-base-300 rounded-2xl p-4 md:p-6 transition-all duration-300 flex flex-col lg:flex-row items-center gap-6"
            >
              {/* Status Indicator Bar (Left Side Desktop) */}
              <div className={`hidden lg:block w-1.5 h-16 rounded-full ${booking.service_status === 'cancelled' ? 'bg-error' : 'bg-success'}`}></div>

              {/* Service Info */}
              <div className="flex-1 w-full text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold tracking-tight">{booking.service_name}</h2>
                  <div className={`badge badge-sm font-bold uppercase ${
                    booking.service_status === "cancelled" ? "badge-error" : "badge-success text-white"
                  }`}>
                    {booking.service_status || "Pending"}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm opacity-70 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> {new Date(booking.booking_date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><MapPinned size={14} className="text-primary"/> {booking.booking_district}</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="flex flex-col items-center lg:items-end w-full lg:w-40 border-y lg:border-y-0 lg:border-x border-base-300 py-3 lg:py-0 lg:px-6">
                 <div className="text-2xl font-black text-secondary flex items-center gap-1">
                    <FaBangladeshiTakaSign size={16} /> {booking.booking_cost}
                 </div>
                 <span className="text-[10px] uppercase font-bold opacity-40">Costing</span>
              </div>

              {/* Payment & Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
                
                {booking.service_status === "cancelled" ? (
                  <div className="btn btn-ghost btn-sm text-error/50 cursor-not-allowed">Disabled</div>
                ) : booking.payment_status === "paid" ? (
                  <div className="btn btn-success btn-sm text-white rounded-xl no-animation">
                    <CheckCircle size={16} /> Paid
                  </div>
                ) : (
                  <button onClick={() => handlePayment(booking.serviceId, booking._id)} className="btn btn-primary btn-sm rounded-xl px-6 shadow-lg shadow-primary/20">
                    Pay Now
                  </button>
                )}

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEditBooking(booking._id)} 
                    className="btn btn-square btn-sm bg-base-300 border-none hover:bg-info hover:text-white transition-colors"
                  >
                    <SquarePen size={18} />
                  </button>
                  
                  {booking.service_status === "cancelled" || booking.service_status === "planning_phase" ? (
                    <button 
                      onClick={() => handleDeleteBooking(booking._id)} 
                      className="btn btn-square btn-sm bg-red-500/10 text-red-500 border-none hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleCancelBooking(booking._id)} 
                      className="btn btn-square btn-sm bg-orange-500/10 text-orange-500 border-none hover:bg-orange-500 hover:text-white"
                      title="Cancel Booking"
                    >
                      <XCircle size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Container */}
      <div className="flex justify-center mt-12">
        <div className="join bg-base-200 border border-base-300 p-1 rounded-2xl">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`join-item btn btn-md border-none ${currentPage === i + 1 ? "btn-primary text-white shadow-lg shadow-primary/30" : "btn-ghost"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Edit Modal - Re-styled for Dark Mode */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 p-8 rounded-[2.5rem]">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Info size={24}/></div>
             <h3 className="text-2xl font-black italic">Update Event</h3>
          </div>

          <form onSubmit={handleSubmit(handleUpdateBooking)} className="space-y-6">
            <div className="form-control w-full">
              <label className="label font-bold text-xs uppercase opacity-50 ml-1">Event Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50" size={18} />
                <input {...register('booking_date', { required: true })} type="date" className="input input-bordered w-full bg-base-200 pl-12 rounded-xl border-base-300 focus:border-primary transition-all" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-bold text-xs uppercase opacity-50 ml-1">Region</label>
                <select {...register('booking_region', { required: true })} className="select select-bordered bg-base-200 rounded-xl border-base-300">
                  <option value="" disabled>Select Region</option>
                  {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label font-bold text-xs uppercase opacity-50 ml-1">District</label>
                <select {...register('booking_district', { required: true })} className="select select-bordered bg-base-200 rounded-xl border-base-300" disabled={!selectedRegion}>
                  <option value="" disabled>Select District</option>
                  {selectedRegion && districtsByRegion(selectedRegion).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-50 ml-1">Instructions</label>
              <textarea {...register('client_message')} className="textarea textarea-bordered bg-base-200 h-28 rounded-xl border-base-300" placeholder="Any special requirements for our decorators?" />
            </div>

            <div className="modal-action flex flex-row-reverse gap-3 mt-8">
              <button type="submit" className="btn btn-primary flex-1 rounded-xl shadow-lg shadow-primary/20">Save Changes</button>
              <form method="dialog" className="flex-1">
                 <button className="btn btn-ghost w-full rounded-xl bg-base-200">Discard</button>
              </form>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;