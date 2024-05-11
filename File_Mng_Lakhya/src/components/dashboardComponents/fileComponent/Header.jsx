import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faAngleLeft, faArrowLeftLong, faSave } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateFileData } from '../../../redux/actionCreator/fileFoldersActionCreator'


const Header = ({fileName, fileId,fileData,prevFileData,setFileData}) => {

    const navigate=useNavigate();
    const dispatch = useDispatch();

  return (
    <nav className='navbar navbar-expand-lg py-0 navbar-light ps-3 pb-0 bg-secondary shadow-sm'>
         <p className='navbar-brand mt-0  fw-bold ms-3'>{fileName}</p>
         
        {
            fileData!= prevFileData  && (
                <h5 className='ms-auto text-warning'>*modifying</h5>
            )
        }

         <ul className='navbar-nav ms-auto me-5 mx-2'>
             <li className="nab-item ">
                <button className='btn btn-success'
                 disabled={fileData==prevFileData}
                 onClick={()=>{
                    dispatch(updateFileData(fileId,fileData))
                 }}
                 >
                    <FontAwesomeIcon icon={faSave} /> &nbsp;
                    Save
                </button>
             </li>
             <li className="nab-item ms-3">
                <button className='btn btn-dark ' onClick={()=>navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeftLong } /> &nbsp;
                   Go Back
                </button>
             </li>
         </ul>
    </nav>
  )
}

export default Header