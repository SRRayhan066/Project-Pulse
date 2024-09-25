import React from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Progress, ConfigProvider } from 'antd';
import { Space, Table, Tag, Select } from 'antd';
import { Modal, Input, Form, Radio, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

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
                        <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer flex items-center justify-center' onClick={() => navigate('/tasks')}>
                            See Details
                        </div>
                        <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer flex items-center justify-center' onClick={() => showEditModal(record)} >
                            Edit
                        </div>
                        <div className='font-semibold bg-red-400 p-2 rounded-md text-white cursor-pointer flex items-center justify-center'>
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
            key: '2',
            project: 'Create Android Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '3',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '4',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '5',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '6',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '7',
            project: 'Create Web Application',
            'project-manager': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '8',
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
    const [editVisible,setEditVisible] = useState(false);
    const [addManagerVisible,setAddManagerVisisble] = useState(false);
    const [projectName,setProjectName] = useState('');
    const [status, setStatus] = useState('');
    const [user,setUser] = useState({ email: '', name: '', role: '' });
    const [userList,setUserList] = useState([]);

    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true); // Show the modal
    };

    const showAddManager = () =>{
        setAddManagerVisisble(true);
    }

    const showEditModal = (record) =>{
        setStatus(record.status);
        setProjectName(record.project);
        setEditVisible(true);
    }
    
    const handleCancel = () => {
        setVisible(false); // Close the modal
    };

    const handleAddManagerCancel = () => {
        setAddManagerVisisble(false); // Close the modal
    };

    const handleEditCancel = () =>{
        setEditVisible(false);
    };

    useEffect(()=>{
        const token = localStorage.getItem('pulse_token');
        console.log("The token is "+ token);
        if(token){
            try{
                const decoded = jwtDecode(token);
                const userInfo = {
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role,
                };
                console.log("User mail : "+userInfo.email);
                console.log("User name : "+userInfo.name);
                setUser(userInfo);

                axios.get('http://localhost:5000/profile/all', {
                    withCredentials: true,
                })
                .then(res => {
                    
                })
                .catch(err => console.log(err));
            }catch(err){
                console.log(err);
            }
        }


    },[]);

    const logOut = () =>{
        axios.delete('http://localhost:5000/auth/logout', {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            navigate('/');
        }).catch(err=>console.log(err));
    }

    const optionsArray = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    return (
        <div>
            <div className='flex space-x-5 py-2 items-center shadow-sm justify-end px-[5vw]'>
                <div>
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
                <div>
                    <h2>{user.name}</h2>
                </div>
                <div className='font-semibold bg-black p-2 rounded-md text-white cursor-pointer' onClick={logOut}>
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

            <Modal
                title="Edit Project"
                visible={editVisible}
                footer={null}
                onCancel={handleEditCancel}
            >
                <Form>
                    <Form.Item label='Project Name'>
                        <Input value={projectName} placeholder='Project Name'></Input>
                    </Form.Item>
                    <Form.Item label='Project Name'>
                        <Radio.Group value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <Radio.Button value='ongoing'>Ongoing</Radio.Button>
                            <Radio.Button value='complete'>Complete</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleEditCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 py-2 px-4 rounded-md text-black cursor-pointer' onClick={handleEditCancel}>
                                Edit
                            </div>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Add Project Manager"
                visible={addManagerVisible}
                footer={null}
                onCancel={handleAddManagerCancel}
            >
                <Form>
                    <Form.Item label='Managers'>
                        <Select options={optionsArray} mode="multiple">
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleAddManagerCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 py-2 px-4 rounded-md text-black cursor-pointer' onClick={handleAddManagerCancel}>
                                Add
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
                    <div className='font-semibold bg-emerald-400 p-2 rounded-md text-black cursor-pointer' onClick={showAddManager}>
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