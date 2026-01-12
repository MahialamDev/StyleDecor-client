import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useAxiosInstance from "../../../Hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import MySection from "../../../Layouts/MySection";
import MyContainer from "../../../Layouts/MyContainer";
import { useTheme } from "next-themes";
import { MapPin } from "lucide-react";

const Coverage = () => {
  const position = [23.685, 90.3563]; // Center of Bangladesh
  const axiosInstance = useAxiosInstance();
  const mapRef = useRef(null);
  const { theme } = useTheme();

  const { data: serviceCenters = [], isLoading } = useQuery({
    queryKey: ["coverages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/coverages");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coords = [district.latitude, district.longitude];
      mapRef.current.flyTo(coords, 12);
    }
  };

  const darkMapUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
  const lightMapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MySection className="py-20 bg-transparent transition-colors duration-300">
      <MyContainer>
        {/* Header Updated to match Unified Design System */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
            <MapPin size={14} /> Global Presence
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-base-content uppercase italic tracking-tighter">
            Our Service <span className="text-primary">Coverage</span>
          </h1>
          <p className="text-base-content/60 max-w-2xl mx-auto font-medium mt-4 px-4">
            Discover our presence across Bangladesh. Search for your district to find our nearest service hubs and expert decorators.
          </p>
        </div>

        {/* Search Bar - Premium Style */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-16 flex flex-col sm:flex-row items-center bg-base-100 rounded-[2rem] overflow-hidden border-2 border-base-300 p-2 shadow-sm focus-within:border-primary transition-all duration-300"
        >
          <div className="relative flex-1 w-full">
            <input
              type="text"
              name="location"
              placeholder="Search district (e.g. Dhaka, Jamalpur)"
              className="w-full py-4 pl-12 pr-4 bg-transparent text-base-content focus:outline-none placeholder:text-base-content/30 font-bold uppercase text-xs tracking-tight"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <CiSearch size={22} strokeWidth={1} />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded-[1.5rem] px-10 font-black uppercase tracking-widest text-xs w-full sm:w-auto shadow-lg shadow-primary/20"
          >
            Locate Hub
          </button>
        </form>

        {/* Map Section */}
        {!isLoading && serviceCenters.length > 0 && (
          <div className="relative z-0 border-2 border-base-300 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/40 p-2 bg-base-100">
            <div className="rounded-[2rem] overflow-hidden">
                <MapContainer
                  center={position}
                  zoom={7}
                  scrollWheelZoom={false}
                  ref={mapRef}
                  className="w-full h-[450px] sm:h-[650px]"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                    url={theme === "dark" ? darkMapUrl : lightMapUrl}
                  />
                  {serviceCenters.map((center) => (
                    <Marker key={center._id} position={[center.latitude, center.longitude]}>
                      <Popup>
                        <div className="p-2 min-w-[150px]">
                          <h2 className="font-black text-primary uppercase text-sm italic tracking-tighter">
                            {center.district} Hub
                          </h2>
                          <div className="h-[1px] w-full bg-base-300 my-2"></div>
                          <p className="text-xs font-bold opacity-60 uppercase leading-relaxed">
                            <span className="text-primary/70">Covers:</span><br />
                            {center.covered_area.join(", ")}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
            </div>
          </div>
        )}

        {/* Loading & Empty States */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <span className="loading loading-spinner loading-lg text-primary"></span>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">Decrypting Coordinates</p>
          </div>
        )}

        {!isLoading && serviceCenters.length === 0 && (
          <div className="text-center py-20 bg-base-100 rounded-[2.5rem] border-2 border-dashed border-base-300">
             <p className="text-base-content/40 text-xs font-black uppercase tracking-widest">
               No service centers detected in current sector.
             </p>
          </div>
        )}
      </MyContainer>
    </MySection>
  );
};

export default Coverage;