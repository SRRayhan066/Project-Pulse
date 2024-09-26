import React from 'react';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Progress, ConfigProvider, Upload } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Modal, Input, Form, Radio, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const TaskPage = () => {
    const columns1 = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            align: 'center',
            
        },
        {
            title: 'Task Handler',
            dataIndex: 'task-handler',
            key: 'task-handler',
            align: 'center',
            
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            
        },
        {
            title: 'Files',
            dataIndex: 'files',
            key:'files',
            align:'center',
            render: (text,record)=>{
                return(
                    <Upload beforeUpload={true}>
                        <Button>Click to upload</Button>
                    </Upload>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (text,record)=>{
                return(
                    <div className='flex space-x-1 justify-center items-stretch'>
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

    const dataSource = [
        {
            key: '1',
            task: 'Create Web Application',
            'task-handler': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '2',
            task: 'Create Android Application',
            'task-handler': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '3',
            task: 'Create Web Application',
            'task-handler': 'Md Shafikul Rahman',
            status: 'complete'
        },
        {
            key: '4',
            task: 'Create Web Application',
            'task-handler': 'Md Shafikul Rahman',
            status: 'complete'
        },
    ]
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [editVisible,setEditVisible] = useState(false);
    const [taskName,setTaskName] = useState('');
    const [status, setStatus] = useState('');
    const {projectName} = location.state || {};
    console.log(projectName);

    const navigate = useNavigate();

    const showModal = () => {
        setVisible(true); // Show the modal
    };

    const showEditModal = (record) =>{
        setStatus(record.status);
        setTaskName(record.task);
        setEditVisible(true);
    }
    
    const handleCancel = () => {
        setVisible(false); // Close the modal
    };

    const handleEditCancel = () =>{
        setEditVisible(false);
    };

    return (
        <div >
            <div className='flex space-x-5 py-2 items-center shadow-sm justify-end px-[5vw]'>
                <div>
                    <Avatar size="large" icon={<UserOutlined />} />
                </div>
                <div className='font-semibold bg-black p-2 rounded-md text-white cursor-pointer' onClick={()=>navigate('/')}>
                    Sign-out
                </div>
            </div>

            <Modal
                title="Add Task"
                visible={visible}
                footer={null}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item label='Task Name'>
                        <Input placeholder='Task Name'></Input>
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
                title="Edit Task"
                visible={editVisible}
                footer={null}
                onCancel={handleEditCancel}
            >
                <Form>
                    <Form.Item label='Task Name'>
                        <Input value={taskName} placeholder='Project Name'></Input>
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

            <div className='px-[5vw] my-10'>
                <div className='flex space-x-3 justify-between items-center
                                '>
                    <div className='font-serif font-semibold
                                    sm:text-2xl
                                    xs:text-xl'>
                        {projectName}
                    </div>
                    <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={showModal}>
                        Add Task
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
                        <Table columns={columns1} dataSource={dataSource} pagination={{ pageSize: 7 }} scroll={{x:'40vw'}}>

                        </Table>
                    </div>

                    <div className='xl:w-[30%]
                                    lg:w-[20%]
                                    xs:w-[100%] space-y-3'>
                        <div className='border-2 h-[50vh] rounded-md
                                        '>
                            <div className='h-[100%] w-[100%]  relative'>
                                <div className='h-[85%] p-2 space-y-2 overflow-y-auto'>
                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message 1.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message from Fahad Pathan.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-end justify-center'>
                                        <div className='text-xs'>Rayhan</div>
                                        <div className='bg-green-300 w-fit p-2 rounded-md'>
                                            This is outgoing message from S R Rayhan.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message 1.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message from Fahad Pathan.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-end justify-center'>
                                        <div className='text-xs'>Rayhan</div>
                                        <div className='bg-green-300 w-fit p-2 rounded-md'>
                                            This is outgoing message from S R Rayhan.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message 1.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-start justify-center'>
                                        <div className='text-xs'>Fahad Pathan</div>
                                        <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                            This is incoming message from Fahad Pathan.
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-end justify-center'>
                                        <div className='text-xs'>Rayhan</div>
                                        <div className='bg-green-300 w-fit p-2 rounded-md'>
                                            This is outgoing message from S R Rayhan.
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className='absolute bottom-1 left-0 w-full flex justify-between items-center px-2'>
                                    <div className='w-[78%]'>
                                        <Input className='p-2'></Input>
                                    </div>
                                    <div className='font-semibold bg-black py-2 px-4 rounded-md text-white cursor-pointer'>
                                        Send
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='border-slate-300 border-2 p-2 rounded-md shadow-sm flex flex-col justify-center items-center
                                    sm:space-y-5
                                    xs:space-y-1'>
                            <h2>Task statistics</h2>
                            <Progress
                                percent={100}
                                strokeColor='#abb2b9'
                                success={{
                                    percent: 0,
                                }}
                                format={() => <span className="text-md">137</span>}
                            />

                            <Progress
                                percent={60}
                                format={() => <span className="text-md">Ongoing</span>}
                            />

                            <Progress
                                percent={30}
                                success={{
                                    percent: 30,
                                }}
                                format={() => <span className="text-md">Complete</span>}
                            />
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>

        </div>
    );
};

export default TaskPage;