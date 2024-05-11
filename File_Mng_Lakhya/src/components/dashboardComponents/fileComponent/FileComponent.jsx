// import React, { useEffect, useState } from 'react'
// import Header from './Header'
// import { useParams } from 'react-router-dom'
// import { shallowEqual, useSelector } from 'react-redux'
// import CodeEditor from './CodeEditor'

// const FileComponent = () => {

//     const {fileId} = useParams()
//     const [fileData,setFileData]=useState("")


//     const {currentFile}=useSelector(
//         (state)=> ({
//            currentFile: state.filefolders.userFiles.find(
//                (file)=>file.docId ==fileId
//            )
//         }),shallowEqual)
    
//         useEffect(()=>{
//              if(currentFile){
//                 setFileData(currentFile.data.data)
//              }
//         },[currentFile])


//   return (
//     <div className='' >
//         <Header fileName={currentFile.data.name} 
//         fileData={fileData} 
//         prevFileData={currentFile.data.data}
//         fileId={fileId}
//         />
//        <CodeEditor fileName={currentFile.data.name}  data={fileData} setData={setFileData}/>
//     </div>
//   )
// }

// export default FileComponent
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import CodeEditor from './CodeEditor'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { doc } from 'firebase/firestore'


const FileComponent = () => {
    const { fileId } = useParams()
    const [fileData, setFileData] = useState("")
    const [prevFileData,setPrevFileData]=useState("")

    const navigate = useNavigate()
    
    const { currentFile } = useSelector(
        (state) => ({
            currentFile: state.filefolders.userFiles.find(
                (file) => file.docId === fileId
            )
        }),
        shallowEqual
    )
    
    useEffect(() => {
        if (currentFile) {
            // setFileData(currentFile.data?.data || "")
            setFileData(currentFile.data.data)
            setPrevFileData(currentFile.data.data)
        }
    }, [currentFile,currentFile.data.data])


    const downloadfile =()=>{
           const element = document.createElement("a");
           element.setAttribute("href",currentFile.data.url);
           element.setAttribute("download",currentFile.data.name);
           element.setAttribute("target","_blank");
           element.style.display="none";
           document.body.appendChild(element);

           element.click();

           document.body.removeChild(element);
    }


    return (
        <div className=''>
            {
                fileData !="null" ?(
                    <>
                    <Header 
                fileName={currentFile?.data?.name} 
                fileData={fileData} 
                prevFileData={prevFileData}
                fileId={fileId}
            />
            <CodeEditor 
                fileName={currentFile?.data?.name}  
                data={fileData} 
                setData={setFileData}
            />
            
                    </>
                ): (
                    <div className="position-fixed  w-100 left-0 top-0 h-100 bg-black text-white ">
                        {/* sub nav */}
                        <div className="d-flex py-4 px-4 mt-4 justify-content-between align-items-center ">
                            <p className='my-0'>
                                {currentFile.data.name}
                            </p>
                            <div className='d-flex align-items-center me-5 '>

                            <button
                                     className='btn btn-sm btn-primary me-3'
                                    onClick={()=>downloadfile()}
                                >
                                   Download
                                </button>

                                <button
                                className='btn btn-sm btn-outline-light '
                                onClick={()=>navigate(-1)}
                                >
                                     <FontAwesomeIcon icon={faArrowLeft}/> &nbsp;
                                     Go Back

                                </button>

                            </div>
                        </div>
                        {/* main body */}
                         <div className="w-100 mt-4">
                            {
                                currentFile.data.extension.includes("png") ||
                                currentFile.data.extension.includes("jpg")  ||
                                currentFile.data.extension.includes("jpeg")  ?(
                                      <img
                                          src={currentFile.data.url}
                                          alt={currentFile.data.name}
                                          className='w-100 h-100'
                                      
                                      />
                                ):(
                                     <div className="w-100 h-100 d-flex justify-content-center align items center">
                                        <p className='text- center'>
                                               File type not Supported. Please download the file to view it.
                                        </p>
                                     </div>
                                )
                            }
                         </div>
                    </div>
                )
            }
        </div>
    )
}

export default FileComponent
