import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { User, Mail, Phone, MapPin, Hash } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../Hooks/useAxiosInstance";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const DecoratorApplications = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxiosInstance();

  const onSubmit = (data) => {
    axiosSecure
      .post("/decorators", data)
      .then((res) => {
        if (res.data.insertedId) {
          reset();
          Swal.fire({
            title: "Success",
            text: "Your Application has been successfully submitted!",
            icon: "success",
            background: 'var(--fallback-b1,oklch(var(--b1)))', // SweetAlert dark support
            color: 'var(--fallback-bc,oklch(var(--bc)))'
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const { data: serviceCenters = [], isLoading } = useQuery({
    queryKey: ["coverages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coverages");
      return res.data;
    },
  });

  const selectedRegion = useWatch({ control, name: "region" });
  const regions = [...new Set(serviceCenters.map((c) => c.region))];

  const districtsByRegion = (region) => {
    return serviceCenters
      .filter((c) => c.region === region)
      .map((c) => c.district);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 bg-base-100 transition-colors duration-300">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-base-content">
          Decorator <span className="text-primary">Application</span>
        </h1>
        <span className="block h-1 mx-auto w-12 bg-secondary mt-2 rounded-full"></span>
        <p className="mt-4 text-base-content/60 italic">Join our team and showcase your creativity to the world.</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 shadow-2xl rounded-2xl p-6 md:p-10 space-y-6 border border-base-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Full Name</label>
            <div className="flex items-center gap-3 bg-base-100 border border-base-300 rounded-xl px-4 py-1 focus-within:border-primary transition-all">
              <User className="text-primary w-5 h-5" />
              <input
                defaultValue={user?.displayName}
                readOnly
                type="text"
                {...register("name")}
                className="w-full bg-transparent outline-none py-3 text-base-content opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Email Address</label>
            <div className="flex items-center gap-3 bg-base-100 border border-base-300 rounded-xl px-4 py-1 focus-within:border-primary transition-all">
              <Mail className="text-primary w-5 h-5" />
              <input
                defaultValue={user?.email}
                readOnly
                type="email"
                {...register("email")}
                className="w-full bg-transparent outline-none py-3 text-base-content opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Phone Number</label>
            <div className="flex items-center gap-3 bg-base-100 border border-base-300 rounded-xl px-4 py-1 focus-within:border-primary transition-all">
              <Phone className="text-primary w-5 h-5" />
              <input
                type="tel"
                placeholder="017XX-XXXXXX"
                {...register("phone")}
                className="w-full bg-transparent outline-none py-3 text-base-content"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Your Age</label>
            <div className="flex items-center gap-3 bg-base-100 border border-base-300 rounded-xl px-4 py-1 focus-within:border-primary transition-all">
              <Hash className="text-primary w-5 h-5" />
              <input
                type="number"
                placeholder="Enter age"
                {...register("age")}
                className="w-full bg-transparent outline-none py-3 text-base-content"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Region */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Work Region</label>
            <select
              defaultValue=""
              className="select select-bordered bg-base-100 w-full focus:select-primary rounded-xl h-[52px]"
              {...register("region")}
              required
            >
              <option value="" disabled>Select Region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="form-control">
            <label className="label opacity-60 font-bold text-xs uppercase">Work District</label>
            <select
              defaultValue=""
              disabled={!selectedRegion}
              className="select select-bordered bg-base-100 w-full focus:select-primary rounded-xl h-[52px] disabled:bg-base-300"
              {...register("district")}
              required
            >
              <option value="" disabled>Select District</option>
              {selectedRegion &&
                districtsByRegion(selectedRegion).map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default DecoratorApplications;