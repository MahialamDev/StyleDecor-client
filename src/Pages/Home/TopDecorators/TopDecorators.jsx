import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { Star, Mail, ArrowUpRight, Trophy } from 'lucide-react';

const TopDecorators = () => {
  const axiosInstance = useAxiosInstance();
  const { data: topDecorators = [] } = useQuery({
    queryKey: ['topDecorators'],
    queryFn: async () => {
      const res = await axiosInstance.get('/top-decorators');
      return res.data;
    },
  });

  const dummyData = [
    { message: "Creative and punctual decorator!", rating: 4.8, projects: 120 },
    { message: "Transforms spaces beautifully!", rating: 4.6, projects: 85 },
    { message: "Highly professional and reliable.", rating: 4.9, projects: 150 },
  ];

  const top3 = topDecorators.slice(0, 3);

  return (
    <MySection className="bg-transparent">
      <MyContainer>
        {/* Header Updated to match Unified Design System */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b-2 border-base-300 pb-8">
          <div className="text-left">
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-2">
              <Trophy size={14} /> Expert Team
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-base-content uppercase italic tracking-tighter">
              Our Top <span className="text-primary">Decorators</span>
            </h2>
          </div>
          <p className="text-base-content/60 max-w-md text-sm font-medium md:text-right leading-relaxed">
            Work with our most-rated professionals who have transformed hundreds 
            of homes into dream spaces with verified excellence.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {top3.map((decorator, index) => {
            const info = dummyData[index] || dummyData[0];
            
            return (
              <div
                key={decorator._id}
                className="group relative bg-base-100 border-2 border-base-300 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
              >
                {/* Decorative Element */}
                <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                  <ArrowUpRight size={28} />
                </div>

                <div className="flex items-center gap-5 mb-8">
                  {/* Avatar Section */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary text-3xl font-black shadow-inner overflow-hidden">
                       {decorator.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-content text-[10px] font-black px-2 py-1 rounded-lg shadow-lg uppercase tracking-tighter">
                      Elite
                    </div>
                  </div>

                  {/* Identity */}
                  <div>
                    <h3 className="text-2xl font-black text-base-content group-hover:text-primary transition-colors leading-none mb-2">
                      {decorator.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-primary">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-black">{info.rating}</span>
                      </div>
                      <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest border-l border-base-300 pl-2">
                        {info.projects} Projects
                      </span>
                    </div>
                  </div>
                </div>

                {/* Testimonial/Info Box */}
                <div className="bg-base-200/50 rounded-2xl p-5 mb-8 border border-base-300 transition-colors group-hover:bg-base-200">
                  <p className="text-base-content/70 text-sm italic leading-relaxed font-medium">
                    "{info.message}"
                  </p>
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-6 border-t-2 border-base-300">
                  <div className="flex items-center gap-2 text-base-content/40 hover:text-primary transition-colors cursor-pointer">
                    <Mail size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-tight truncate max-w-[120px]">
                      {decorator.email}
                    </span>
                  </div>
                  <button className="btn btn-primary btn-sm rounded-xl font-black uppercase text-[10px] px-6 tracking-widest shadow-md">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </MyContainer>
    </MySection>
  );
};

export default TopDecorators;