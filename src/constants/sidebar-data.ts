import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import DemoScreen from "../pages/Demo-screen";

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
        title: "Customer",
        path: "/customer-list",
        icon: Home,
        isParent: true,
        subItems: [
            { title: "Create Customer", path: "/customer/create" },
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
    {
        id: 7,
        title: "Component",
        path: "/components",
        icon: Home,
        isParent: false
    },

];
