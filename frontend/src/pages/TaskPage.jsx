import React from 'react';
import { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Progress, ConfigProvider, Upload, Select, Alert } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Modal, Input, Form, Radio, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TaskPage = () => {
    const location = useLocation();
    const {projectName, user, userList} = location.state || {};
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
            className: user.role === 'manager' ? '' : 'hidden',
            render: (text,record)=>{
                if(user.role==='manager'){
                    return(
                        <div className='flex space-x-1 justify-center items-stretch'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer flex items-center justify-center' onClick={() => showEditModal(record)} >
                                Edit
                            </div>
                            <div className='font-semibold bg-red-400 p-2 rounded-md text-white cursor-pointer flex items-center justify-center' onClick={() => deleteTask(record)}>
                                Delete
                            </div>
                        </div> 
                    )
                }
                
                
            }
        },
    ];


    
    const [visible, setVisible] = useState(false);
    const [editVisible,setEditVisible] = useState(false);
    const [removedManager,setRemovedManager] = useState(false);
    const [taskName,setTaskName] = useState('');
    const [status, setStatus] = useState(null);
    const [selectedStudent,setSelectedStudent] = useState({name: null , email: null});
    const [taskAddedSuccessfully,setTaskAddedSuccessfully] = useState(false);
    
    const [studentList,setStudentList] = useState([]);
    const [taskList,setTaskList] = useState([]);

    const [allStudents,setAllStudents] = useState([{name:'',email:''}]);

    const [taskStatistics,setTaskStatistics] = useState({ongoing: 0, complete: 0});

    const [currentStudent,setCurrentStudent] = useState(null);

    const [comment,setComment] = useState(null);

    const [commentList,setCommentList] = useState([]);

    const addStudent = (newStudent) => {
        setAllStudents(prevStudents => [...prevStudents, newStudent]);
    };

    console.log(projectName);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/profile/not/working`, {
            withCredentials: true,
        })
        .then(res => {
            const formatList = res.data;
            console.log("The not working list ");
            console.log(formatList);
            const formattedUserList = formatList
            .filter(user => user.role === 'user')
            .map(user => ({
                label: user.name,  // Name as the label
                value: user.email,
              // Email as the value (or use a unique ID if available)
            }));
            console.log(formattedUserList);
            setStudentList(formattedUserList);
        })
        .catch(err => console.log(err));

        axios.get(`http://localhost:5000/tasks/all/${projectName}`, {
            withCredentials: true,
        })
        .then(res => {
            console.log("Vai data");
            console.log(res.data[0].assignedTo);
            const formatList = res.data;
            let ong = 0, com = 0;

            const formattedTaskList = formatList
                .filter(pr => pr.assignedTo.find(assignedUser => assignedUser.email === user.email)  || user.role==='manager' || user.role==='admin')
                .map(pr => {
                    if (pr.taskStatus === 'Ongoing') ong++;
                    if (pr.taskStatus === 'Complete') com++;
                    // const newStudent = { name: pr.assignedTo[0].name, email: pr.assignedTo[0].email };
                    // addStudent(newStudent);
                    localStorage.setItem(pr.assignedTo[0].name,pr.assignedTo[0].email);
                    console.log("Bal Name : "+pr.assignedTo[0].name);
                    console.log("Bal Email : "+pr.assignedTo[0].email);
                    return {
                        task: pr.taskName,
                        value: pr.taskName,
                        'task-handler': pr.assignedTo[0].name,
                        status: pr.taskStatus
                    };

                    
                });
                setTaskStatistics({ ongoing: ong, complete: com });
                console.log(formattedTaskList);
                setTaskList(formattedTaskList);
        })
        .catch(err => console.log(err));


        axios.get(`http://localhost:5000/comments/all/${projectName}`, {
            withCredentials: true,
        })
        .then(res => {
            console.log("All comments");
            console.log(res.data);
            const formatList = res.data;
            const formattedTaskList = formatList
                .filter(pr => pr.projectName === projectName)
                .map(pr=>({
                    userName:pr.userEmail,
                    comment:pr.comment
                }))
            setCommentList(formattedTaskList);
            console.log("The ultimate comments ");
            console.log(formattedTaskList);
        })
        .catch(err => console.log(err));
        console.log("Vai array nen");
        console.log(allStudents);
    },[]);

    const showModal = () => {
        setVisible(true); // Show the modal
    };

    const showEditModal = (record) =>{
        setStatus(record.status);
        setTaskName(record.task);
        setCurrentStudent(record['task-handler']);
        setEditVisible(true);
    }
    
    const handleCancel = () => {
        setVisible(false); // Close the modal
    };

    const handleEditCancel = () =>{
        setEditVisible(false);
    };

    const handleTasktName = (event) =>{
        setTaskName(event.target.value);
    }

    const handleComments = (event) =>{
        setComment(event.target.value);
    }

    const handleSelectChange = (selectedOption) => {
        console.log("Selected option");
        console.log(selectedOption);
        const {label,value} = selectedOption;
        console.log('name : '+label);
        setSelectedStudent({name:label,value}); 
        console.log(selectedStudent);
    };

    const createATask = () =>{
        const dataToSend = { taskName:taskName,projectName:projectName, assignedTo:selectedStudent.value, taskStatus:'Ongoing' };
        console.log("Data jeta pathamu")
        console.log(dataToSend);
        

        axios.post('http://localhost:5000/tasks/create', dataToSend, {
            withCredentials: true,
        })
        .then(res => {

            axios.patch(`http://localhost:5000/profile/working/${selectedStudent.value}`,{working:true}, {
                withCredentials: true,
            })
            .then(res=>{
                console.log(res);
            }).catch(err=>console.log(err));


            console.log(res);
            setVisible(false);
            setTaskAddedSuccessfully(true);
            const timer = setTimeout(() => {
                setTaskAddedSuccessfully(false);
                window.location.reload();
            }, 1500);
            return () => clearTimeout(timer);
        })
        .catch(err => console.log(err));
    }

    const deleteTask = (record) =>{
        console.log("Bal er record");
        console.log(record);
        axios.delete(`http://localhost:5000/tasks/delete/${record.value}`, {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            axios.patch(`http://localhost:5000/profile/working/${localStorage.getItem(record['task-handler'])}`,{working:false}, {
                withCredentials: true,
            })
            .then(res=>{
                console.log(res);
            }).catch(err=>console.log(err));

            setRemovedManager(true);
            const timer = setTimeout(() => {
                setRemovedManager(false);
                window.location.reload();
            }, 1500);
            return () => clearTimeout(timer);
        }).catch(err=>console.log(err));
    }

    const editTask = () =>{
        console.log("Bal er current student "+currentStudent);
        axios.patch(`http://localhost:5000/tasks/update/status/${taskName}`,{taskStatus:status,assignedTo:selectedStudent.value}, {
            withCredentials: true,
        })
        .then(res=>{
            console.log(res);
            if(selectedStudent.name!==currentStudent){
                // console.log("selected :: "+selectedStudent.name);
                // console.log("current :: "+currentStudent)
                axios.patch(`http://localhost:5000/profile/working/${localStorage.getItem(currentStudent)}`,{working:false}, {
                    withCredentials: true,
                })
                .then(res=>{
                    console.log(res);
                }).catch(err=>console.log(err));

                axios.patch(`http://localhost:5000/profile/working/${selectedStudent.value}`,{working:true}, {
                    withCredentials: true,
                })
                .then(res=>{
                    console.log(res);
                }).catch(err=>console.log(err));
            }
            setEditVisible(false);
            window.location.reload();
        }).catch(err=>console.log(err));
    }


    const postAComment = () =>{
        const dataToSend = { projectName:projectName, userEmail:user.name, comment:comment };
        axios.post('http://localhost:5000/comments/create', dataToSend, {
            withCredentials: true,
        })
        .then(res => {
            console.log(res);
            setComment(null);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <div >
            {taskAddedSuccessfully && 
                <div className='relative flex justify-center items-center z-50'>
                    <Alert className='top-[3vh] w-[auto] fixed' message={<span className='font-serif font-semibold'>Task Added Successfully</span>} type="success" showIcon />
                </div>
            }

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
                        <Input placeholder='Task Name' onChange={handleTasktName}></Input>
                    </Form.Item>
                    <Form.Item label='Assigned to'>
                        <Select options={studentList} onChange={handleSelectChange} placeholder='Choose student' labelInValue>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={createATask}>
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
                    <Form.Item label='Task Name' >
                        <Input value={taskName} placeholder='Project Name' disabled></Input>
                    </Form.Item>
                    <Form.Item label='Assigned to'>
                        <Select options={studentList} onChange={handleSelectChange} placeholder='Choose student' labelInValue>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Project Status'>
                        <Radio.Group value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <Radio.Button value='Ongoing'>Ongoing</Radio.Button>
                            <Radio.Button value='Complete'>Complete</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='flex justify-end space-x-2'>
                            <div className='font-semibold border-2 p-2 rounded-md text-black cursor-pointer' onClick={handleEditCancel}>
                                Cancel
                            </div>
                            <div className='font-semibold bg-green-400 py-2 px-4 rounded-md text-black cursor-pointer' onClick={editTask}>
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
                    {user.role === 'manager' &&
                        <div className='font-semibold bg-green-400 p-2 rounded-md text-black cursor-pointer' onClick={showModal}>
                            Add Task
                        </div>
                    }
                    
                </div>
                <div className='my-2
                                lg:flex lg:flex-row lg:justify-center lg:items-start lg:space-y-0 lg:space-x-3
                                xs:flex xs:flex-col xs:items-center xs:space-y-5 '>
                    <div className='border-2 border-slate-400 rounded-md
                                    xl:w-[70%]
                                    lg:w-[80%]
                                    xs:w-[100%]
                                    '>
                        <Table columns={columns1} dataSource={taskList} pagination={{ pageSize: 6 }} scroll={{x:'40vw'}}>

                        </Table>
                    </div>

                    <div className='xl:w-[30%]
                                    lg:w-[20%]
                                    xs:w-[100%] space-y-3'>
                        <div className='border-2 border-slate-400 h-[50vh] rounded-md
                                        '>
                            <div className='h-[100%] w-[100%]  relative'>
                                <div className='h-[85%] p-2 space-y-2 overflow-y-auto'>
                                    {
                                        commentList.map((cm,index)=>(
                                            
                                            cm.userName === user.name ? ( // Check if cm.userName is not equal to user.name
                                                <div className='flex flex-col items-end justify-center'>
                                                    <div className='text-xs'>{cm.userName}</div>
                                                    <div className='bg-green-300 w-fit p-2 rounded-md'>
                                                        {cm.comment}
                                                    </div>
                                                    </div> 
                                            ) : (
                                                <div className='flex flex-col items-start justify-center'>
                                                    <div className='text-xs'>{cm.userName}</div>
                                                    <div className='bg-slate-300 w-fit p-2 rounded-md'>
                                                        {cm.comment}
                                                    </div>
                                                    </div>
                                            )
                                        ))
                                    } 
                                </div>
                                <div className='absolute bottom-1 left-0 w-full flex justify-between items-center px-2'>
                                    <div className='w-[78%]'>
                                        <Input className='p-2' onChange={handleComments}></Input>
                                    </div>
                                    <div className='font-semibold bg-black py-2 px-4 rounded-md text-white cursor-pointer' onClick={postAComment}>
                                        Send
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='border-slate-400 border-2 p-2 rounded-md shadow-sm flex flex-col justify-center items-center
                                    sm:space-y-5
                                    xs:space-y-1'>
                            <h2>Task statistics</h2>
                            <Progress
                                percent={100}
                                strokeColor='#abb2b9'
                                success={{
                                    percent: 0,
                                }}
                                format={() => <span className="text-md">Total</span>}
                            />

                            <Progress
                                percent={taskStatistics.ongoing*100/taskList.length}
                                format={() => <span className="text-md">Ongoing</span>}
                            />

                            <Progress
                                percent={taskStatistics.complete*100/taskList.length}
                                success={{
                                    percent: taskStatistics.complete*100/taskList.length,
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