const FileAction = () => {
    //   const [toggle, setToggle] = useState(false);
    const toggle = (id, data) => {
        return data.map((item) => {
            if (item.id === id) {
                return { ...item, isOpen: !item.isOpen };
            } else if (item.nesting && item.nesting.length > 0) {
                return { ...item, nesting: toggle(id, item.nesting) };
            }
            return item;
        });
    };

    const edit = (id, newName, data) => {
        return data.map((item) => {
            if (item.id === id) {
                return { ...item, name: newName };
            } else if (item.nesting && item.nesting.length > 0) {
                return { ...item, nesting: edit(id, newName, item.nesting) };
            }
            return item;
        });
    };

    const create = (id, newName, type, data) => {
        const newData = {
            id: createRandomId(),
            name: newName,
            isFolder: type === "folder" ? true : false,
            isOpen: false,
            nesting: [],
        };
        return data.map((item) => {
            if (item.id === id) {
                const tempData = [newData, ...item.nesting];
                tempData;
                return { ...item, nesting: tempData };
            } else if (item.nesting && item.nesting.length > 0) {
                return {
                    ...item,
                    nesting: create(id, newName, type, item.nesting),
                };
            }
            return item;
        });
    };

    const createRandomId = () => {
        const now = new Date();
        const randomPart = Math.random().toString(36).substring(2, 8);
        const id = `${now.getTime()}-${randomPart}`;
        return id;
    };

    return {
        toggle,
        edit,
        create,
    };
};

export default FileAction;
