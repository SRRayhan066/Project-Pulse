import React from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Progress, ConfigProvider, Alert } from 'antd';
import { Space, Table, Tag, Select } from 'antd';
import { Modal, Input, Form, Radio, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ProjectPage = () => {
    const [managerDataSource,setManagerDataSource] = useState([]);

    const [visible, setVisible] = useState(false);
    const [editVisible,setEditVisible] = useState(false);
    const [addManagerVisible,setAddManagerVisisble] = useState(false);
    const [projectName,setProjectName] = useState('');
    const [status, setStatus] = useState('');
    const [user,setUser] = useState({ email: '', name: '', role: '' });
    const [userList,setUserList] = useState([]);
    const [selectedManagers, setSelectedManagers] = useState([]);
    const [removedManager,setRemovedManager] = useState(false);
    const [projectList,setProjectList] = useState([]);

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
                console.log("User role : "+userInfo.role);
                setUser(userInfo);


                axios.get(`http://localhost:5000/profile/user`, {
                    withCredentials: true,
                })
                .then(res => {
                    const formatList = res.data;
                    
                    console.log(res.data);
                    const formattedUserList = formatList.map(user => ({
                        label: user.name,  // Name as the label
                        value: user.email   // Email as the value (or use a unique ID if available)
                    }));
                    setUserList(formattedUserList);
                })
                .catch(err => console.log(err));


                axios.get(`http://localhost:5000/profile/manager`, {
                    withCredentials: true,
                })
                .then(res => {
                    const formatList = res.data;
                    
                    console.log(res.data);
                    const formattedUserList = formatList.map(user => ({
                        'project-manager': user.name,  // Name as the label
                         value: user.email  // Email as the value (or use a unique ID if available)
                    }));
                    setManagerDataSource(formattedUserList);
                    
                })
                .catch(err => console.log(err));

                axios.get(`http://localhost:5000/projects/all`, {
                    withCredentials: true,
                })
                .then(res => {
                    console.log(res.data);  
                    const formatList = res.data;
                    const formattedProjectList = formatList.map(pr => ({
                         project: pr.projectName,  // Name as the label
                         value: pr.projectName,  // Email as the value (or use a unique ID if available)
                         'project-manager': pr.projectManagerEmail,
                         status:pr.projectStatus
                    }));
                    console.log(formattedProjectList);
                    setProjectList(formattedProjectList);
                })
                .catch(err => console.log(err));
                
            }catch(err){
                console.log(err);
            }
        }


    },[]);
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
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            className: user.role === 'admin' ? '' : 'hidden',
            render: (text,record)=>{
                if (user.role === 'admin') {
                    return (
                        <div className='flex space-x-1 justify-center items-stretch'>
                            <div className='font-semibold bg-red-400 p-2 rounded-md text-white cursor-pointer flex items-center justify-center' onClick={() => removeFromManager(record)}>
                                Remove
                            </div>
                        </div>
                    );
                }
                return null;   
            }
        }
    ];
    
    // const [projectName,setProjectName] = useState('');

    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true); // Show the modal
    };

    const showAddManager = () =>{
        setAddManagerVisisble(true);
    }

    const handleSelectChange = (value) => {
        setSelectedManagers(value); // Update selected managers
    };

    const handleProjectName = (event) =>{
        setProjectName(event.target.value);
        console.log(projectName);
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

    

    const logOut = () =>{
        axios.delete('http://localhost:5000/auth/logout', {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            navigate('/');
        }).catch(err=>console.log(err));
    }

    const removeFromManager = (record) =>{
        console.log(record.value);
        axios.patch(`http://localhost:5000/profile/${record.value}`,{role:'user'}, {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            setRemovedManager(true);
            const timer = setTimeout(() => {
                setRemovedManager(false);
                window.location.reload();
            }, 1500);
            return () => clearTimeout(timer);
        }).catch(err=>console.log(err));
    }

    const addAsManager = () =>{
        console.log(selectedManagers);
        axios.patch(`http://localhost:5000/profile/${selectedManagers}`,{role:'manager'}, {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            setAddManagerVisisble(false);
        }).catch(err=>console.log(err));
    }

    const addNewProject = () =>{
        console.log(projectName);
        const dataToSend = { projectName:projectName, projectManagerEmail:user.email, projectStatus:'Ongoing' };
        console.log(dataToSend);
        axios.post('http://localhost:5000/projects/create', dataToSend, {
            withCredentials: true,
        })
        .then(res => {
            console.log(res);
            setVisible(false);
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            {removedManager && 
                <div className='relative flex justify-center items-center z-50'>
                    <Alert className='top-[3vh] w-[auto] fixed' message={<span className='font-serif font-semibold'>Removed Successfully</span>} type="success" showIcon />
                </div>
            }
            

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
                        <Input placeholder='Project Name' onChange={handleProjectName}></Input>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={addNewProject}>
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
                        <Select options={userList} onChange={handleSelectChange} >
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleAddManagerCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 py-2 px-4 rounded-md text-black cursor-pointer' onClick={addAsManager}>
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
                    {user.role==='manager' &&
                        <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={showModal}>
                            Add Project
                        </div>
                    }
                    
                    {user.role==='admin' &&
                        <div className='font-semibold bg-emerald-400 p-2 rounded-md text-black cursor-pointer' onClick={showAddManager}>
                            Add Project Manager
                        </div>
                    }
                    
                </div>
                <div className='my-2 
                                lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-y-0 lg:space-x-3
                                xs:flex xs:flex-col xs:items-center xs:space-y-5 '>
                    <div className='border-2
                                    xl:w-[70%]
                                    lg:w-[80%]
                                    xs:w-[100%]
                                    '>
                        <Table columns={columns1} dataSource={projectList} pagination={{ pageSize: 4 }} scroll={{x:'40vw'}}>

                        </Table>
                    </div>
                    <div className='border-2
                                    xl:w-[30%]
                                    lg:w-[20%]
                                    xs:w-[100%]'>
                        <Table columns={columns2} dataSource={managerDataSource} pagination={{ pageSize: 4 }} >

                        </Table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProjectPage;