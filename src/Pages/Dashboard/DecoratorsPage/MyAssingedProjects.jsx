import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyAssingedProject = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [schedule, setSchedule] = useState("")
  
  const { data: myAssignProjects = [], refetch } = useQuery({
    queryKey: ["myassignedProject", schedule],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-assigned-projects?email=${user.email}&schedule=${schedule}`
      );
      return res.data;
    },
  });
    
    
    // reusable function
    
    const handleUpdateServiceStatus = (id, serviceStatus) => {
        console.log('in the hadi', id, serviceStatus)
        axiosSecure.patch(`/update-service-status?id=${id}&email=${user.email}`, serviceStatus)
            .then(res => {
                refetch();
            console.log(res)
        })
    }


    // accecpt
    const handleAccept = (id) => {
        const serviceStatus = {
            service_status: 'planning_phase'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }

    // handleMaterialsPrepared
    const handleMaterialsPrepared = (id) => {
        const serviceStatus = {
            service_status: 'materials_prepared'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }

    // handleMaterialsPrepared
    const handleOntheWaytoVenue = (id) => {
        const serviceStatus = {
            service_status: 'on_the_way_to_venue'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }
    // handleMaterialsPrepared
    const handleSetupinProgress = (id) => {
        const serviceStatus = {
            service_status: 'setup_in_progress'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }
    // handleMaterialsPrepared
  const handleCompleted = (id) => {
      const serviceStatus = {
            service_status: 'completed'
        };
    Swal.fire({
  title: "Your Project is Completed?",
  text: "Make sure project is completed or not!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Completed!"
}).then((result) => {
  if (result.isConfirmed) {
    handleUpdateServiceStatus(id, serviceStatus)
    Swal.fire({
      title: "Completed",
      text: "Your project has been completed.",
      icon: "success"
    });
  }
});
      
      
       
  }
  

  // todayds shedule

  const handleTodaysShedule = () => {
    setSchedule("todaysShedule");
  }

  console.log(schedule)



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
  <h2 className="text-3xl font-bold mb-8 text-gray-800">
    My Assigned Projects
    <span className="ml-2 text-indigo-600">({myAssignProjects.length})</span>
      </h2>
      
      <div className="w-full py-5 space-x-3">
        <button onClick={()=> setSchedule("")} className={`btn border-primary ${schedule === 'todaysShedule' ? '' : 'btn-primary'}`}>All Projects</button>
        <button onClick={handleTodaysShedule} className={`btn border-primary ${schedule === '' ? '' : 'btn-primary'}`}>Todays Shedule</button>
      </div>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {myAssignProjects.map((item, i) => (
      <div
        key={item._id}
        className="bg-white rounded-2xl shadow hover:shadow-lg transition border  border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center bg-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.service_name}
            </h3>
            <p className="text-xs text-gray-500">Project #{i + 1}</p>
          </div>
          <span
            className={`inline-flex px-3 py-1 text-xs rounded-full font-medium capitalize ${
              item.service_status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-indigo-100 text-indigo-700"
            }`}
          >
            {item.service_status?.replaceAll("_", " ")}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Payment Status</p>
            <span
              className={`inline-flex px-2 py-[2px] rounded-full text-xs ${
                item.payment_status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {item.payment_status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 mt-3">

            {item?.service_status !== 'completed' && 
              <>
              <button
              onClick={() => handleAccept(item._id)}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border hover:bg-gray-100"
            >
              Accept
            </button>

            <button
              onClick={() => handleMaterialsPrepared(item._id)}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border hover:bg-gray-100"
            >
              Materials Prepared
            </button>

            <button
              onClick={() => handleOntheWaytoVenue(item._id)}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border hover:bg-gray-100"
            >
              On the Way
            </button>

            <button
              onClick={() => handleSetupinProgress(item._id)}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border hover:bg-gray-100"
            >
              Setup in Progress
            </button>

            
            </>
            }

            
            {item.service_status === 'completed' ?
              
              <button
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border text-green-600 hover:bg-green-50"
            >
              Completed
              </button> :
              
              <button
              onClick={() => handleCompleted(item._id)}
              className="flex-1 px-3 py-2 text-xs font-medium rounded-lg border text-green-600 hover:bg-green-50"
            >
              Completed
            </button>

            }
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



  );
};

export default MyAssingedProject;
