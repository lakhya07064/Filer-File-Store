import React from 'react'
import ShowItems from './showFilessss/ShowItems'
import { useSelector } from 'react-redux'


const DashHome = () => {
  // const folders =["New Folder", "New Folder 2"]
  // const files =[{name:"New File"},{ name:"New File 2"}]

  const {isLoading,userFolder,userFiles}= useSelector((state)=>({
        isLoading:state.filefolders.isLoading,
        userFolder:state.filefolders.userFolder.filter((folder)=> folder.data.parent=="root"),
        
        userFiles: state.filefolders.userFiles ? state.filefolders.userFiles.filter((file) => file.data.parent === "root") : [],

        // userFiles:state.filefolders.userFiles.filter((file)=> file.data.parent=="root"),
        // userFiles: state.filefolders.userFiles.filter(
        //     (file)=> file.data.parent=="root"
        // )
  }))

  return (
    <div className='col-md-12  w-100 px-5 py-5'>
    
      <ShowItems title={"Created Folders"} type={"folder"} items={userFolder}/>
       <ShowItems title={"Created Files"} type={"file"} 
       items={
        userFiles.filter((file)=>file.data.url=="null")
       }
       />
        <ShowItems title={"Uploaded  Files"} type={"file"} 
       items={
        // userFiles.filter((files)=>files.data.extension=="jpg" ) 
        userFiles.filter((files)=>files.data.extension=="png" ) 
       }
       />
       <ShowItems title={""} type={"file"} 
       items={
        // userFiles.filter((files)=>files.data.extension=="jpg" ) 
        userFiles.filter((files)=>files.data.extension=="jpg" ) 
        
       }
       />
          <ShowItems title={""} type={"file"} 
       items={
        // userFiles.filter((files)=>files.data.extension=="jpg" ) 
        userFiles.filter((files)=>files.data.extension=="pdf" ) 
        
       }
       />
         {/* {items && items.map((item,index)=>{
        return(
            <p key={index*55} className="col-md-2 py-3  text-center d-flex flex-column border"
              onDoubleClick={()=>handleDoubleClick(item.docId)}
            >
              {type=="folder"?(
                  <FontAwesomeIcon icon={faFolder}  size="4x" className="mb-3"/>
              ):(
                <FontAwesomeIcon icon={faFile} size="4x" className="mb-3"/>
              )}
              {item.name}
              </p>
        );
    })} */}
       
     
         
      
      

    </div>
  )
}

export default DashHome