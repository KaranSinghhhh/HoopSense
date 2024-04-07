import React from 'react'

import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';


function Support() {
  return (
    <div id='support-section' className='w-full h-screen mt-24' >
        <div className='w-full h-[700px] bg-gray-900/90 absolute'>
        </div>
        
        <div className='max-w-[1240px] mx-auto text-white relative'>
            <div className='px-4 py-32'>
                <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>Support</h2>
                <h3 className='text-5xl font-bold py-6 text-center '>Unlock Basketball Insights Like Never Before</h3>
                <p className='py-4 text-3xl text-slate-300'>Whether you're a fan, analyst, or athlete, HoopSense provides the insights and data you need to explore the depths of basketball analytics.</p>
            </div>
        

            <div className='grid grid-cols-1 lg:grid-cols3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black '>
                <div className='bg-white rounded-xl shadow-2-xl'>
                    <div className='p-8'>
                        <EnvelopeIcon className='w-16 p-4 bg-indigo-600 text-white rounded-lg mt-[-4rem] ' />
                        <h3 className='font-bold text-2xl my-6'>Contact</h3>
                        <p className='text-gray-600 text-xl'>For inquiries, support, or feedback, reach out to our team. We're here to help you navigate the stats and enhance your basketball knowledge.</p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <p className='flex items-center text-indigo-600'>Get In Touch <ArrowRightIcon className='w-5 ml-2'/><a className='ml-2'>karandeepsingh8860@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Support