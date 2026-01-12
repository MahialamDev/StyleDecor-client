import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import build1img from '../../../assets/box1.webp';
import build2img from '../../../assets/box2.webp';
import build3img from '../../../assets/box-3.webp';
import { BsArrowRight } from 'react-icons/bs';
import { Layers } from 'lucide-react';

const BuildBase = () => {
    const builds = [
        {
            image: build1img,
            title: 'Places to get lost',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est.'
        },
        {
            image: build2img,
            title: 'Perfect Design',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est.'
        },
        {
            image: build3img,
            title: 'Happy Clients',
            details: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est.'
        },
    ]

    return (
        <MySection className="bg-transparent">
            <MyContainer>
                {/* Header Updated to match Unified Design System */}
                <div className='w-full mb-16 text-center'>
                    <div className="flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-[0.3em] mb-3">
                        <Layers size={14} /> Step by Step
                    </div>
                    <h1 className='text-4xl md:text-5xl font-black text-base-content uppercase italic tracking-tighter'>
                        Build Your <span className='text-primary'>Base</span>
                    </h1>
                    <div className='mt-4 flex justify-center'>
                        <span className='h-1.5 w-20 bg-primary rounded-full'></span>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {builds.map((build, i) => (
                        <div 
                            className='group space-y-5 bg-base-100 border-2 border-base-300 p-5 rounded-[2.5rem] hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5' 
                            key={i}
                        > 
                            {/* Image Container */}
                            <div className='h-[280px] overflow-hidden rounded-[2rem] relative'>
                                <img 
                                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110' 
                                    src={build.image} 
                                    alt={build.title} 
                                />
                                <div className='absolute top-4 left-4 bg-primary text-primary-content font-black italic px-4 py-1 rounded-full text-sm shadow-xl'>
                                    Phase 0{i + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className='px-2 pb-2'>
                                <h2 className='font-black text-2xl text-base-content group-hover:text-primary transition-colors uppercase tracking-tight mb-3'>
                                    {build.title}
                                </h2>
                                <p className='text-base-content/60 text-sm font-medium leading-relaxed mb-6'>
                                    {build?.details}
                                </p>
                                
                                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary cursor-pointer border-b-2 border-transparent hover:border-primary pb-1 transition-all">
                                    Learn More
                                    <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </MyContainer>
        </MySection>
    );
};

export default BuildBase;