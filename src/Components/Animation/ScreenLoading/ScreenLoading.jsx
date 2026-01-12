// import Lottie from 'lottie-react';
// import React from 'react';
// import loadingAnimation from './ScreenLoading.json';

// const ScreenLoading = () => {
//     return (
//         <div className='w-full h-screen flex items-center justify-center'>
//             {/* Animation Lottie */}
//             {/* <Lottie animationData={loadingAnimation}>

//             </Lottie> */}
//         </div>
//     );
// };

// export default ScreenLoading;

import React from 'react';

const ScreenLoading = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-base-100 transition-colors duration-500'>
            <div className="relative flex items-center justify-center">
                {/* Outer Industrial Spinning Ring */}
                <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                
                {/* Inner Pulsing Core */}
                <div className="absolute w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center animate-pulse">
                    <div className="w-6 h-6 bg-primary rounded-lg rotate-45"></div>
                </div>

                {/* Decorative Orbitals */}
                <div className="absolute w-32 h-32 border border-base-300 rounded-full opacity-20 animate-[ping_2s_linear_infinite]"></div>
            </div>

            {/* Premium Loading Text */}
            <div className="mt-12 text-center">
                <h2 className="text-xl font-black uppercase italic tracking-[0.4em] text-base-content animate-pulse">
                    Style<span className="text-primary">Decor</span>
                </h2>
                <div className="mt-3 flex items-center justify-center gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">System Initializing</span>
                    <span className="loading loading-dots loading-xs text-primary"></span>
                </div>
            </div>

            {/* Bottom Tech Bar */}
            <div className="absolute bottom-10 w-48 h-1 bg-base-300 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3 animate-[loading_1.5s_ease-in-out_infinite]"></div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(250%); }
                }
            `}</style>
        </div>
    );
};

export default ScreenLoading;