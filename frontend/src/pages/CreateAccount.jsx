import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Alert, ConfigProvider } from 'antd';
import registrationImage from '../assets/RegistrationImage.jpg';
import { Row, Col } from 'antd';

const CreateAccount = () => {
    const [show,setShow] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            {show && (
                <div className='relative flex justify-center items-center z-50'>
                <Alert className='top-[3vh] w-[auto] fixed' message={<span className='font-serif font-semibold'>Sent Successfully</span>} type="success" showIcon />
                </div>
            )}
            <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-green-100'>

                <div className=' bg-white rounded-xl shadow-2xl
                                md:flex md:flex-row md:justify-center md:items-center md:w-[60%]
                                xs:flex xs:flex-col xs:items-center xs:w-[80%]'>
                    <div className='flex justify-center items-center
                                    lg:w-[50%]
                                    md:w-[35%] 
                                    xs:w-[40%] xs:flex-col'>
                        <img className='rounded-xl' src={registrationImage}></img>
                    </div>
                    <div className=' p-8 flex flex-col justify-center
                                    lg:w-[50%]
                                    md:w-[65%]'>
                        <Form autoComplete='off' labelCol={{xs:{span:24}}} labelAlign='left'>
                            <Form.Item className='my-3' label='Name' name='name' rules={[
                                {required:true,message:'Enter your username'},
                                {whitespace: true},
                                {min: 3}
                                ]} hasFeedback>
                                <Input className='border-slate-500' placeholder='Username'></Input>
                            </Form.Item>
                            <Form.Item className='my-3' label='E-mail' name='email' rules={[
                                {required:true,message:'Enter your e-mail'},
                                {type:'email',message:'Please enter a valid e-mail'}]} hasFeedback>
                                <Input className='border-slate-500' placeholder='E-mail'></Input>
                            </Form.Item>

                            <Form.Item className='my-3' label='Password' name='password' rules={[{required:true,message:'Enter a password'},{min:6}]} hasFeedback>
                                <Input className='border-slate-500' type='password' placeholder='Password'></Input>
                            </Form.Item>

                            <Form.Item className='my-3' label='Confirm Password' dependencies={['password']} name='confirmPassword' rules={[
                                {required:true,message:'Enter a password'},
                                ({getFieldValue})=>({
                                    validator(_,value){
                                        if(!value || getFieldValue('password') === value){
                                            return Promise.resolve();
                                        }else return Promise.reject("Password doesn't match");
                                    }
                                })]} hasFeedback>
                                <Input className='border-slate-500' type='password' placeholder='Confirm Password'></Input>
                            </Form.Item>

                            

                            <ConfigProvider
                                    theme={{
                                        token: {
                                        colorPrimary: '#4CAF50',
                                        },
                                    }}
                                    >
                                    <Form.Item wrapperCol={{
                                        md:{ offset: 7, span: 9 },
                                        xs:{offset:6, span:12}
                                        }}>
                                        <Button size='large' type='primary' htmlType='submit' block>
                                            Register
                                        </Button>
                                    </Form.Item>
                            </ConfigProvider>
                            
                            <div className='flex justify-center items-center'>
                                <p className='lg:text-sm md:text-xs'>Already have an account? <a className='font-semibold cursor-pointer' onClick={()=>navigate('/login')}>Log-In</a></p>
                            </div>

                            

                        </Form>
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CreateAccount;