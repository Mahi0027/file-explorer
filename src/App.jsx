import { useEffect, useState } from "react";
import "./App.css";
import { folderData as initialData } from "./data/folderData";
import FileTab from "./components/FileTab";
import FileAction from "./hooks/FileAction";

function App() {
    const [data, setData] = useState(initialData);
    const { toggle, edit, create } = FileAction();

    const toggleAction = (id) => {
        setData(toggle(id, data));
    };

    const editAction = (id, newName) => {
        setData(edit(id, newName, data));
    };

    const createAction = (id, newName, type) => {
        setData(create(id, newName, type, data));
    };

    return (
        <>
            <div className="h-screen">
                <div className="text-5xl text-center mt-10 mb-20 font-thin">
                    File Explorer
                </div>
                <div className="w-96 h-5/6">
                    {data.map((item) => {
                        return (
                            <FileTab
                                key={item.id}
                                tabId={item.id}
                                name={item.name}
                                isFolder={item.isFolder}
                                isOpen={item.isOpen}
                                nesting={item.nesting}
                                toggleAction={toggleAction}
                                editAction={editAction}
                                createAction={createAction}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
