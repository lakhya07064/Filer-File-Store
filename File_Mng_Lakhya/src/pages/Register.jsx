import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className=" w-50 m-auto mt-5 border border-dark" >
        <h1 className='display-1 my-5 text-center fw-bold'> Register Here</h1>
              <div className='row m-auto'>
        <div className="col-md-6 mx-auto mt-5 mb-5">
                <RegisterForm/>
                <Link to='/login'>
                    <p>Have an Account? Go to Login </p>
                </Link>  
            </div>
        </div>
    </div>
  )
}

export default Register