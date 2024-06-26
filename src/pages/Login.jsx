import React, { useState }  from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Logo from "../assets/logo.png"
import { axiosClient } from '../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../utils/localStorageManager';
import { TEInput } from "tw-elements-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
      e.preventDefault();
      try{
        const response = await axiosClient.post('/api/auth/login', {
          email,
          password
        });
        setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
        navigate('/');
      }catch(error){
        console.log(error);
      }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-20 lg:mt-24 lg:py-0">
        <Link to="/">
            <div>
              <img className="object-cover w-32 mb-4" src={Logo} alt='logo' />
            </div>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  className="mb-6"
                  id='email'
                  required
                  onChange={(e) => setEmail(e.target.value)}
              ></TEInput>

              <TEInput
                type="password"
                label="Password"
                size="lg"
                id='password'
                required
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>

              <button
                type="submit"
                className="w-full inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Login
              </button>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-500 dark:text-gray-400">
                <div className='flex gap-1'>
                  <p>Don’t have an account yet? </p>
                  <Link to="/otp"><p className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</p></Link> 
                </div>
                <div>
                  <Link to="/forgot-password"><p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p></Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;