import React from 'react';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import ServiceLoading from './serviceLoading';

const ServiceGrid = () => {

    const axiosInstance = useAxiosInstance();
    const {order, searchText} = useAuth()

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services", order, searchText],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/services?sort=cost&order=${order}&searchText=${searchText}`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <ServiceLoading />;
  }

    return (
        <>
            {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <div
                className="group bg-base-200 border border-base-300 p-4 rounded-2xl flex flex-col h-full shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                key={service._id}
              >
                {/* Image Container */}
                <div className="h-[200px] overflow-hidden rounded-xl relative">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={service?.images[0].url}
                    alt={service?.images[0].alt}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-widest rounded-lg border border-white/20">
                      {service.service_category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-base-content leading-tight group-hover:text-primary transition-colors">
                    {service?.service_name}
                  </h2>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-base-300/50">
                    <div>
                      <p className="text-xs opacity-50 uppercase font-bold tracking-tighter">
                        {service.unit}
                      </p>
                      <p className="text-primary font-black text-xl">
                        {service?.cost}{" "}
                        <span className="text-xs font-normal opacity-80">
                          {service.currency}
                        </span>
                      </p>
                    </div>

                    <Link to={`/service-details/${service._id}`}>
                      <button className="btn btn-primary btn-sm md:btn-md rounded-xl text-white px-5">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Data State */}
          {services.length === 0 && (
            <div className="text-center py-20 bg-base-200 rounded-3xl mt-10 border border-dashed border-base-300">
              <p className="text-base-content/50 font-medium">
                No services found matching your search.
              </p>
            </div>
          )}
        </>
    );
};

export default ServiceGrid;