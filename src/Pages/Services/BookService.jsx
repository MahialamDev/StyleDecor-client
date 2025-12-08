import React from 'react';
import { Link, useParams } from 'react-router';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import PrimaryBtn from '../../Components/UI/PrimaryBtn/primaryBtn';
import TransparentBtn from '../../Components/UI/TransparentBtn/TransparentBtn';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookService = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const axiosSecure = useAxiosSecure();

    const { data: service = {}, isLoading } = useQuery({
        queryKey: ['service', id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`);
            return res.data;
        }
    });

     const { register, handleSubmit } = useForm();

    if (isLoading) {
        return (
            <ScreenLoading />
        );
    }


    const handleBookNow = (data) => {
        console.log(data)
        axiosSecure.post('/bookings', data)
            .then(res => console.log(res))
            .catch(err=> console.log(err))
        
    }


   


    return (
        <MySection>
            <MyContainer>
                <div className='w-full h-ful border'>
                     <h1 className='text-2xl md:text-3xl font-semibold text-center'>Book Now</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 border'>
                        {/* Form Start */}
                        <form onSubmit={handleSubmit(handleBookNow)} className='p-4 space-y-2'>
                            {/* Service Nmae */}
                        <label>Service Name</label>
                        <input
                          {...register("service_name", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={service.service_name}
                            readOnly
                            />
                            {/* Service Nmae */}
                        <label>Service Category</label>
                        <input
                          {...register("service_category", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text capitalize"
                            placeholder="your name"
                            value={service.service_category}
                            readOnly
                            />
                            
                            {/* Name */}
                        <label>Your Name</label>
                        <input
                          {...register("name", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={user.displayName}
                            readOnly
                        />
                            {/* Email */}
                        <label>Your Email</label>
                        <input
                          {...register("email", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={user.email}
                            readOnly
                            />
                        {/* Cost */}
                        <input
                          {...register("cost", { required: true })}
                          className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"
                          type="text"
                            placeholder="your name"
                            value={service.cost} 
                            readOnly
                            />
                            <label>Booking Date</label>
                            {/* Date */}
                            <input {...register('booking_date')} type="date" className="w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm"  />
                            
                            <button type='submit' className='transition duration-300 py-1.5 md:py-2 px-2 md:px-4 text-md md:text-[16px] rounded-sm border-2 border-primary hover:bg-primary bg-transparent hover:text-base-200 cursor-pointer'>Confirm Booking</button>
                       

                        </form>
                        
                        <div>

                        </div>
                    </div>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default BookService;