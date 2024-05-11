

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../../../redux/actionCreator/fileFoldersActionCreator'
import { toast } from 'react-toastify'

const Upload = ({ setIsFileUploadModalOpen }) => {
    const [file, setFile] = useState(null)
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

    const checkFileAlreadyPresent = ({ name}) => {
       
        const filePresent = userFiles.filter((file) => file.data.parent == currrentFolder).find((fldr) => fldr.data.name == name);

        if (!filePresent) {
            return true;
        } else {
            return false
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            

                if (checkFileAlreadyPresent({ name: file })) {
                    const data = {
                        createdAt: new Date(),
                        name: file.name,
                        userId: user.uid,
                        createdBy: user.name,
                        path: currrentFolder == "root" ? [] : [...currentFolderData?.data.path, currrentFolder],
                        parent: currrentFolder,
                        lastAccessed: null,
                        updatedAt: new Date(),
                        extension: file.name.split(".")[1],
                        data: "null",
                        url: ""
                    };

                    dispatch(uploadFile(file,data, setSuccess));
                    toast.success("Your File Uploaded Successfully !!");
                } else {
                    toast.error("File Already Present");
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
                        <button className='btn' onClick={() => setIsFileUploadModalOpen(false)}>
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
                                    type='file'
                                    className='form-control'
                                    id='file'
                                    placeholder='File Name | eg: file.txt, index.html'
                                    // value={file}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            <button type='submit' className="btn btn-primary mt-5 form-control">
                                Upload  File
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload
