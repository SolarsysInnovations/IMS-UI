import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import DemoScreen from "../pages/Demo-screen";

export const sidebarData = [
    {
        id: 1,
        path: "/dashboard",
        title: "dashboard",
        icon: Home
    },
    {
        id: 2,
        path: "/demo",
        title: "invoice",
        icon: ReceiptRounded
    },
    {
        id: 3,
        path: "/components",
        title: "components",
        icon: ReceiptRounded,

    },
    {
        id: 4,
        path: "/client-list",
        title: "Clients",
        icon: "",

    },
    // {
    //     id: 4,
    //     path: "/asdsa",
    //     title: "profile",
    //     icon: AccountCircleRounded
    // },
    // {
    //     id: 5,
    //     path: "/asdasds",
    //     title: "settings",
    //     icon: SettingsSuggestRounded
    // },
]

export const sidebarTwo = [
    {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        icon: Home,
        isParent: false
    },
    {
        id: 2,
        title: "Clients",
        path: "/client-list",
        icon: Home,
        isParent: true,
        subItems: [
            { title: "Create Client", path: "/client/create" },
            { title: "Update", path: "/client/update" }
        ]
    },
    {
        id: 3,
        title: "Invoices",
        path: "/invoice/list",
        icon: Home,
        isParent: true,
        subItems: [
            { title: "Create", path: "/invoice/create" },
            { title: "Update", path: "/invoice/update" }
        ]
    },
    {
        id: 4,
        title: "Services",
        path: "/services/list",
        icon: Home,
        isParent: true,
        subItems: [
            { title: "Create Services", path: "/service/create" },
            { title: "Edit Services", path: "/service/edit" },
        ]
    },
    {
        id: 5,
        title: "Demo",
        path: "/demo",
        icon: Home,
        isParent: false
    },
    {
        id: 6,
        title: "DemoTwo",
        path: "/demo-two",
        icon: Home,
        isParent: false
    },

];
