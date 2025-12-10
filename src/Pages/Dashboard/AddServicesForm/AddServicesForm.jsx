import { useForm } from "react-hook-form";
import { FilePlus } from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const categories = [
  "outdoor",
  "home",
  "meeting",
  "seminar",
  "office",
  "wedding",
];

const AddServiceForm = () => {

    const {user} = useAuth()
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const submitHandler = (formData) => {
      // Prepare final data with images
      
    const finalData = {
      ...formData,
      images: [{ url: formData.imageUrl, alt: formData.imageAlt }]
      };

      finalData.createdAt = new Date();
      finalData.createdByEmail = user.email;
      
      console.log(finalData)

    // Call parent callback
  

    // Send to server
    axiosSecure.post('/services', finalData)
      .then(res => {
        console.log('Service added:', res.data);
        reset(); // clear form
      })
      .catch(err => console.error('Error adding service:', err));

   
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <input
          {...register("service_name", { required: true })}
          type="text"
          placeholder="Service Name"
          className="input w-full"
        />

        <div className="flex gap-2">
          <input
            {...register("cost", { required: true })}
            type="number"
            placeholder="Cost"
            className="input flex-1"
          />
          <input
            {...register("currency", { required: true })}
            type="text"
            placeholder="Currency"
            defaultValue="BDT"
            className="input w-24"
          />
        </div>

        <input
          {...register("unit", { required: true })}
          type="text"
          placeholder="Unit (e.g., per meter)"
          className="input w-full"
        />

        <select
          {...register("service_category", { required: true })}
          className="select w-full"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          {...register("description", { required: true })}
          placeholder="Description"
          className="textarea w-full"
        />

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <FilePlus className="text-primary" />
            <span>Image URL</span>
          </label>
          <input
            {...register("imageUrl", { required: true })}
            type="text"
            placeholder="Image URL"
            className="input w-full"
          />
          <input
            {...register("imageAlt", { required: true })}
            type="text"
            placeholder="Image Alt Text"
            className="input w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
