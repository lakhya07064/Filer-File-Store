import { checkIsLoggedIn } from "../actionCreator/authactionCreator";
import * as types from "../actionsTypes/fileFoldersActionTypes" 

const initialState={
    isLoading:true,
    currrentFolder:"root",
    userFolder:[],
    userFiles:[],
    adminFolder:[],
    adminFiles:[],
    
   
}

const fileFoldersReducer =(state=initialState,action)=>{
       switch(action.type){
        case types.CREATE_FOLDER:
        return{
            ...state,
            userFolder:[...state.userFolder,action.payload]
        };
        case types.Add_FOLDERS:
            return{
                ...state,
                userFolder:action.payload,
            }

        case types.SET_LOADING:
           return {
            ...state,
            isLoading:action.payload
        } 
        case types.CHANGE_FOLDER:
            return{
                ...state,
                currrentFolder:action.payload
            }  
        case types.ADD_FILE:
                return{
                    ...state,
                    userFiles:action.payload
                }  
        case types.CREATE_FILE:
                    return{
                        ...state,
                        userFiles:[...state.userFiles,action.payload]
                    }    
        case types.SET_FILE_DATA:
             const {fileId,data} =action.payload;
             const allFiles= state.userFiles;
             const currentFile = allFiles.find((file)=>file.docId==fileId)
             currentFile.data.data=data;
             return{
                ...state,
                userFiles: state.userFiles.map((file)=> file.docId ==fileId ? currentFile :file)
             }

            
        default:
            return state;
       }
};

export default fileFoldersReducer