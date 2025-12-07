import React from 'react';

const TransparentBtn = ({onClick, className, props, children}) => {
    return (
        <button
            onClick={onClick} // ✅ handle click
            className={` ${className} transition duration-300 py-1.5 md:py-2 px-2 md:px-4 text-md md:text-[16px] rounded-sm border-2 border-primary hover:bg-primary bg-transparent hover:text-base-200 cursor-pointer `}
            {...props} // ✅ allow other button props like type, disabled
        >
            {children}
        </button>
    );
};

export default TransparentBtn;