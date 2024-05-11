import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { createFolder } from '../../../redux/actionCreator/fileFoldersActionCreator'
import { toast } from 'react-toastify'


const CreateFolder = ({setIscreatedFolderModalOpen}) => {


    const [folderName,setFolderName] =useState("")
    const {userFolder,user ,currrentFolder,currentFolderData} = useSelector((state)=>({
          userFolder: state.filefolders.userFolder,
          user: state.auth.user,
          currrentFolder : state.filefolders.currrentFolder,
          currentFolderData: state.filefolders.userFolder.find(folder=>folder.docId==state.filefolders.currrentFolder),
    }),shallowEqual)

    const dispatch = useDispatch()

    const checkFolderAlreadyPresent =({name})=>(folder)=>{
        // if(currrentFolder=="root"){
        //   const folderPresent = userFolder.find((folder)=> folder.name==name);
        //   if(folderPresent){
        //     return true;
        //   }else{
        //     return false;
        //   }
        // }
        // else{
            const folderPresent=userFolder.filter((folder)=> folder.data.parent == currrentFolder).filter((fldr)= fldr.data.name==name);
            if(folderPresent ){
                return true;
            }
            else{
                return false
            }
        
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(folderName){
           if(folderName.length>3){
            if(checkFolderAlreadyPresent(folderName) ){
               
                const data ={
                      createdAt : new Date(),
                      name :folderName,
                      userId: user.uid,
                      createdBy : user.name,
                      path: currrentFolder=="root"?[]:[...currentFolderData?.data.path,currrentFolder],
                      parent: currrentFolder,
                      lastAccessed:null,
                      updatedAt: new Date(),




                };
                
                dispatch(createFolder(data))
                toast.success("Folder Created Successfully !!")
                


            }else{
                toast.error("Folder Already Present")
            }
            
           }else{
            toast.error("Folder Name Must be atleast 3 character")
           }
        }else{
            toast.error("Enter Folder Name")
        }
    }

  return (
    <div className='col-md-12 position-fixed h-100' style={{background:"rgba(0,0,0,0.4)",zIndex:9999}} >
    <div className="row align-items-center justify-content-center">
        <div className="col-md-4  mt-5 bg-white rounded p-4">
            <div className="d-flex  justify-content-between">
                <h4> Create Folder</h4>
                <button className='btn' onClick={()=>setIscreatedFolderModalOpen(false)}>
                <FontAwesomeIcon 
                  icon={faTimes}
                  className="text-black"
                  size="sm"
                 />
                </button>
            </div>
            <hr/>
            <div className="d-flex flex column align-items-center">
                <form className="mt-3 w-100" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                           type='text'
                           className='form-control'
                           id='folderName'
                           placeholder='Folder Name'
                           value={folderName}
                           onChange={(e)=>setFolderName(e.target.value)}
                        />     
                    </div>
                    <button type='submit' className="btn btn-primary mt-5 form-control">
                        Create Folder
                    </button>
                </form>
            </div>
            </div>

    </div>
    </div>
  )
}

export default CreateFolder