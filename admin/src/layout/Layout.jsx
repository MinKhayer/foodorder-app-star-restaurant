import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaTachometerAlt, FaStickyNote, FaRegChartBar, FaRegCalendarAlt, FaChevronRight, FaProductHunt, FaCartPlus, FaUser } from "react-icons/fa"


const MainLayout = () => {
    return (
        <div className='flex items-start gap-16'>
            <div className='w-1/5 bg-black h-screen flex flex-col text-white items-center text-2xl font-bold'>
                <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                    <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Admin panel</h1>
                </div>
                <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                    <FaTachometerAlt color='white' />
                    <p className='text-[14px] leading-[20px] font-bold text-white hover:text-blue-500'> <Link to='/dashboard'>Dashboard</Link></p>
                </div>
                <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                    <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> INTERFACE</p>
                    <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                        <div className='flex items-center gap-[10px]'>
                            <FaProductHunt color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white hover:text-blue-500'><Link to='/foods'>FoodItems</Link></p>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                    <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                        <div className='flex items-center gap-[10px]'>
                            <FaCartPlus color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white hover:text-blue-500'><Link to='/orders'>Orders</Link></p>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                    <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                        <div className='flex items-center gap-[10px]'>
                            <FaUser color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white hover:text-blue-500'><Link to='/users'>Users</Link></p>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                </div>
                <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                    <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> ADDONS</p>
                    <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                        <div className='flex items-center gap-[10px]'>
                            <FaStickyNote color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white hover:text-blue-500'>Pages</p>
                        </div>

                    </div>
                    <div className='flex items-center gap-[10px] py-[15px]  cursor-pointer'>
                        <FaRegChartBar color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white  hover:text-blue-500'>Charts</p>
                    </div>
                    <div className='flex items-center gap-[10px] py-[15px] cursor-pointer'>
                        <FaRegCalendarAlt color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white  hover:text-blue-500'>Tables</p>
                    </div>
                </div>
            </div>
            <div className='w-4/5'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
