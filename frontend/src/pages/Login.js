import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi,{ string } from 'joi';
import { colors } from "../Theme"
import { storeToken } from "../utils/SessionStorageService"

function Login()
{




    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        username: "",
        password: ""
    });

    // Login Validation Function 
    let validateLoginData = (data) =>
    {
        const schema = Joi.object({
            username: Joi.string().required().min(3).max(30),
            password: Joi.string().required().min(8).max(30)
        });
        return schema.validate(data);
    }



    function handleChange(e)
    {
        const { name,value } = e.target;
        setFormData(prevData =>
        {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    const handleRegister = () =>
    {
        navigate("/register");
    }


    async function handleLoginBtn()
    {
        const { error } = validateLoginData(formData);
        if (error)
        {
            alert("Error : " + error.message)
            return;
        }
        // 3. Send the username and password to the backend
        try
        {
            const response = await axios.post("http://localhost:4000/teamlead/login",formData);
            console.log("Response : ",response.data.status);
            if (!response.data.status)
            {
                alert("Error : " + response.data.error.message)
                return
            }
            storeToken(response.data.data.token);
            navigate("/");
        } catch (error)
        {
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

    }
    function handleRegisterBtn()
    {
        navigate("/register");
    }
    return (
        <div className="flex h-screen justify-center items-center">
            <div className='flex w-10/12 h-4/5  shadow-xl p-5  rounded-md gap-10' style={{ backgroundColor: colors.primary[400] }}>
                <div className="img w-4/12 bg-green-200 ">

                </div>
                <div className=' pt-5 w-8/12 px-28'>
                    <h1 className='text-3xl block text-center font-semibold' >Login</h1>
                    <hr className='m-10' />
                    <div>
                        <div className='mt-3'>
                            <label className='block mb-1 px-3 text-base' htmlFor="username">Username : </label>
                            <input value={formData.username} onChange={handleChange} className='border text-cyan-900 w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:shadow-lg' type="text" name="username" id="username" placeholder='Enter Username' />
                        </div>
                        <div className='mt-3'>

                            <label className='block mb-1 px-3 text-base' htmlFor="password">Password : </label>
                            <input value={formData.password} onChange={handleChange} className='border text-cyan-900 w-full text-base px-2 py-2 rounded-sm focus:outline-none focus:ring-0 focus:border-grey-600 focus:shadow-lg ' type="password" name="password" id="password" placeholder='Enter Password' />
                        </div>
                        <div className='mt-8 flex justify-center' >
                            <button className='block border px-10 py-3 w-3/5 bg-green-300 rounded-md outline-none focus:shadow-lg' onClick={handleLoginBtn}>Login</button>
                        </div>
                        <p className='my-3 block text-center'>---------- OR -----------</p>
                        <div className='flex justify-center' >
                            <button className='block border px-10 py-3 w-3/5 bg-indigo-500 rounded-md outline-none  focus:shadow-lg' onClick={handleRegisterBtn}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login