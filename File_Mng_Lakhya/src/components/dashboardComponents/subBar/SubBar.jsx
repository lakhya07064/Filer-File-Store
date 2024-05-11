import React from 'react'
import "./SubBar.css"
import {faFile, faFileAlt, faFileUpload, faFolderPlus} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'


const SubBar = ({setIscreatedFileModalOpen,
  setIscreatedFolderModalOpen,
  setIsFileUploadModalOpen

  }) => {
   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentFolder,currentDolderData,userFolders} = useSelector((state)=>({
         currentFolder: state.filefolders.currentFolder,
        //  currentDolderData:state.filefolders.useFolder.find(
        //   (folder)=>folder.docId==state.filefolders.currentFolder
        //  ),
        currentFolderData: state.filefolders.userFolder.find(folder=>folder.docId==state.filefolders.currrentFolder),
         userFolders:state.filefolders.useFolder,
  }),shallowEqual)




  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white px-4 py-2 ms-auto">
      <nav className='ms-5' aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item">
      <Link to="/dashboard">Root</Link>
      </li>
    {/* <li className="breadcrumb-item active" aria-current="page"></li> */}
  </ol>
  </nav>
      <ul className='navbar-nav ms-auto '>
        <li className='nav-item'>
          <button 
          className='btn btn-outline-dark mx-1'
          onClick={()=>setIsFileUploadModalOpen(true)}
          ><FontAwesomeIcon icon={faFileUpload} /> &nbsp; Upload File</button>
        </li>
        <li className='nav-item'>
          <button className='btn btn-outline-dark mx-4'
               onClick={()=>setIscreatedFileModalOpen(true)}
          ><FontAwesomeIcon icon={faFileAlt} /> &nbsp; Create File</button>
        </li>
        <li className='nav-item'>
          <button className='btn btn-outline-dark '  onClick={()=>setIscreatedFolderModalOpen(true)}><FontAwesomeIcon icon={faFolderPlus}
              /> &nbsp; Create Folder</button>
        </li>
      </ul>
    </nav>
  )
}

export default SubBar