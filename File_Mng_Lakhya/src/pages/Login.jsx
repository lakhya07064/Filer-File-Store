// import React from 'react'
// import LoginForm from '../components/LoginForm'
// import { Link } from 'react-router-dom'

// const Login = () => {
//   return (
//     <div className="container-fluid bg-danger">
//         <h1 className='display-1 my-5 text-center'>Login Here</h1>
//         <div className='row'>
//             <div className="col-md-6 mx-auto mt-5">
//                 <LoginForm/>
//                 <Link to='/register' >
//                     <p>Have No Account? Please Register </p>
//                 </Link>  
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Login

import React from 'react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
    <div className=" w-50 m-auto mt-5 border border-dark" >
      <h1 className='display-1 py-5 text-center fw-bold'>Login Here</h1>
      <div className='row  m-auto'>
        <div className="col-md-6 mx-auto mt-5 mb-5">
          <LoginForm />
          <Link to='/register'>
            Have No Account? Please Register
          </Link>
        </div>
      </div>
      
    </div>
    </>
    
  );
};

export default Login;
