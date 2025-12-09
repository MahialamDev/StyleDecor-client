import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get('session_id');
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res)
        setTransactionId(res.data.transitionId);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 md:px-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white shadow-xl rounded-2xl max-w-md w-full p-4 md:p-6 flex flex-col items-center text-center border-t-8 border-primary"
      >
        {/* Success Icon */}
        <CheckCircle className="text-primary w-16 h-16 mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-4">
          Thank you for your payment. Your booking is confirmed.
        </p>

        {/* Transaction ID */}
        {transactionId && (
          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 mb-4 w-full break-words">
            Transaction ID : <span className="font-mono font-semibold">{transactionId}</span>
          </div>
        )}

        {/* Payment Date */}
        <p className="text-gray-500 mb-6">
          Date: <span className="font-medium">{new Date().toLocaleDateString()}</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center">
          <Link to='/dashboard/my-bookings' className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary/80 transition">
            Go to Dashboard
          </Link>
          <Link to='/services' className="bg-secondary text-white px-5 py-2 rounded-lg font-medium hover:bg-secondary/80 transition">
            Book Another Service
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
