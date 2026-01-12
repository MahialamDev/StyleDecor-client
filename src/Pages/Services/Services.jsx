import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { useParams, Link } from 'react-router';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import TransparentBtn from '../../Components/UI/TransparentBtn/TransparentBtn';
import { Search, Filter } from 'lucide-react';

const Services = () => {
    const [order, setOrder] = useState("")
    const [searchText, setSearchText] = useState("")
    const axiosInstance = useAxiosInstance();
    
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['services', order, searchText],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services?sort=cost&order=${order}&searchText=${searchText}`);
            return res.data;
        }
    })

    if (isLoading) {
        return <ScreenLoading />
    }

    return (
        <MySection className="bg-base-100 text-base-content transition-colors duration-300">
            <MyContainer>
                <div className='-mt-5'>
                   <div className="text-center mb-12">
    {/* Small accent label matching the rest of the site */}
    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
        Premium Solutions
    </div>
    
    {/* Main Title: font-black, uppercase, italic, tracking-tighter */}
    <h1 className='text-4xl md:text-5xl font-black text-base-content uppercase italic tracking-tighter'>
        Our <span className="text-primary">Services</span>
    </h1>
    
    {/* Industrial Underline */}
    <span className='block h-1.5 mx-auto w-20 bg-primary mt-4 rounded-full'></span>
</div>

                    {/* Search & Sort Wrapper */}
                    <div className="mt-10 p-6 bg-base-200 border border-base-300 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-5">
                        
                        {/* Sort Dropdown */}
                        <div className="relative w-full md:w-64 group">
                            <select
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                className="select select-bordered w-full bg-base-100 focus:select-primary transition-all pl-10"
                            >
                                <option value="">Sort By Price</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search for your style..."
                                className="input input-bordered w-full bg-base-100 focus:input-primary transition-all pl-12"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12'>
                        {
                            services.map(service => 
                                <div 
                                    className='group bg-base-200 border border-base-300 p-4 rounded-2xl flex flex-col h-full shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300' 
                                    key={service._id}
                                >
                                    {/* Image Container */}
                                    <div className='h-[200px] overflow-hidden rounded-xl relative'>
                                        <img 
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                                            src={service?.images[0].url} 
                                            alt={service?.images[0].alt} 
                                        />
                                        <div className='absolute top-3 right-3'>
                                            <span className='px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-lg border border-white/20'>
                                                {service.service_category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className='mt-4 flex flex-col flex-grow'>
                                        <h2 className='text-lg font-bold text-base-content leading-tight group-hover:text-primary transition-colors'>
                                            {service?.service_name}
                                        </h2>
                                        
                                        <div className='mt-auto pt-4 flex items-center justify-between border-t border-base-300/50'>
                                            <div>
                                                <p className='text-xs opacity-50 uppercase font-bold tracking-tighter'>{service.unit}</p>
                                                <p className='text-primary font-black text-xl'>
                                                    {service?.cost} <span className="text-xs font-normal opacity-80">{service.currency}</span>
                                                </p>
                                            </div>

                                            <Link to={`/service-details/${service._id}`}>
                                                <button className='btn btn-primary btn-sm md:btn-md rounded-xl text-white px-5'>
                                                    Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {/* No Data State */}
                    {services.length === 0 && (
                        <div className="text-center py-20 bg-base-200 rounded-3xl mt-10 border border-dashed border-base-300">
                            <p className="text-base-content/50 font-medium">No services found matching your search.</p>
                        </div>
                    )}
                </div>
            </MyContainer>
        </MySection>
    );
};

export default Services;