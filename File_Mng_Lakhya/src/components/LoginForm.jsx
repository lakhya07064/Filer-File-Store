import React, { useEffect, useState } from 'react'
import { signInUser } from '../redux/actionCreator/authactionCreator'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginForm = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [success,setSuccess] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!email ||!password){
            toast.error("Please Fill In All fields");
                return;
        }
        dispatch(signInUser(email,password,setSuccess));
    }

    useEffect(()=>{
        if(success){
            navigate("/dashboard")
        }
    },[success])

  return (
    <form autoComplete='off' onSubmit={handleSubmit} >
        <div className="form-group my-2 ">
            <input type="email" name="email"  className="form-control" placeholder='Your Email' value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        <div className="form-group my-2">
            <input type="password" name="password"  className="form-control" placeholder='Set Password' value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            />
        </div>
        <button className="submit outline-dark text-white my-2 form-control mt-3" style={{ backgroundColor: '#9370DB' }}> Login</button>
    </form>
  )
}

export default LoginForm