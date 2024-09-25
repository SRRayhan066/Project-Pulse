import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import introImage from '../assets/introImage.png';
import { Timeline, ConfigProvider } from 'antd';
import avatar from '../assets/avatar.png';

const IntroPage = () => {

    const navigate = useNavigate();

    const features = [
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Sign-Up and Login System</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Multi-type users such as Admin, Project Manager and Team Member</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>JWT authentication</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Project Management Such as Creation, Deletion and Edit.</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Task Management Such as Creation, Deletion and Edit.</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Task assigned feature.</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Task status observation.</h2>
                </>
            )
        },
        {
            children: (
                <>
                    <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Responsive web application.</h2>
                </>
            )
        },
    ]
    return (
        <div className='sm:space-y-8'>
            <div className='flex justify-around items-center py-5'>
                <div className=''>
                    <img className='h-[8vh]' src={logo} alt='logo'></img>
                </div>
                <div className='text-slate-500
                                sm:text-lg
                                xs:text-sm'>
                    <ul className='flex justify-center items-center'>
                        <li className='px-5 cursor-pointer'><a href='#home'>Home</a></li>
                        <li className='px-5 cursor-pointer'><a href='#features'>Features</a></li>
                        <li className='px-5 cursor-pointer'><a href='#teams'>Team Members</a></li>
                    </ul>
                </div>
                <div className='font-semibold bg-green-500 p-2 rounded-md text-white cursor-pointer
                                sm:block
                                xs:hidden' onClick={()=>navigate('/registration')}>
                    Create Account
                </div>
            </div>

            <div id='home' className='px-[10vw] flex items-center h-[70vh] 
                            lg:flex-row lg:justify-between lg:space-y-0 lg:py-0
                            xs:flex-col xs:justify-center xs:space-y-10'>
                <div className='space-y-5
                                lg:w-[50%]
                                xs:w-[100%]'>
                    <div className='font-serif font-bold
                                    sm:text-4xl
                                    xs:text-3xl'>
                        <h1>Project Pulse</h1>
                    </div>
                    <div className='text-slate-600'>
                        ProjectPulse is a streamlined platform for managing projects and tasks, ensuring teams stay organized and on track. With real-time updates and intuitive features, it keeps your workflow in sync and efficient.
                    </div>
                    <div className='flex space-x-3
                                    '>
                        <div className='font-semibold bg-green-500 p-2 rounded-md text-white cursor-pointer
                                        flex justify-center items-center
                                        lg:w-[20%]
                                        xs:w-[40%]' onClick={()=>navigate('/login')}>
                            Login
                        </div>
                        <div className='font-semibold bg-green-500 p-2 rounded-md text-white cursor-pointer
                                        flex justify-center items-center
                                        lg:w-[30%] sm:hidden
                                        xs:w-[50%]' onClick={()=>navigate('/registration')}>
                            Create Account
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-center items-center
                                lg:w-[40%]
                                xs:w-[100%]'>
                    <img src={introImage}></img>
                </div>
            </div>

            <div id='features' className='px-[10vw] space-y-10'>
                <div className='flex flex-col justify-center items-center space-y-5'>
                    <div className='font-serif font-bold
                                    sm:text-4xl
                                    xs:text-3xl'>
                        <h1>Features</h1>
                    </div>
                    <div className='text-center'>
                        <p className='text-slate-600'>
                            This application includes a wide range of features that streamline project and task management. It is designed to improve efficiency, organization, and collaboration within teams.
                        </p>
                    </div>
                </div>
                
                <div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#10B981',
                            },
                        }}
                    >
                        <Timeline
                            items={features}
                        />
                    </ConfigProvider>
                </div>
            </div>

            <div id='teams'>
                <div className='flex flex-col justify-center items-center space-y-5'>
                    <div className='font-serif font-bold
                                    sm:text-4xl
                                    xs:text-3xl'>
                        <h1>Team Members</h1>
                    </div>
                </div>
                <div className='grid auto-rows-fr gap-x-[5vw] gap-y-[5vh] my-10
                                xl:px-[15vw]
                                lg:grid-cols-3
                                md:px-[10vw] md:grid-cols-2
                                sm:px-[10vw] sm:grid-cols-2
                                xs:px-[10vw] xs:grid-cols-1'>
                    <div className='flex flex-col justify-center items-center rounded-xl shadow-2xl bg-green-100 px-2'>
                        <div className='h-[25vh] flex justify-center items-center'>
                            <img className='w-[100%] h-[100%] rounded-full' src={avatar} alt='avatar'></img>
                        </div>
                        <div className='text-center my-5 space-y-1'>
                            <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Team Member 1</h2>
                            <h3 className='text-slate-600 text-md font-semibold'>Frontend Designer</h3>
                            <p className='text-slate-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam laboriosam, obcaecati, nobis reiciendis sequi eos delectus iste saepe odio laudantium nihil. Placeat amet quo nesciunt deleniti illum eaque minima nulla,</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center rounded-xl shadow-2xl bg-green-100 px-2'>
                        <div className='h-[25vh] flex justify-center items-center'>
                            <img className='w-[100%] h-[100%] rounded-full' src={avatar} alt='avatar'></img>
                        </div>
                        <div className='text-center my-5 space-y-1'>
                            <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Team Member 2</h2>
                            <h3 className='text-slate-600 text-md font-semibold'>Frontend Designer</h3>
                            <p className='text-slate-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam laboriosam, obcaecati, nobis reiciendis sequi eos delectus iste saepe odio laudantium nihil. Placeat amet quo nesciunt deleniti illum eaque minima nulla,</p>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-center rounded-xl shadow-2xl bg-green-100 px-2'>
                        <div className='h-[25vh] flex justify-center items-center'>
                            <img className='w-[100%] h-[100%] rounded-full' src={avatar} alt='avatar'></img>
                        </div>
                        <div className='text-center my-5 space-y-1'>
                            <h2 className='font-serif font-semibold sm:text-lg xs:text-md'>Team Member 3</h2>
                            <h3 className='text-slate-600 text-md font-semibold'>Frontend Designer</h3>
                            <p className='text-slate-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam laboriosam, obcaecati, nobis reiciendis sequi eos delectus iste saepe odio laudantium nihil. Placeat amet quo nesciunt deleniti illum eaque minima nulla,</p>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
};

export default IntroPage;