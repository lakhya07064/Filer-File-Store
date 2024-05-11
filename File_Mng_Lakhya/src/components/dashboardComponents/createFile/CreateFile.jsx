// import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import React, { useEffect, useState } from 'react'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import { shallowEqual, useDispatch, useSelector } from 'react-redux'
// import { createFile } from '../../../redux/actionCreator/fileFoldersActionCreator'
// // import { createFolder } from '../../../redux/actionCreator/fileFoldersActionCreator'


// const CreateFile = ({setIscreatedFileModalOpen}) => {


//     const [fileName,setFileName] =useState("")
//     const [success,setSuccess] =useState(false)

//     const {userFiles,user ,currrentFolder,currentFolderData} = useSelector((state)=>({
//           userFiles: state.filefolders.userFiles,
//           user: state.auth.user,
//           currrentFolder : state.filefolders.currrentFolder,
//           currentFolderData: state.filefolders.userFolder.find(folder=>folder.docId==state.filefolders.currrentFolder),
//     }),shallowEqual)

//     const dispatch = useDispatch()
//     useEffect(()=>{
//        if(success){
//         setFileName("");
//         setSuccess(false);
//         setIscreatedFileModalOpen(false)
//        }
//     },[success])

//     const checkFileAlreadyPresent =({name,ext})=>{
//         // if(currrentFolder=="root"){
//         //   const folderPresent = userFolder.find((folder)=> folder.name==name);
//         //   if(folderPresent){
//         //     return true;
//         //   }else{
//         //     return false;
//         //   }
//         // }
//         // else{

//         if(!ext){
//             name = name + ".txt"
//         }
//             const filePresent=userFiles.filter((file)=> file.data.parent == currrentFolder).find((file)= file.data.name==name);
           
//             if(filePresent ){
//                 return true;
//             }
//             else{
//                 return false
//             }
        
//     }

//     const handleSubmit =(e)=>{
//         e.preventDefault();
//         if(fileName){
//            if(fileName.length>3){
//             /// check file extention
//             let extension =false;
//             if(!fileName.split(".").length>1){
//                 extension=true
//             }

//             if(checkFileAlreadyPresent(fileName,extension) ){
               
//                 const data ={
//                       createdAt : new Date(),
//                       name : extension? fileName :`${fileName}.txt`,
//                       userId: user.uid,
//                       createdBy : user.name,
//                       path: currrentFolder=="root"?[]:[...currentFolderData?.data.path,currrentFolder],
//                       parent: currrentFolder,
//                       lastAccessed:null,
//                       updatedAt: new Date(),
//                       extension: extension ? fileName.split(".")[1] :"txt",
//                       data:"",
//                       url:"null"




//                 };
                
//                 dispatch(createFile(data,setSuccess))
//                 alert("File Created Successfully !!")
                


//             }else{
//                 alert("File Already Present")
//             }
            
//            }else{
//             alert("File Name Must be atleast 3 character")
//            }
//         }else{
//             alert("Enter File Name")
//         }
//     }

//   return (
//     <div className='col-md-12 position-fixed h-100' style={{background:"rgba(0,0,0,0.4)",zIndex:9999}} >
//     <div className="row align-items-center justify-content-center">
//         <div className="col-md-4 mt-5 bg-white rounded p-4">
//             <div className="d-flex justify-content-between">
//                 <h4> Create Your File</h4>
//                 <button className='btn' onClick={()=>setIscreatedFileModalOpen(false)}>
//                 <FontAwesomeIcon 
//                   icon={faTimes}
//                   className="text-black"
//                   size="sm"
//                  />
//                 </button>
//             </div>
//             <hr/>
//             <div className="d-flex flex column align-items-center">
//                 <form className="mt-3 w-100" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input 
//                            type='text'
//                            className='form-control'
//                            id='fileName'
//                            placeholder='File Name | eg: file.txt, index.html'
//                            value={fileName}
//                            onChange={(e)=>setFileName(e.target.value)}
//                         />     
//                     </div>
//                     <button type='submit' className="btn btn-primary mt-5 form-control">
//                         Create File
//                     </button>
//                 </form>
//             </div>
//             </div>

//     </div>
//     </div>
//   )
// }

// export default CreateFile

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { createFile } from '../../../redux/actionCreator/fileFoldersActionCreator'
import { toast } from 'react-toastify'

const CreateFile = ({ setIscreatedFileModalOpen }) => {
    const [fileName, setFileName] = useState("")
    const [success, setSuccess] = useState(false)

    const { userFiles, user, currrentFolder, currentFolderData } = useSelector((state) => ({
        userFiles: state.filefolders.userFiles,
        user: state.auth.user,
        currrentFolder: state.filefolders.currrentFolder,
        currentFolderData: state.filefolders.userFolder.find(folder => folder.docId == state.filefolders.currrentFolder),
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            setFileName("");
            setSuccess(false);
            setIscreatedFileModalOpen(false)
        }
    }, [success])

    const checkFileAlreadyPresent = ({ name, ext }) => {
        if (!ext) {
            name = name + ".txt"
        }
        const filePresent = userFiles.filter((file) => file.data.parent == currrentFolder).find((fldr) => fldr.data.name == name);

        if (!filePresent) {
            return true;
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fileName) {
            if (fileName.length > 3) {
                // Check file extension
                let extension = false;
                if (fileName.split(".").length > 1) {
                    extension = true;
                }

                if (checkFileAlreadyPresent({ name: fileName, ext: extension })) {
                    const data = {
                        createdAt: new Date(),
                        name: extension ? fileName : `${fileName}.txt`,
                        userId: user.uid,
                        createdBy: user.name,
                        path: currrentFolder == "root" ? [] : [...currentFolderData?.data.path, currrentFolder],
                        parent: currrentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: extension ? fileName.split(".")[1] : "txt",
                        data: "",
                        url: "null"
                    };

                    dispatch(createFile(data, setSuccess));
                    toast.success("File Created Successfully !!");
                } else {
                    toast.error("File Already Present");
                }

            } else {
                toast.error("File Name Must be at least 3 characters");
            }
        } else {
            toast.error("Enter File Name");
        }
    }

    return (
        <div className='col-md-12 position-fixed h-100' style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }} >
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4> Create Your File</h4>
                        <button className='btn' onClick={() => setIscreatedFileModalOpen(false)}>
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="text-black"
                                size="sm"
                            />
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type='text'
                                    className='form-control'
                                    id='fileName'
                                    placeholder='File Name | eg: file.txt, index.html'
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                />
                            </div>
                            <button type='submit' className="btn btn-primary mt-5 form-control">
                                Create File
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFile
