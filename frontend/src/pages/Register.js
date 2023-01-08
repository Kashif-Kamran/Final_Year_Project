import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";
// Import Axios 
import axios from "axios";
import { Link } from "react-router-dom";
import Joi from 'joi';
import { colors } from "../Theme"
let validateRegistrationData = (data) =>
{
    const schema = Joi.object({
        fullName: Joi.string().required().min(3).max(30),
        username: Joi.string().required().min(3).max(30),
        email: Joi.string().required().min(3).email({ tlds: { allow: false } }),
        password: Joi.string().required().min(8).max(30)
    });
    return schema.validate(data);
}


function RegisterPage()
{
    // Form Data hook
    const [formData,setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    // Handle Change in data

    function handleChange(e)
    {
        const { name,value } = e.target;
        setFormData(prevData =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const navigate = useNavigate();

    // Register Button
    // Register Button
    async function handleRegister()
    {
        /** LINK - Steps to perform to register new User  */
        // 1. Get the data from the form
        console.log("rgister  : ",formData);
        // 2. Validate the data
        const { error } = validateRegistrationData(formData);
        console.log("Validation of Data");
        if (error)
        {
            alert("Error : " + error.message)
            return;
        }
        // 3. Send the data to the server
        try
        {
            // If Got the error 409 Confilic Error
            let regRes = await axios.post("http://localhost:4000/teamlead/register",formData);
            if (regRes.data.status === false)
            {
                alert(regRes.data.error.message)
                return
            }
            // Element Has been registered
            navigate("/login")
        } catch (error)
        {
            //    Check weather this was code=409
            if (!error.response)
            {
                alert("--- Error: Server Not Responding --- ");
            }
            else
            {
                alert("Some other(than email same) error Occured } " + error.message);
            }
            return;
        }

        // 4. If successfull, redirect to login page
        // 5. If not, show error message
    }
    return (
        <div id="register" className="flex h-screen justify-center items-center">
            <div className='flex w-10/12 h-5/6 shadow-xl p-5  rounded-md gap-10' style={{ backgroundColor: colors.primary[400] }}>
                <div className="img w-4/12 bg-green-200 ">

                </div>
                <div className=' pt-5 w-8/12 px-28'>
                    <h1 className='text-3xl block text-center font-semibold' >Register</h1>
                    <hr className='m-3 mb-10 mx-14 border-slate-300' />
                    <div>
                        <div className='mt-3'>
                            <label className='block mb-1 px-3 text-base' htmlFor="fullName">Full Name : </label>
                            <input value={formData.fullName} onChange={handleChange} className='border w-full text-cyan-900 text-base px-2 py-2 focus:outline-none focus:ring-0 focus:shadow-lg' type="text" name="fullName" id="fullName" placeholder='Enter Full Name' />
                        </div>
                        <div className='mt-3'>
                            <label className='block mb-1 px-3 text-base' htmlFor="username">Username : </label>
                            <input value={formData.username} onChange={handleChange} className='border w-full text-base text-cyan-900 px-2 py-2 focus:outline-none focus:ring-0 focus:shadow-lg' type="text" name="username" id="username" placeholder='Enter Username' />
                        </div>
                        <div className='mt-3'>
                            <label className='block mb-1 px-3 text-base' htmlFor="email">Email Adress: </label>
                            <input value={formData.email} onChange={handleChange} className='border w-full text-base px-2 py-2 text-cyan-900 focus:outline-none focus:ring-0 focus:shadow-lg' type="email" name="email" id="email" placeholder='Enter Email Adress' />
                        </div>
                        <div className='mt-3'>
                            <label className='block mb-1 px-3 text-base' htmlFor="password">Password : </label>
                            <input value={formData.password} onChange={handleChange} className='border w-full text-base px-2 py-2 text-cyan-900 rounded-sm focus:outline-none focus:ring-0 focus:border-grey-600 focus:shadow-lg ' type="password" name="password" id="password" placeholder='Enter Password' />

                        </div>
                        <div className='mt-8  flex justify-center' >
                            <Link >
                                <button className='block border px-10 py-3 bg-indigo-500 rounded-md outline-none focus:shadow-lg' onClick={handleRegister} >Register</button>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage