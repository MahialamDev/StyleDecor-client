import React from "react";

const ServiceLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Spinner */}
      <span className="loading loading-spinner loading-lg text-primary"></span>

      {/* Text */}
      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">
        Decrypting Coordinates
      </p>
    </div>
  );
};

export default ServiceLoading;
