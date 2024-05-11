import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ShowItems from '../showFilessss/ShowItems';

const FolderComponent = () => {
  const { folderId } = useParams();
 


  const {  childFolders , childFiles} = useSelector((state) =>
  ({
    currentFolderData: state.filefolders.userFolder.find((folder) => folder.docId == folderId)?.data,
    childFolders: state.filefolders.userFolder.filter((folder) => folder.data.parent == folderId),
    // childFiles: state.filefolders.userFiles ? state.filefolders.userFiles.find((file) => file.data.parent === folderId) : []
    childFiles: state.filefolders.userFiles ? state.filefolders.userFiles.filter((file) => file.data.parent === folderId) : [],


  }), shallowEqual)

  


  return (
    
    <div>
      { 
        childFolders.length >0 || childFiles.length > 0 ? (
          <>
          {
            childFolders.length > 0 && (
              <ShowItems
              title={"Created Folders"}
              type={"folder"}
              items={childFolders}
              />
            )
          }
           {
            childFiles.length >0 && (
              <>
              <ShowItems
              title={"Created Files"}
              type={"file"}
              items={
                childFiles.filter((file)=>file.data.url=="null")
                
              }
              />
              <ShowItems title={"Uploaded Files"} type={"file"}
              items={
               childFiles.filter((files)=>files.data.extension=="jpg" ) &&
               childFiles.filter((files)=>files.data.extension=="png" )
              }
              
              />
              </>
            )
           }
        
          </>
        ) : (
          <p className='text-center my-5'>
            Empty Folder
          </p>
        )
        
      } 
      
      {/* <p>
            <ShowItems
              title={"Created Folders"}
              type={"folder"}
              items={fool} />
          </p> */}
    </div>
  )
}

export default FolderComponent