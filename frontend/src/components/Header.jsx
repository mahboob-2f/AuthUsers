import React from 'react';
import { assests } from '../assets/assests.js';

const Header = () => {
    return (
        <div className='w-full   flex flex-col justify-center items-center pt-4'>
            <div className='w-40'>
                <img src={assests.bot} alt="bot image" loading='lazy' />
            </div>
            <div className='flex justify-center items-center '>
                <h1 className='text-[26px] font-medium'>Hey Developer </h1>
                <img src={assests.hey} alt="hey image" loading='lazy' className='w-20' />
            </div>
            <div className='flex flex-col space-y-2 justify-center items-center '>
                <h1 className='text-4xl font-bold py-2'>
                    Welcome to Our App
                </h1>
                <p className='flex text-center '>Let start with a quick product and we will have you up and running in no time!</p>
            </div>
            <div className='flex  justify-center items-center space-x-1 border
                rounded-full bg-gray-200 hover:bg-gray-300  transition-all group
                duration-200 mt-4'>
                <button className='group-hover:cursor-pointer  px-4 py-2'>Get Started</button>
            </div>
        </div>
    );
};

export default Header;