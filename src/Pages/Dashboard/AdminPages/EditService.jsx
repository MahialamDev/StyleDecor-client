import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Pencil, ArrowLeft } from "lucide-react";
import ScreenLoading from "../../../Components/Animation/ScreenLoading/ScreenLoading";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const categories = ["outdoor", "home", "meeting", "seminar", "office", "wedding"];
const units = ["per meter", "per-event", "per sqrt-ft", "per floor", "per unit"];

const EditService = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();

  // useQuery to load service data
  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  // Set initial form data when service is loaded
  useEffect(() => {
    if (service) {
      reset(service);
    }
  }, [service, reset]);

  // Live image preview
  const watchImage = watch("imageUrl");

  // Handle Update
  const onSubmit = async (updatedData) => {
    try {
      await axiosSecure.patch(`/services/${id}/edit`, updatedData)
        .then(res => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Updated!",
              text: "Your service has been updated.",
              icon: "success",
              background: 'var(--fallback-b1,oklch(var(--b1)))',
              color: 'var(--fallback-bc,oklch(var(--bc)))',
            });
            navigate('/dashboard/manage-services');
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <ScreenLoading />;

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen border border-gray-300/20 shadow-sm rounded-xl">

      {/* Back Button */}
      <Link
        to="/dashboard/manage-services"
        className="inline-flex items-center gap-2 text-primary mb-4 hover:underline font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Services
      </Link>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-5 flex items-center gap-2 text-base-content">
        <Pencil className="w-6 h-6 text-secondary" />
        Edit Service
      </h1>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-base-100 p-6 rounded-xl "
      >

        {/* Service Name */}
        <div>
          <label className="block font-medium mb-1 text-base-content/80">Service Name</label>
          <input
            {...register("service_name", { required: true })}
            type="text"
            className="input input-bordered w-full bg-base-200 border-base-300 text-base-content"
          />
        </div>

        {/* Cost + Currency + Unit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium mb-1 text-base-content/80">Cost</label>
            <input
              {...register("cost", { required: true })}
              type="number"
              className="input input-bordered w-full bg-base-200 border-base-300 text-base-content"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-base-content/80">Currency</label>
            <input
              {...register("currency", { required: true })}
              type="text"
              className="input input-bordered w-full bg-base-200 border-base-300 text-base-content"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-base-content/80">Unit</label>
            <select
              {...register("unit", { required: true })}
              className="select select-bordered w-full bg-base-200 border-base-300 text-base-content"
            >
              <option value="" disabled>Select Unit</option>
              {units.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-base-content/80">Service Category</label>
          <select
            {...register("service_category", { required: true })}
            className="select select-bordered w-full bg-base-200 border-base-300 text-base-content"
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-base-content/80">Description</label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="textarea textarea-bordered w-full bg-base-200 border-base-300 text-base-content"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium mb-1 text-base-content/80">Image URL</label>
          <input
            {...register("imageUrl", { required: true })}
            type="text"
            className="input input-bordered w-full bg-base-200 border-base-300 text-base-content"
          />
        </div>

        {/* Image Alt */}
        <div>
          <label className="block font-medium mb-1 text-base-content/80">Image Alt</label>
          <input
            {...register("imageAlt", { required: true })}
            type="text"
            className="input input-bordered w-full bg-base-200 border-base-300 text-base-content"
          />
        </div>

        {/* Image Preview */}
        <div className="pt-3">
          <p className="font-medium mb-2 text-base-content">Preview:</p>
          <img
            src={watchImage || (service && service.imageUrl)}
            alt={service && service.imageAlt}
            className="w-full rounded-lg border border-base-300 h-56 object-cover bg-base-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer w-full btn btn-primary text-white transition-all mt-4 font-bold uppercase tracking-wide"
        >
          Update Service
        </button>

      </form>
    </div>
  );
};

export default EditService;