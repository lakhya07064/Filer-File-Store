import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUpUser } from '../redux/actionCreator/authactionCreator'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const RegisterForm = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmpassword,setConfirmassword] = useState('')
    const [success,setSuccess] = useState(false)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name ||!email ||!password || !confirmpassword){
            toast.error("Please Fill in All Fields");
            return;
        }
        if(password !== confirmpassword){
            toast.error("Check Both the Paaword !!")  
        }
        dispatch(signUpUser(name,email,password,setSuccess))


    }



    useEffect(()=>{
        if(success){
           navigate("/dashboard")
        }
    },[success])

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
        <div className="form-group my-2">
        <input type="text" name="name"  className="form-control" placeholder='Your Name' value={name} 
        onChange={(e)=>setName(e.target.value)}
        />
    </div>
    <div className="form-group my-2">
        <input type="email" name="email"  className="form-control" placeholder='Your Email' value={email} 
        onChange={(e)=>setEmail(e.target.value)}
        />
    </div>
    <div className="form-group my-2">
        <input type="password" name="password"  className="form-control" placeholder='Password' value={password} 
        onChange={(e)=>setPassword(e.target.value)}
        />
    </div>
    <div className="form-group my-2">
        <input type="password" name="confirmpassword"  className="form-control" placeholder='Confirm Password' value={confirmpassword} 
        onChange={(e)=>setConfirmassword(e.target.value)}
        />
    </div>
    <button className="submit outline-dark text-white my-2 form-control mt-3" style={{ backgroundColor: '#9370DB' }}> Register Me</button>
</form>
  )
}

export default RegisterForm