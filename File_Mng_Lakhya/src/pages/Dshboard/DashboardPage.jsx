import React, { useEffect, useState } from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {Route, Routes, useLocation, useNavigate} from "react-router-dom"
import Navbar from '../../components/dashboardComponents/Navbar'
import SubBar from '../../components/dashboardComponents/subBar/SubBar'
import DashHome from '../../components/dashboardComponents/DashHome'
import CreateFolder from '../../components/dashboardComponents/createFolder/CreateFolder'
import { getFiles, getFolders } from '../../redux/actionCreator/fileFoldersActionCreator'
import FolderComponent from '../../components/dashboardComponents/FolderCompo/FolderComponent'
import CreateFile from '../../components/dashboardComponents/createFile/CreateFile'
import FileComponent from '../../components/dashboardComponents/fileComponent/FileComponent'
import Upload from '../../components/dashboardComponents/uploadFile/Upload'
const DashboardPage = () => {
  
  const navigate = useNavigate();
  const [isCreatedFolderModalopen,setIscreatedFolderModalOpen] = useState(false)
  const [isCreatedFileModalopen,setIscreatedFileModalOpen] = useState(false)
  const [isFileUploadModalOpen,setIsFileUploadModalOpen] = useState()

  const [showSubBar,setShowSubBar]=useState(true)
  const {pathname} =useLocation()

  const{ isLoggedIn, isLoading,userId} = useSelector((state)=>
    ({isLoggedIn:state.auth.isAuthenticated, 
      isLoading:state.filefolders.isLoading,
      userId: state.auth.user.uid,
    
    }),shallowEqual)

  const dispatch = useDispatch()

  useEffect(()=>{
     if(!isLoggedIn){
      navigate("/")
     }
  },[isLoggedIn])

  useEffect(()=>{
    if( pathname.includes("/file/")){
      setShowSubBar(false)
    }
  },[pathname])

  useEffect(()=>{
     if(isLoading && userId){
        dispatch(getFolders(userId))
        dispatch(getFiles(userId))
     }
  },[userId,isLoading,isLoggedIn]);



  return (
    <>
    {
      isCreatedFolderModalopen && (
        <CreateFolder setIscreatedFolderModalOpen={setIscreatedFolderModalOpen}/>
      )
    }
     
     {
      isCreatedFileModalopen && (
        <CreateFile setIscreatedFileModalOpen={setIscreatedFileModalOpen}/>
      )
    }
       {
      isFileUploadModalOpen && (
        <Upload setIsFileUploadModalOpen={setIsFileUploadModalOpen}/>
      )
    }

    <Navbar/>
    { showSubBar && (
       <SubBar 
       setIscreatedFolderModalOpen={setIscreatedFolderModalOpen}
       setIscreatedFileModalOpen={setIscreatedFileModalOpen}
       setIsFileUploadModalOpen={setIsFileUploadModalOpen}
      />
    )

    }
    
     
     <Routes>
         <Route path="" element={ <DashHome/>}/>
         <Route path="folder/:folderId" element={ <FolderComponent/>}/>
         <Route path="file/:fileId" element={ <FileComponent/>}/>
     </Routes>

     
    </>
  )
}

export default DashboardPage