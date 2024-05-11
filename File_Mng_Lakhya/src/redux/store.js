import {applyMiddleware, combineReducers, createStore} from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'
import authReducer from './reducer/authreducer';
import fileFoldersReducer from './reducer/fileFoldersReducer';


const rootReducer = combineReducers({auth:authReducer,filefolders:fileFoldersReducer})
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) 
);

export default store;
