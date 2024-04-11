import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import DemoScreen from "../pages/Demo-screen";
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
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
        icon: GroupIcon,
        isParent: true,
        subItems: [
            { title: "Create Customer", path: "/customer/create" },
            { title: "Customer Demo", path: "/customer/demo" },
        ]
    },
    {
        id: 3,
        title: "Invoices",
        path: "/invoice/list",
        icon: ReceiptIcon,
        isParent: true,
        subItems: [
            { title: "Create", path: "/invoice/create" },
        ]
    },
    {
        id: 4,
        title: "Services",
        path: "/services/list",
        icon: VolunteerActivismIcon,
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
    {
        id: 7,
        title: "DynamicForm",
        path: "/dynamicForm",
        icon: Home,
        isParent: false
    },

];
