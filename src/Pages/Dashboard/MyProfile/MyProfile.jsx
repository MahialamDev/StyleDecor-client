import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Bell, CircleCheckBig, MoveUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import ScreenLoading from '../../../Components/Animation/ScreenLoading/ScreenLoading';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: dashboardInfo = {} } = useQuery({
    queryKey: ['dashboardInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings-dashboard?userEmail=${user.email}`);
      return res.data
    }
  })

  if (loading) {
    return <ScreenLoading />
  }

  return (
    <section className="w-full p-4 h-full bg-base-100 text-base-content">
      {/* Heading */}
      <div className="flex flex-wrap gap-3 items-center justify-between pb-3 border-b border-base-300">
        <h1 className="text-xl md:text-2xl font-semibold">Client Profile</h1>

       
      </div>

      {/* Profile and Info */}
      <div className="flex flex-col md:flex-row md:gap-6 gap-8 py-8">
        {/* Left Card - Background & Text colors updated */}
        <div className="border border-base-300 p-6 md:p-10 md:min-w-[400px] rounded-2xl space-y-4 flex flex-col items-center bg-base-200 shadow-md">
          <img
            referrerPolicy='no-referrer'
            className="w-24 h-24 rounded-full object-cover shadow border-2 border-secondary"
            src={user.photoURL}
            alt=""
          />

          <h1 className="text-xl font-semibold text-center">{user.displayName}</h1>

          <button className="btn btn-secondary w-full text-white">
            Add New Appointment
          </button>

          <span className="text-success bg-success/10 text-sm p-2 px-5 rounded-md font-medium">
            New Client
          </span>

          <div className="bg-base-300 px-5 py-3 border border-base-300 flex flex-col rounded-2xl w-full space-y-1">
            <span className="opacity-60 text-sm font-medium">Email</span>
            <span className="font-semibold break-all">{user.email}</span>
          </div>

          <div className="bg-base-300 px-5 py-3 border border-base-300 flex flex-col rounded-2xl w-full space-y-1">
            <span className="opacity-60 text-sm font-medium">Gender</span>
            <span className="font-semibold">Male</span>
          </div>

          <div className="bg-base-300 px-5 py-3 border border-base-300 flex flex-col rounded-2xl w-full space-y-1">
            <span className="opacity-60 text-sm font-medium">Verify Email</span>
            <span className="font-semibold text-success flex gap-2 items-center">
              <CircleCheckBig size={18} /> Verified
            </span>
          </div>
        </div>

        {/* Right Cards */}
        <div className="w-full p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">

            <div className="bg-base-200 border border-base-300 p-6 rounded-2xl shadow space-y-2">
              <h1 className="text-primary text-3xl font-semibold">{dashboardInfo?.count}</h1>
              <p className="opacity-60">All Bookings</p>
              <span className="opacity-60 flex items-center gap-2">
                <MoveUpRight size={15} /> 36.67%
              </span>
            </div>

            <div className="bg-base-200 border border-base-300 p-6 rounded-2xl shadow space-y-2">
              <h1 className="text-orange-500 text-3xl font-semibold">{dashboardInfo?.completed_booking}</h1>
              <p className="opacity-60">Completed</p>
              <span className="opacity-60 flex items-center gap-2">
                <MoveUpRight size={15} /> 36.67%
              </span>
            </div>

            <div className="bg-base-200 border border-base-300 p-6 rounded-2xl shadow space-y-2">
              <h1 className="text-secondary text-3xl font-semibold">{dashboardInfo?.cancelled_booking}</h1>
              <p className="opacity-60">Cancelled</p>
              <span className="opacity-60 flex items-center gap-2">
                <MoveUpRight size={15} /> 36.67%
              </span>
            </div>
          </div>

          <div className='bg-base-200 border border-base-300 p-6 rounded-2xl shadow space-y-2 w-full mt-5 text-base-content/80'>
            Here you can manage all your decoration bookings in one place. Explore and track your selected decoration packages, view assigned decorators, check your scheduled date & time, and monitor service progress—from payment to completion. Whether it’s an in-studio consultation or an on-site decoration service, StyleDecor keeps your entire experience organized, transparent, and hassle-free.
          </div>

          {/* Chart Container - Updated to Base-200 for Dark mode compatibility */}
          <div className="mt-10 bg-base-200 border border-base-300 rounded-xl p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">
                Analytics Charts
              </h2>
              <p className="text-sm opacity-60">
                Service Demand Chart — Number of services booked by users
              </p>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={[
                  {
                    name: "Total Bookings",
                    value: dashboardInfo.count || 0,
                    fill: "#2563eb", // Blue-600 kept original
                  },
                  {
                    name: "Completed",
                    value: dashboardInfo.completed_booking || 0,
                    fill: "#16a34a", // Green-600 kept original
                  },
                  {
                    name: "Cancelled",
                    value: dashboardInfo.cancelled_booking || 0,
                    fill: "#dc2626", // Red-600 kept original
                  },
                ]}
                barSize={48}
              >
                {/* Updated Cartesian Grid color to be visible on dark/light backgrounds */}
                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.1}
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor", opacity: 0.6, fontSize: 13 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "currentColor", opacity: 0.6, fontSize: 13 }}
                />

                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                  contentStyle={{
                    backgroundColor: "var(--fallback-b1,oklch(var(--b1)))",
                    borderRadius: "10px",
                    border: "1px solid var(--fallback-b3,oklch(var(--b3)))",
                    fontSize: "14px",
                    color: "inherit"
                  }}
                />

                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;