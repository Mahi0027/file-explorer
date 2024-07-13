/* eslint-disable react/prop-types */
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { CiFolderOn, CiFileOn } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { IoSaveOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { LuFilePlus } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const FileTab = ({
    tabId,
    name,
    isFolder,
    isOpen,
    nesting = [],
    toggleAction,
    editAction,
    createAction,
}) => {
    const [updatedInputValue, setUpdatedInputValue] = useState(name);
    const [createName, setCreateName] = useState("");
    const [createFolderFlag, setCreateFolderFlag] = useState(false);
    const [createFlagId, setCreateFlagId] = useState(-1);
    const [editFlag, setEditFlag] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (createFlagId === tabId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [createFlagId, tabId]);

    const updateEditFlag = (event) => {
        event.stopPropagation();
        setEditFlag(true);
    };
    const saveNameChange = () => {
        setEditFlag(false);
        editAction(tabId, updatedInputValue);
    };

    const createFolder = (event) => {
        event.stopPropagation();
        setCreateFlagId(tabId);
        setCreateFolderFlag(true);
    };

    const createFile = (event) => {
        event.stopPropagation();
        setCreateFlagId(tabId);
        setCreateFolderFlag(false);
    };

    const saveCreateChanges = (event) => {
        event.stopPropagation();
        if (createName !== "") {
            createFolderFlag
                ? createAction(tabId, createName, "folder")
                : createAction(tabId, createName, "file");
        }
        removeAllActions();
    };

    const removeAllActions = () => {
        setCreateFolderFlag(false);
        setCreateFlagId(-1);
        setEditFlag(false);
        setCreateName("");
    };

    return (
        <div
            className={`h-auto transition-all transform my-5 ml-4 pl-2`}
            onClick={removeAllActions}
        >
            <div className="w-full flex justify-start items-center">
                <div className="pr-4">
                    {isFolder ? <CiFolderOn /> : <CiFileOn />}
                </div>
                <div className="w-full flex justify-between items-center">
                    <div>
                        {editFlag ? (
                            <input
                                className="border border-gray-500 rounded-md"
                                value={updatedInputValue}
                                onChange={(e) =>
                                    setUpdatedInputValue(e.target.value)
                                }
                            />
                        ) : (
                            name
                        )}
                    </div>
                    <div className=" flex justify-end items-center text-lg">
                        <div className="cursor-pointer pr-5 flex justify-end items-center text-gray-700 ">
                            {isFolder && !editFlag ? (
                                <>
                                    <div
                                        className="mr-2 hover:scale-110 transition-all transform"
                                        onClick={createFolder}
                                    >
                                        <MdOutlineCreateNewFolder />
                                    </div>
                                    <div
                                        className="hover:scale-110 transition-all transform"
                                        onClick={createFile}
                                    >
                                        <LuFilePlus />
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="cursor-pointer pr-1 hover:scale-110 transition-all">
                            {editFlag ? (
                                <IoSaveOutline onClick={saveNameChange} />
                            ) : (
                                <LiaEdit onClick={updateEditFlag} />
                            )}
                        </div>
                        <div
                            className="cursor-pointer pr-1 hover:scale-110 transition-all"
                            onClick={() => toggleAction(tabId)}
                        >
                            {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>
                    </div>
                </div>
            </div>

            {createFlagId === tabId && (
                <div className="w-full flex justify-around items-center my-1 py-1 border border-gray-300 bg-gray-100 rounded-md">
                    <div className="flex justify-start items-center">
                        <div className="mr-2">
                            {createFolderFlag ? <CiFolderOn /> : <CiFileOn />}
                        </div>
                        <div>
                            <input
                                className="border border-gray-400 rounded-md text-lg"
                                ref={inputRef}
                                value={createName}
                                onChange={(e) => setCreateName(e.target.value)}
                                placeholder={`${
                                    createFolderFlag
                                        ? "add folder name..."
                                        : "add file name..."
                                }`}
                            />
                        </div>
                    </div>

                    <div
                        className="text-3xl text-gray-800 hover:scale-110 transition-all"
                        onClick={saveCreateChanges}
                    >
                        <MdPlaylistAdd />
                    </div>
                </div>
            )}

            {isOpen &&
                nesting.length > 0 &&
                nesting.map((nestedTab) => {
                    return (
                        <FileTab
                            key={nestedTab.id}
                            tabId={nestedTab.id}
                            name={nestedTab.name}
                            isFolder={nestedTab.isFolder}
                            isOpen={nestedTab.isOpen}
                            nesting={nestedTab.nesting}
                            toggleAction={toggleAction}
                            editAction={editAction}
                            setCreateFlagId={setCreateFlagId}
                            createAction={createAction}
                        />
                    );
                })}
        </div>
    );
};

export default FileTab;
