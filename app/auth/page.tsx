
import React from 'react';
import { FaFacebookF, FaGooglePlusG, FaApple } from 'react-icons/fa';

const Login = () => (
  <div className="p-5 text-center bg-[#6d5280] bg-auth h-screen py-20">
    <h1 className="mb-4 text-white text-4xl font-semibold">inTalents</h1>

    <div className="mb-10">
      <p className="text-white mb-20 mx-10">Be part of the top global entertainment network</p>
    </div>
    <div className="flex flex-col justify-between">
      <span className="text-white text-sm mb-4">Start making connections</span>
      <a href="/api/auth/login" className=" text-white bg-[#e95f24] block rounded-xl py-2">
        Log in
      </a>
      <div className="pt-20">
        <p className="text-white">Or Sign in with</p>
        <ul className="flex justify-center mb-20 mt-4">
          <li className="mx-2 border border-white bg-white rounded-full p-3">
            <a className="text-2xl text-blue-600" href="/api/auth/login">
              <FaFacebookF />
            </a>
          </li>
          <li className="mx-2 border border-white bg-white rounded-full p-3">
            <a className="text-2xl text-red-500" href="/api/auth/login">
              <FaGooglePlusG />
            </a>
          </li>
          <li className="mx-2 border border-white bg-white rounded-full p-3">
            <a className="text-2xl text-black" href="/api/auth/login">
              <FaApple />
            </a>
          </li>
        </ul>
        <p className="text-white mb-2">Need an account?</p>
        <a href="/api/auth/login" className="text-white bg-transparent block rounded-xl py-2 border border-gray-300">
          Sign Up
        </a>
      </div>
    </div>
  </div>
);

export default Login;
