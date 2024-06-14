import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import DemoScreen from "../pages/Demo-screen";
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import Dashboard from "../pages/Dashboard/Dashboard-screen";
import Login from "../pages/Login-screen";
import Unauthorized from "../unauthorized";
import { Navigate } from "react-router-dom";
import Reportscreen from "../pages/reports/Reportscreen";
import ArAgingscreen from "../pages/reports/Reports-ar-aging";
import Reportsinvoice from "../pages/reports/Reports-invoice";
import SettingScreen from "../pages/settings/settings";
import CustomerList from "../pages/customer/Customer-list-screen";
import CustomerEdit from "../pages/customer/Customer-edit-screen";
import CustomerCreate from "../pages/customer/Customer-create-screen";
import CreateInvoice from "../pages/Invoice/Invoice-create-screen";
import InvoiceList from "../pages/Invoice/Invoice-list-screen";
import ServicesList from "../pages/service/service-list-screen";
import CreateServices from "../pages/service/create-service-screen";
import ServiceEditScreen from "../pages/service/service-edit-screen";
import RolesList from "../pages/roles/Roles-list-screen";
import { admins, allRoles } from "./data";



type SidebarItem = {
    id: number;
    title: string;
    path: string;
    icon: React.ElementType;
    isParent: boolean;
    allowedRoles: string[];
    element: JSX.Element;
    subItems?: SidebarItem[];
};


export const sidebarTwo = [

    {
        id: 1,
        title: "Dashboard",
        path: "/dashboard",
        element: <Dashboard />,
        icon: Home,
        isParent: false,
        allowedRoles: [...allRoles]
    },
    {
        id: 2,
        title: "Customer",
        path: "/customer-list",
        icon: GroupIcon,
        isParent: true,
        subItems: [
            { id: 1, title: "Create Customer", path: "/customer/create" },
        ],
        allowedRoles: [...allRoles]
    },
    {
        id: 3,
        title: "Invoices",
        path: "/invoice/list",
        icon: ReceiptIcon,
        isParent: true,
        subItems: [
            { id: 1, title: "Create", path: "/invoice/create" },
        ],
        allowedRoles: [...allRoles]
    },
    {
        id: 4,
        title: "Services",
        path: "/services/list",
        icon: MiscellaneousServicesIcon,
        isParent: true,
        // subItems: [
        //     { title: "Create Services", path: "/service/create" },
        // ]
        allowedRoles: [...admins]
    },
    {
        id: 5,
        title: "Reports",
        path: "/reports",
        icon: TaskIcon,
        isParent: false,
        allowedRoles: [...admins]
    },
    {
        id: 6,
        title: "Roles",
        path: "/roles/list",
        icon: GroupsIcon,
        isParent: false,
        allowedRoles: [...admins]
    },
    {
        id: 7,
        title: "Settings",
        path: "/settings",
        icon: SettingsIcon,
        isParent: false,
        allowedRoles: [...allRoles]
    },
    {
        id: 8,
        title: "Demo",
        path: "/demo",
        icon: Home,
        isParent: false,
        allowedRoles: ['SUPERADMIN', 'ADMIN', 'USER', 'APPROVER']

    },
    {
        id: 9,
        title: "DemoTwo",
        path: "/demo-two",
        icon: Home,
        isParent: false,
        allowedRoles: ['SUPERADMIN', 'ADMIN', 'USER', 'APPROVER']

    },
    {
        id: 10,
        title: "Component",
        path: "/components",
        icon: Home,
        isParent: false,
        allowedRoles: ['SUPERADMIN', 'ADMIN', 'USER', 'APPROVER']

    },
    {
        id: 11,
        title: "DynamicForm",
        path: "/dynamicForm",
        icon: Home,
        isParent: false,
        allowedRoles: ['SUPERADMIN', 'ADMIN', 'USER', 'APPROVER']

    },

];

