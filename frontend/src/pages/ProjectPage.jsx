import React from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Progress, ConfigProvider } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Modal, Input, Form, Radio, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {
    const columns1 = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            align: 'center',
            
        },
        {
            title: 'Project Manager',
            dataIndex: 'project-manager',
            key: 'project-manager',
            align: 'center',
            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text,record)=>{
                return(
                    <div className='flex space-x-1 justify-center items-stretch'>
                        <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer flex items-center justify-center' onClick={()=>navigate('/')}>
                            See Details
                        </div>
                        <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer flex items-center justify-center' onClick={()=>navigate('/')}>
                            Edit
                        </div>
                        <div className='font-semibold bg-red-400 p-2 rounded-md text-white cursor-pointer flex items-center justify-center' onClick={()=>navigate('/')}>
                            Delete
                        </div>
                    </div> 
                )
                
            }
        },
    ];

    const columns2 = [
        {
            title: 'Project Managers',
            dataIndex: 'project-manager',
            key: 'project-manager',
            align: 'center'
        }
    ];

    const dataSource = [
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Android Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '1',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
    ]

    const dataSource2 = [
        {
            'project-manager' : 'Md Shafikul Rahman'
        },
        {
            'project-manager' : 'Fahad Pathan'
        },
        {
            'project-manager' : 'Md Shafikul Rahman'
        },
        {
            'project-manager' : 'Fahad Pathan'
        },
        {
            'project-manager' : 'Md Shafikul Rahman'
        },
        {
            'project-manager' : 'Fahad Pathan'
        },
    ]

    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true); // Show the modal
    };
    
    const handleCancel = () => {
        setVisible(false); // Close the modal
    };

    return (
        <div>
            <div className='flex space-x-5 py-2 items-center shadow-sm justify-end px-[5vw]'>
                <div>
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
                <div className='font-semibold bg-black p-2 rounded-md text-white cursor-pointer' onClick={()=>navigate('/')}>
                    Sign-out
                </div>
            </div>

            <Modal
                title="Add Project"
                visible={visible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label='Project Name'>
                        <Input placeholder='Project Name'></Input>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={handleCancel}>
                                Create
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <div className='flex justify-center items-center my-5 '>     
                <div className='border-slate-300 border-2 p-2 rounded-md shadow-sm flex justify-center items-center
                                sm:space-x-5
                                xs:space-x-1'>
                    <Progress
                        percent={100}
                        strokeColor='#abb2b9'
                        type='circle'
                        success={{
                            percent: 0,
                        }}
                        format={() => <span className="text-md">137</span>}
                    />

                    <Progress
                        percent={60}   
                        type='circle'
                        format={() => <span className="text-md">Ongoing</span>}
                    />

                    <Progress
                        percent={30}   
                        type='circle'
                        success={{
                            percent: 30,
                        }}
                        format={() => <span className="text-md">Complete</span>}
                    />
                </div>    
            </div>

            <div className='px-[5vw] '>
                <div className='flex space-x-3 justify-end items-center
                                '>
                    <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={showModal}>
                        Add Project
                    </div>
                    <div className='font-semibold bg-emerald-400 p-2 rounded-md text-black cursor-pointer' onClick={()=>navigate('/')}>
                        Add Project Manager
                    </div>
                </div>
                <div className='my-2 
                                lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-y-0 lg:space-x-3
                                xs:flex xs:flex-col xs:items-center xs:space-y-5 '>
                    <div className='border-2
                                    xl:w-[70%]
                                    lg:w-[80%]
                                    xs:w-[100%]
                                    '>
                        <Table columns={columns1} dataSource={dataSource} pagination={{ pageSize: 4 }} scroll={{x:'40vw'}}>

                        </Table>
                    </div>
                    <div className='border-2
                                    xl:w-[30%]
                                    lg:w-[20%]
                                    xs:w-[100%]'>
                        <Table columns={columns2} dataSource={dataSource2} pagination={{ pageSize: 5 }} >

                        </Table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProjectPage;