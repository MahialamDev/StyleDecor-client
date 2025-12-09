import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import AuthContext from '../../../Context/AuthContext';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const { user, loading, loginWithEmailPass } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleLoginWithEmail = (data) => {
        console.log(data)
        loginWithEmailPass(data.email, data.password)
            .then(() => {
            navigate(location?.state?.from?.pathname || "/", { replace: true });
            })
            .catch(err => {
            toast.error(err.message)
        })
    }

    const {register, handleSubmit, formState: {errors}} = useForm()


    useEffect(() => {
        if (user) {
            navigate(location?.state?.from?.pathname || "/", { replace: true });
        }
    }, [user]);

    return (
        <div className='mb-5 pb-5 md:pb-0 md:m-0' >
            <div className='space-y-2 text-center'>
                <h1 className='text-2xl md:text-4xl font-semibold'>Welcome Back</h1>
                <p>Please Login</p>
                <Link to='/sign-up'>
                    Don't have an Account? <span className='text-primary underline font-semibold'>Sign Up</span>
                </Link>
            </div>
            
            <form onSubmit={handleSubmit(handleLoginWithEmail)} className='max-w-[400px] mt-10 space-y-5'>
                <label>Email</label>
                <input
                    {...register('email', {required: true})}
                    className='w-full py-2 px-4 border border-gray-400 focus:outline-primary rounded-sm' type="text" placeholder='your@email.com' />
                    {errors.email && <p className='text-red-400 text-sm -mt-4'>Please enter email.</p>}
                <label>Password</label>
                <input
                    {...register('password', {required: true})}
                    className='w-full p-2  border border-gray-400 focus:outline-primary rounded-sm' type="password" placeholder='********' />
                {errors.email && <p className='text-red-400 text-sm -mt-4'>Please enter password.</p>}
                <Link className='text-right text-primary underline inline-block w-full -mt-4 font-semibold'>Forget Password?</Link>
                <button type='submit' className='w-full transition duration-300 py-2 rounded-sm border-2 border-primary bg-primary hover:bg-transparent hover:text-primary cursor-pointer'>LogIn</button>
            </form>

            <div className='flex gap-3 items-center my-5'>
                <div className='flex-1 border-t border-gray-300'></div>
                <p>Or</p>
                <div className='flex-1 border-t border-gray-300'></div>
            </div>

            <SocialLogin />
        </div>
    );
};

export default Login;