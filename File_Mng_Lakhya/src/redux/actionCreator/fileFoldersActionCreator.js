import * as types from "../actionsTypes/fileFoldersActionTypes"
import fire from "../../Config/firebase"
import { toast } from "react-toastify"

// actions
const addFolder =(payload)=>({
    type:types.CREATE_FOLDER,
    payload
})
const addFolders =(payload)=>({
    type:types.Add_FOLDERS,
    payload
})

const setLoading =(paload)=>({
    type:types.SET_LOADING,
    paload
})

const setChangeFolder =(payload)=>({
    type:types.CHANGE_FOLDER,
    payload
})
/// files

const addFiles = (payload)=>({
      type:types.ADD_FILE,
      payload
})
const addFile = (payload)=>({
    type :types.CREATE_FILE,
    payload
})
const setFileData =(payload)=>({
    type:types.SET_FILE_DATA,
    payload
})




// action creator 
export const createFolder =(data)=>(dispatch)=>{
     fire.firestore().collection("folders").add(data).
     then(async(folder)=>{
        const folderData = await (await folder.get()).data();
        const folderId=folder.id;
          dispatch(addFolder({data:folderData,docId:folderId}));
     })
}

export const getFolders=(userId)=>(dispatch)=>{
    dispatch(setLoading(true))
    fire.firestore().collection("folders").where("userId","==" ,userId)
    .get().then(async(folders)=>{
        const folderData = await folders.docs.map((folder)=>({
            data:folder.data(),
            docId:folder.id
        }));
        dispatch(addFolders(folderData));
        dispatch(setLoading(false))
    })
}


export const changeFolder=(folderId)=>(dispatch)=>{
       dispatch(setChangeFolder(folderId))
}


//file action creator

export const getFiles=(userId)=>(dispatch)=>{
    fire.firestore().collection("files").where("userId","==" ,userId)
    .get().then(async(files)=>{
        const filesData = await files.docs.map((file)=>({
            data:file.data(),
            docId:file.id
        }));
        dispatch(addFiles(filesData));
    })
}

export const createFile = (data,setSuccess)=>(dispatch)=>{
       fire.firestore().collection("files").add(data).then(
        async(file)=>{
             const fileData= await (await file.get()).data();
             const fileId= file.id;
             dispatch(addFile({data:fileData,docId:fileId}));
             setSuccess(true)
             

        }
       ).catch(()=>{
             setSuccess(false)
       })
}


export const updateFileData =(fileId,data)=>(dispatch)=>{
       fire.firestore().collection("files").doc(fileId).update({data})
       .then(()=>{
             dispatch(setFileData({fileId,data}))
             toast.error("File Saved Successfully ")
       }).catch(()=>{
            toast.error("Something Went Wrong!")
       })
}

export const uploadFile =(file,data,setSuccess)=>(dispatch)=>{
       const uploadFileRef= fire.storage().ref(`files/${data.userId}/${data.name}`);
       uploadFileRef.put(file).on("state_changed",(snapshot)=>{
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes)*100
              );
              console.log("Uploading" + progress + "%")
       },(error)=>{
        console.log(error)
       },async()=>{
          const fileUrl = await uploadFileRef.getDownloadURL();
          const fullData = {...data,url: fileUrl} ;

          fire.firestore().collection("files").add(fullData).then(
            async()=>{
                 const fileData = await (await file.get()).data();
                 const fileId= file.id;
                 dispatch(addFile({data:fileData,docId:fileId}))
                console.log(fileData)
                 toast.success("File Uploaded Successfully!");
                 setSuccess(true);
             
            }
          ).catch(()=>{
               setSuccess(false)
          })

    })
}