import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SignOutUser, checkIsLoggedIn } from '../redux/actionCreator/authactionCreator'

const  NavigationComponent =()=> {

    const dispatch = useDispatch();

    const {isAuthenticated,user} = useSelector(state =>state.auth)
    
   
  return (
    <nav className='navbar navbar-expand-lg  navbar-dark  ' style={{background: "rgb(2,0,36)",
      background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(84,9,121,1) 48%, rgba(145,0,255,1) 100%)"}}>
       <Link className='navbar-brand ms-5 py-4 px-5 fw-bold text-white'>Filer | The Boss of Files</Link>
       <ul className='navbar-nav ms-auto me-5'>
        {
        isAuthenticated?(
            <>
            <p className='me-2 mt-1'>
                <span className='text-light'> Heyy!! </span>
                <span className='text-warning fw-bold me-3'>{user.name}</span>
            </p>
              
        <li className='navbar-item mx-2'>
            
             <Link className=' btn btn-light btn-sm me-3 border  text-dark' to='/dashboard'>
                DashBoard
             </Link>
        </li>
        <li className='navbar-item'>
             <button className=' btn btn-danger btn-sm' to='/register'
              onClick={()=>{
                dispatch(SignOutUser())
              }}
             >
               Log Out
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

export default NavigationComponent