import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import ScreenLoading from '../../Components/Animation/ScreenLoading/ScreenLoading';
import MySection from '../../Layouts/MySection';
import MyContainer from '../../Layouts/MyContainer';
import { Calendar, User, Mail, DollarSign, List, MapPin } from 'lucide-react';

const BookService = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();

  const { data: service = {}, isLoading: serviceLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/services/${id}`);
      return res.data;
    }
  });

  const { data: serviceCenters = [], isLoading: centersLoading } = useQuery({
    queryKey: ['coverages'],
    queryFn: async () => {
      const res = await axiosInstance.get('/coverages');
      return res.data;
    }
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const selectedRegion = useWatch({ control, name: 'booking_region' });
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  if (serviceLoading || centersLoading) return <ScreenLoading />;

  const handleBookNow = (data) => {
    const bookingInfo = {
      client_name: user.name || user.displayName,
      client_email: user.email,
      client_number: data.client_number || 'N/A',
      serviceId: service._id,
      service_name: service.service_name,
      service_category: service.service_category, // Fixed: should use service object
      booking_cost: service.cost,
      booking_region: data.booking_region || 'N/A',
      booking_district: data.booking_district || 'N/A',
      client_message: data.client_message || 'N/A',
      booking_date: data.booking_date,
    };

    axiosSecure
      .post('/bookings', bookingInfo)
      .then((res) => {
        navigate('/dashboard/my-bookings');
      })
      .catch(err => console.log(err));
  };

  // Helper component for Input Icons to reduce repetition
  const IconWrapper = ({ children }) => (
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
      {children}
    </div>
  );

  return (
    <MySection className="bg-base-100 min-h-screen">
      <MyContainer>
        <div className="w-full max-w-3xl mx-auto bg-base-200 shadow-2xl rounded-2xl p-6 md:p-10 border border-base-300 transition-colors duration-300">
          <h1 className="text-3xl font-black text-center text-base-content mb-8">
            Book Your <span className="text-primary">Service</span>
          </h1>

          <form onSubmit={handleSubmit(handleBookNow)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Service Name (Read Only) */}
            <div className="form-control relative md:col-span-2">
              <label className="label font-bold text-xs uppercase opacity-60">Service Title</label>
              <IconWrapper><List size={18}/></IconWrapper>
              <input
                value={service.service_name}
                readOnly
                className="input input-bordered bg-base-300 pl-10 w-full focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Name & Email (Read Only) */}
            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase opacity-60">Your Name</label>
              <IconWrapper><User size={18}/></IconWrapper>
              <input
                value={user.displayName || user.name}
                readOnly
                className="input input-bordered bg-base-300 pl-10 w-full cursor-not-allowed"
              />
            </div>

            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase opacity-60">Email Address</label>
              <IconWrapper><Mail size={18}/></IconWrapper>
              <input
                value={user.email}
                readOnly
                className="input input-bordered bg-base-300 pl-10 w-full cursor-not-allowed"
              />
            </div>

            {/* Cost & Booking Date */}
            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase opacity-60">Service Cost</label>
              <IconWrapper><DollarSign size={18}/></IconWrapper>
              <input
                value={`$${service.cost}`}
                readOnly
                className="input input-bordered bg-base-300 pl-10 w-full font-bold text-primary"
              />
            </div>

            <div className="form-control relative">
              <label className="label font-bold text-xs uppercase opacity-60 text-primary">Schedule Date</label>
              <IconWrapper><Calendar size={18}/></IconWrapper>
              <input
                {...register('booking_date', { required: 'Please select a date.' })}
                type="date"
                className={`input input-bordered bg-base-100 pl-10 w-full focus:input-primary ${errors.booking_date ? 'input-error' : ''}`}
              />
              {errors.booking_date && (
                <p className="text-error text-xs mt-1 ml-1">{errors.booking_date.message}</p>
              )}
            </div>

            {/* Region Select */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Select Region</label>
              <select
                {...register('booking_region', { required: 'Region is required' })}
                defaultValue=""
                className="select select-bordered bg-base-100 focus:select-primary w-full"
              >
                <option value="" disabled>Select Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* District Select */}
            <div className="form-control">
              <label className="label font-bold text-xs uppercase opacity-60">Select District</label>
              <select
                {...register('booking_district', { required: 'District is required' })}
                defaultValue=""
                disabled={!selectedRegion}
                className="select select-bordered bg-base-100 focus:select-primary w-full disabled:bg-base-300"
              >
                <option value="" disabled>Select District</option>
                {selectedRegion &&
                  districtsByRegion(selectedRegion).map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))
                }
              </select>
            </div>

            {/* Optional Message */}
            <div className="form-control md:col-span-2">
              <label className="label font-bold text-xs uppercase opacity-60">Instructions (Optional)</label>
              <textarea
                {...register('client_message')}
                className="textarea textarea-bordered bg-base-100 focus:textarea-primary w-full h-24"
                placeholder="Share any specific design preferences..."
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary w-full text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Confirm Booking Now
              </button>
            </div>
          </form>
        </div>
      </MyContainer>
    </MySection>
  );
};

export default BookService;