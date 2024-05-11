import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import "./ShowItems.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"



import React from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeFolder } from "../../../redux/actionCreator/fileFoldersActionCreator"


const ShowItems = ({title,items,type}) => {

  const navigate= useNavigate();
  const dispatch = useDispatch()
  const handleDoubleClick=(itemId)=>{
        if(type== "folder"){
          dispatch(changeFolder(itemId))
          navigate(`/dashboard/folder/${itemId}`)
        }else{
          navigate(`/dashboard/file/${itemId}`)
        }
  }

  return (
    <div className="w-100">
        <h4 className="text-center border-buttom">{title}</h4>
        <div className="row gap-3 ms-5 flex-wrap mt-5">
            {items.map((item)=>{
                return(
                    <p key={item.docId} className="col-md-2 py-3  text-center d-flex flex-column border"
                      onDoubleClick={()=>handleDoubleClick(item.docId)}
                    >
                      {type=="folder"?(
                          <FontAwesomeIcon icon={faFolder}  size="4x" className="mb-3"/>
                      
                      ):(
                        <FontAwesomeIcon icon={faFile} size="4x" className="mb-3"/>
                      
                      )}
                      {item.data.name}
                      </p>
                );
            })}
        </div>
    </div>
  )
}

export default ShowItems