import React from 'react';
import { CgNotifications } from 'react-icons/cg';
import { IoNotificationsCircle } from 'react-icons/io5';
import useAuth from '../../../Hooks/useAuth';
import { Bell, CircleCheckBig, MoveUpRight } from 'lucide-react';


const MyProfile = () => {
    const { user } = useAuth()
    console.log(user)
    return (
        <section className="w-full p-4 h-full">
  {/* Heading */}
  <div className="flex flex-wrap gap-3 items-center justify-between pb-3 border-b border-gray-300">
    <h1 className="text-xl md:text-2xl font-semibold">Client Profile</h1>

    <div className="flex gap-4 items-center">
      <input
        className="input input-bordered h-10"
        type="search"
        placeholder="search items"
      />
      <Bell size={26} className="text-gray-700" />
                    <img
                         referrerPolicy='no-referrer'
        className="w-9 h-9 rounded-full object-cover"
        src={user.photoURL}
        alt=""
      />
    </div>
  </div>

  {/* Profile and Info */}
  <div className="flex flex-col md:flex-row md:gap-6 gap-8 py-8">
    {/* Left Card */}
    <div className="border border-gray-200 p-6 md:p-10 md:min-w-[400px] rounded-2xl space-y-4 flex flex-col items-center bg-base-200 shadow-md">
                    <img
                        referrerPolicy='no-referrer'
        className="w-24 h-24 rounded-full object-cover shadow border-2 border-secondary "
        src={user.photoURL}
        alt=""
      />

      <h1 className="text-xl font-semibold text-center">{user.displayName}</h1>

      <button className="w-full py-2.5 px-5 text-white rounded-xl bg-secondary border-2 border-secondary transition duration-300 hover:bg-transparent hover:text-secondary cursor-pointer">
        Add New Appointment
      </button>

      <span className="text-green-600 bg-green-400/10 text-sm p-2 px-5 rounded-md">
        New Client
      </span>

      <div className="bg-gray-100 px-5 py-3 border border-gray-200 flex flex-col rounded-2xl w-full space-y-1">
        <span className="text-gray-500 text-sm">Email</span>
        <span className="font-semibold break-all">{user.email}</span>
      </div>

      <div className="bg-gray-100 px-5 py-3 border border-gray-200 flex flex-col rounded-2xl w-full space-y-1">
        <span className="text-gray-500 text-sm">Gender</span>
        <span className="font-semibold">Male</span>
      </div>

      <div className="bg-gray-100 px-5 py-3 border border-gray-200 flex flex-col rounded-2xl w-full space-y-1">
        <span className="text-gray-500 text-sm">Verify Email</span>
        <span className="font-semibold text-green-500 flex gap-2 items-center">
          <CircleCheckBig size={18} /> Verified
        </span>
      </div>
    </div>

    {/* Right Cards */}
    <div className="w-full p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        
        <div className="bg-base-200 p-6 rounded-2xl shadow space-y-2">
          <h1 className="text-primary text-3xl font-semibold">5</h1>
          <p className="text-gray-500">All Bookings</p>
          <span className="text-gray-500 flex items-center gap-2">
            <MoveUpRight size={15} /> 36.67%
          </span>
        </div>

        <div className="bg-base-200 p-6 rounded-2xl shadow space-y-2">
          <h1 className="text-orange-500 text-3xl font-semibold">7</h1>
          <p className="text-gray-500">Completed</p>
          <span className="text-gray-500 flex items-center gap-2">
            <MoveUpRight size={15} /> 36.67%
          </span>
        </div>

        <div className="bg-base-200 p-6 rounded-2xl shadow space-y-2">
          <h1 className="text-secondary text-3xl font-semibold">2</h1>
          <p className="text-gray-500">Cancelled</p>
          <span className="text-gray-500 flex items-center gap-2">
            <MoveUpRight size={15} /> 36.67%
          </span>
        </div>
                    </div>
                    
                    <div className='bg-base-200 p-6 rounded-2xl shadow space-y-2 w-full mt-5'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi consequuntur error, nihil ducimus, assumenda quidem unde tenetur porro tempora illum numquam impedit ratione ab labore maiores, optio quaerat reiciendis. Iusto ipsum odio corrupti quaerat molestiae nostrum sequi quasi nesciunt! Voluptas necessitatibus eaque ex rerum eligendi odio quia tempore ut facilis voluptatum, magni odit accusantium in ad earum aliquid quod nobis pariatur nostrum, consequuntur nisi aut labore. Aliquid unde consectetur magni asperiores totam, dolorem accusantium doloribus placeat perspiciatis sapiente ea. Expedita earum autem reprehenderit veritatis error dolore laboriosam ipsa temporibus, ipsam voluptatibus impedit vero cupiditate cumque inventore est corrupti reiciendis itaque.
                    </div>
    </div>
  </div>
</section>

    );
};

export default MyProfile;