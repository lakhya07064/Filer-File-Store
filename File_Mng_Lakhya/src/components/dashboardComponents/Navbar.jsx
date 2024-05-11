import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SignOutUser } from '../../redux/actionCreator/authactionCreator'
const  Navbar =()=> {

    const dispatch = useDispatch();

    const {isAuthenticated,user} = useSelector(state =>state.auth)
   
  return (
    <nav className='navbar navbar-expand-lg  bg-success py-4 shadow-sm'>
       <Link className='navbar-brand ms-5 text-xl'><span className='fw-bold'>Filer | The Boss of Files</span></Link>
       <ul className='navbar-nav ms-auto me-5'>
        {
        isAuthenticated?(
            <>
            <li className='navbar-item mx-2'>
            <p className='my-0 mt-2 mx-2 '>
                <span className='text-dark'> Heyy!! </span>
                <span className='fw-bold'> {user.name}</span>
            </p>
            </li>
              
        <li className='navbar-item mx-2'>
            
             <Link className=' btn btn-secondary ' to='/'>
               Go Home
             </Link>
        </li>
        <li className='navbar-item'>
             <button className=' btn btn-danger' to='/register'
              onClick={()=>{
                dispatch(SignOutUser())
              }}
             >
               Logout
             </button>
        </li>
            </>
        )
        :
        (
            <>
               
        <li className='navbar-item mx-2'>
             <Link className=' btn btn-primary btn-sm' to='/login'>
                Login
             </Link>
        </li>
        <li className='navbar-item'>
             <Link className=' btn btn-success btn-sm' to='/register'>
                Register
             </Link>
        </li>
            </>
        )
    }





       </ul>
    </nav>
  )
}

export default Navbar