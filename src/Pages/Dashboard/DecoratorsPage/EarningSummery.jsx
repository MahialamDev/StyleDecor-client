import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaDollarSign, FaProjectDiagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EarningSummary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myAssignProjects = [] } = useQuery({
    queryKey: ["myassignedProjects"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-earnings-summery?email=${user.email}`
      );
      return res.data;
    },
  });

  const perProjectEarning = 500;
  const totalEarning = myAssignProjects.length * perProjectEarning;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 max-w-md mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Earning Summary</h2>
        <FaDollarSign className="text-primary text-2xl" />
      </div>

      {/* Total Earnings */}
      <div className="flex items-center justify-between bg-primary/10 px-5 py-4 rounded-xl mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Earnings</p>
          <p className="text-2xl font-bold text-primary">৳ {totalEarning}</p>
        </div>
      </div>

      {/* Project Count */}
      <div className="flex items-center justify-between bg-base-100 px-5 py-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3">
          <FaProjectDiagram className="text-green-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Completed Projects</p>
            <p className="text-lg font-medium text-gray-800">{myAssignProjects.length}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">৳{perProjectEarning} Per project</p>
      </div>
    </motion.div>
  );
};

export default EarningSummary;
