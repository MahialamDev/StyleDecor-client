import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import ScreenLoading from '../../../Components/Animation/ScreenLoading/ScreenLoading';
import { 
  ReceiptText, 
  Calendar, 
  Hash, 
  ExternalLink, 
  CheckCircle2, 
  CreditCard,
  ArrowUpRight
} from 'lucide-react';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const PaymentsHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: paymentsHistory = [], isLoading } = useQuery({
        queryKey: ['paymenthistory', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-payments-history?email=${user.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) return <ScreenLoading />;

    return (
        <div className="bg-transparent space-y-8">
            {/* Header with Stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-base-300 pb-8">
                <div>
                    <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                        <ReceiptText className="text-secondary" size={32} />
                        Payment History
                    </h2>
                    <p className="text-base-content/60 font-medium mt-1">Review and manage your financial transactions</p>
                </div>
                
                <div className="stats shadow bg-base-200 border border-base-300 rounded-2xl overflow-hidden">
                    <div className="stat px-8 py-3">
                        <div className="stat-title text-[10px] uppercase font-bold tracking-widest">Total Spent</div>
                        <div className="stat-value text-2xl text-secondary flex items-center gap-1">
                            <FaBangladeshiTakaSign size={18} />
                            {paymentsHistory.reduce((acc, curr) => acc + (parseFloat(curr.booking_cost) || 0), 0).toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            {paymentsHistory.length === 0 ? (
                <div className="text-center py-20 bg-base-200/50 rounded-[2rem] border-2 border-dashed border-base-300">
                    <CreditCard size={48} className="mx-auto opacity-20 mb-4" />
                    <h3 className="text-xl font-bold opacity-40">No Transactions Recorded</h3>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    {/* Professional Table for Desktop */}
                    <table className="table w-full border-separate border-spacing-y-3">
                        <thead className="bg-transparent">
                            <tr className="text-base-content/50 border-none uppercase text-[11px] font-bold tracking-widest">
                                <th className="bg-transparent">Service Details</th>
                                <th className="bg-transparent">Transaction ID</th>
                                <th className="bg-transparent">Date</th>
                                <th className="bg-transparent">Amount</th>
                                <th className="bg-transparent">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {paymentsHistory.map((payment) => (
                                <tr key={payment.transitionId} className="group transition-all">
                                    <td className="bg-base-200 border-y border-l border-base-300 rounded-l-2xl group-hover:bg-base-300/50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <Hash size={18} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm">Booking ID</div>
                                                <div className="text-xs opacity-50 font-mono">#{payment.booking_id?.slice(-10)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="bg-base-200 border-y border-base-300 group-hover:bg-base-300/50">
                                        <div className="flex items-center gap-2 text-xs font-mono opacity-70">
                                            {payment.transitionId}
                                            <ExternalLink size={12} className="cursor-pointer hover:text-primary" />
                                        </div>
                                    </td>
                                    <td className="bg-base-200 border-y border-base-300 group-hover:bg-base-300/50">
                                        <div className="flex items-center gap-2 text-sm font-medium opacity-80">
                                            <Calendar size={14} className="text-secondary" />
                                            {new Date(payment.paidAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="bg-base-200 border-y border-base-300 group-hover:bg-base-300/50">
                                        <div className="text-lg font-black text-secondary flex items-center gap-0.5">
                                            <FaBangladeshiTakaSign size={14} />
                                            {payment.booking_cost}
                                        </div>
                                    </td>
                                    <td className="bg-base-200 border-y border-r border-base-300 rounded-r-2xl group-hover:bg-base-300/50">
                                        <div className={`badge badge-sm font-bold py-3 px-4 rounded-lg border-none ${
                                            payment.payment_status === 'paid' 
                                            ? 'bg-success/10 text-success' 
                                            : 'bg-error/10 text-error'
                                        }`}>
                                            {payment.payment_status === 'paid' && <CheckCircle2 size={12} className="mr-1" />}
                                            {payment.payment_status.toUpperCase()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Helper Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                        <ArrowUpRight size={20} />
                    </div>
                    <p className="text-xs font-medium opacity-70 max-w-xs">
                        Need a formal invoice for your taxes or records? Contact our billing department.
                    </p>
                </div>
                <button className="btn btn-secondary btn-sm rounded-xl px-6">Support Center</button>
            </div>
        </div>
    );
};

export default PaymentsHistory;