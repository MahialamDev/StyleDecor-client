import React, { useState } from 'react';
import MyContainer from '../../Layouts/MyContainer';
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import MySection from '../../Layouts/MySection';
import { Link } from 'react-router';
import TransparentBtn from '../../Components/UI/TransparentBtn/TransparentBtn';

const Services = () => {
    const [order, setOrder] = useState("")
    const [searchText, setSearchText] = useState("")
    const axiosInstance = useAxiosInstance();
    const { data:services = [], isLoading } = useQuery({
        queryKey: ['services',order, searchText],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services?sort=cost&order=${order}&searchText=${searchText}`);
            return res.data;
        }
    })




    

    if (isLoading) {
        return <ScreenLoading />
    }

    return (
        <MySection>
            <MyContainer>
                <div className='-mt-5'>
                   <h1 className='text-center text-4xl font-semibold'>Our Services</h1>
                    <span className='block h-1 mx-auto w-10 bg-secondary mt-2'></span>
                    {/* Grid Display */}

                    {/* Search & Sort */}
<div className="mt-8 p-5 bg-base-200 rounded-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
{/* Sort Dropdown */}
<select
value={order}
onChange={(e) => setOrder(e.target.value)}
className="select w-full md:w-52"
>
<option value="">Sort By</option>
<option value="asc">Price Min - Max</option>
<option value="desc">Price Max - Min</option>
</select>


{/* Search Input */}
<input
type="search"
value={searchText}
onChange={(e) => setSearchText(e.target.value)}
placeholder="Search Services"
className="input w-full md:w-72"
/>
</div>


                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 mt-10'>
                        {
                            services.map(service => 
                                <div className='border border-primary/40 p-2 md:p-4 rounded-md space-y-1.5 md:space-y-2 flex flex-col h-full shadow-md bg-base-200' key={service._id}>
                                    {/* Image */}
                                    <div className=' h-[180px] md:h-[200px] overflow-hidden'>
                                        <img className='w-full h-full object-cover rounded-md' src={service?.images[0].url} alt={service?.images[0].alt} />
                                    </div>
                                    <h1 className='font-semibold'>{service?.service_name}</h1>
                                    {/* Button and currency */}
                                    <div className='md:flex items-center justify-between md:mt-auto text-sm md:text-[16px]'>
                                        <div>
                                            <p className='capitalize text-sm text-gray-500'>{service.service_category}</p>
                                            <p className='text-primary font-semibold'>{service?.cost} {service.currency}</p>
                                        </div>
                                        {/* GO Details page */}
                                        <div>
                                            <Link to={`/service-details/${service._id}`}>
                                                <TransparentBtn className='w-full mt-1 md:mt-0'>See Details</TransparentBtn>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Services;