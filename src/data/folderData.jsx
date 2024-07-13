export const folderData = [
    {
        id: 1,
        name: "firstFolder",
        isFolder: true,
        isOpen: false,
        nesting: [],
    },
    {
        id: 2,
        name: "secondFolder",
        isFolder: true,
        isOpen: true,
        nesting: [
            {
                id: 3,
                name: "test.js",
                isFolder: false,
                isOpen: false,
                nesting: [],
            },
            {
                id: 5,
                name: "tes2.js",
                isFolder: false,
                isOpen: false,
                nesting: [],
            },
            {
                id: 6,
                name: "sixthFolder",
                isFolder: true,
                isOpen: true,
                nesting: [
                    {
                        id: 7,
                        name: "thirdFolder",
                        isFolder: true,
                        isOpen: false,
                        nesting: [],
                    },
                    {
                        id: 8,
                        name: "abcd.html",
                        isFolder: false,
                        isOpen: false,
                        nesting: [],
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        name: "thirdFolder",
        isFolder: true,
        isOpen: false,
        nesting: [],
    },
];
