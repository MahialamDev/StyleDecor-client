import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useParams } from 'react-router';
import { Calendar, UserRound, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';

const ServiceDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxiosInstance();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <ScreenLoading />
        );
    }

    return (
        <MySection className="bg-base-100 min-h-screen transition-colors duration-300">
            <MyContainer>

                {/* Back Button */}
                <Link to="/services" className="flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span className="font-medium">Back to Services</span>
                </Link>

                {/* Banner - Added border for dark mode visibility */}
                <div className='w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-base-300'>
                    <img 
                        src={service?.images?.[0]?.url} 
                        alt={service?.images?.[0]?.alt}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'
                    />
                </div>

                {/* Content */}
                <div className="mt-10 space-y-8">

                    {/* Title + Category */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h1 className="text-3xl md:text-5xl font-black text-base-content capitalize">
                            {service.service_name}
                        </h1>

                        <div className="flex items-center gap-2">
                             <span className="px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 font-bold capitalize">
                                {service.service_category}
                            </span>
                        </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-base-200 border border-base-300 gap-6">
                        <div className="text-3xl font-black text-primary">
                            {service.cost} {service.currency} 
                            <span className="text-base-content/50 text-lg font-medium"> / {service.unit}</span>
                        </div>

                        <Link 
                            to={`/book-service/${service._id}`}
                            className="btn btn-primary text-white px-10 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                        >
                            Book This Service
                        </Link>
                    </div>

                    {/* Description */}
                    <div className="prose max-w-none">
                        <h3 className="text-xl font-bold text-base-content mb-3">About this service</h3>
                        <p className="text-base-content/70 text-lg leading-relaxed">
                            {service.description}
                        </p>
                    </div>

                    {/* Extra Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <UserRound size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase font-bold opacity-40">Provider</span>
                                <span className="text-sm font-semibold text-base-content truncate">{service.createdByEmail}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Calendar size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase font-bold opacity-40">Posted On</span>
                                <span className="text-sm font-semibold text-base-content">{new Date(service.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-base-200/50 border border-base-300">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Tag size={22} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs uppercase font-bold opacity-40">Service Type</span>
                                <span className="text-sm font-semibold text-base-content capitalize">{service.service_category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default ServiceDetails;