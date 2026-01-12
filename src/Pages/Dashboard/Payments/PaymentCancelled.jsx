import React from 'react';
import { XCircle } from 'lucide-react';

const PaymentCancelled = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            {/* Icon */}
            <div className="mb-6">
                <XCircle className="w-20 h-20 text-primary animate-pulse" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-primary mb-2">Payment Cancelled</h1>

            {/* Subheading */}
            <p className="text-secondary mb-6">
                Your payment was not successful. Please try again or contact support if the problem persists.
            </p>

            {/* Action Button */}
            <button className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/80 transition">
                Retry Payment
            </button>
        </div>
    );
};

export default PaymentCancelled;
