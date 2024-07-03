import { Roles } from "./Enums";
import Unauthorized from "../unauthorized";
import { Navigate } from "react-router-dom";
import Reportscreen from "../pages/reports/Reportscreen";
import ArAgingscreen from "../pages/reports/Reports-ar-aging";
import Reportsinvoice from "../pages/reports/Reports-invoice";
import SettingScreen from "../pages/settings/settings";
import CustomerList from "../pages/customer/Customer-list-screen";
import CustomerEdit from "../pages/customer/Customer-edit-screen";
import CustomerCreate from "../pages/customer/Customer-create-screen";
import InvoiceList from "../pages/Invoice/Invoice-list-screen";
import CreateInvoice from "../pages/Invoice/Invoice-create-screen";
import ServicesList from "../pages/service/service-list-screen";
import CreateServices from "../pages/service/create-service-screen";
import ServiceEditScreen from "../pages/service/service-edit-screen";
import RolesList from "../pages/roles/Roles-list-screen";
import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import DemoScreen from "../pages/Demo-screen";
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import Login from "../pages/Login-screen";
import Dashboard from "../pages/Dashboard/Dashboard-screen";
import InvoiceEdit from "../pages/Invoice/Invoice-edit-screen";
import InvoiceCreateScreen from "../pages/Invoice/Invoice-create-screen";
import CompanyList from "../pages/company/companyListScreen";
import CompanyAdminCreate from "../pages/company/companyAdminCreateScreen";


export const allRoles = [Roles.SUPERADMIN, Roles.ADMIN, Roles.APPROVER, Roles.ENDUSER];
export const admins = [Roles.SUPERADMIN, Roles.ADMIN];

export const routesConfig = [

  // * -------- login ---------
  { path: "/login", element: <Login />, allowedRoles: [] },
  { path: "/unauthorized", element: <Unauthorized />, allowedRoles: [] },
  { path: "/", element: <Navigate to="/dashboard" />, allowedRoles: [...allRoles] },

  // * -------- dashboard ---------
  { path: "/dashboard", element: <Dashboard />, allowedRoles: [...allRoles] },

  // * -------- reports ---------
  { path: "/reports", element: <Reportscreen />, allowedRoles: [...allRoles] },
  { path: "/reports/araging", element: <ArAgingscreen />, allowedRoles: [...allRoles] },
  { path: "/reports/invoice", element: <Reportsinvoice />, allowedRoles: [...allRoles] },

  // * ---------- settings -----------
  { path: "/settings", element: <SettingScreen />, allowedRoles: [...allRoles] },

  // * ----------- customer ------------
  { path: "/customer-list", element: <CustomerList />, allowedRoles: [...allRoles] },
  { path: "/customer/edit/:id", element: <CustomerEdit />, allowedRoles: [...allRoles] },
  { path: "/customer/create", element: <CustomerCreate />, allowedRoles: [...allRoles] },

  // * ----------- invoice ------------
  { path: "/invoice/list", element: <InvoiceList />, allowedRoles: [...allRoles] },
  { path: "/invoice/edit/:id", element: <InvoiceEdit />, allowedRoles: [...allRoles] },
  { path: "/invoice/create", element: <InvoiceCreateScreen />, allowedRoles: [...allRoles] },

  // * --------- service -----------
  { path: "/services/list", element: <ServicesList />, allowedRoles: [...admins] },
  { path: "/service/create", element: <CreateServices />, allowedRoles: [...admins] },
  { path: "/service/edit/:id", element: <ServiceEditScreen />, allowedRoles: [...admins] },

  // * -------- roles ---------
  { path: "/users/list", element: <RolesList />, allowedRoles: [...admins] },

   // * -------- company ---------
   { path: "/company", element: <CompanyList />, allowedRoles: [...allRoles] },
   { path: "/company/create", element: <CompanyAdminCreate /> , allowedRoles: [...allRoles] },
];

export const sidebarTwo = [

  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
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
    title: "users",
    path: "/users/list",
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
    title: "Company",
    path: "/company",
    icon: Home,
    isParent: true,
    allowedRoles: [...allRoles]
  },
  {
    id: 8,
    title: "Demo",
    path: "/demo",
    icon: Home,
    isParent: false,
    allowedRoles: [...admins]

  },
  {
    id: 9,
    title: "DemoTwo",
    path: "/demo-two",
    icon: Home,
    isParent: false,
    allowedRoles: [...admins]

  },
  {
    id: 10,
    title: "Component",
    path: "/components",
    icon: Home,
    isParent: false,
    allowedRoles: [...admins]

  },
  {
    id: 11,
    title: "DynamicForm",
    path: "/dynamicForm",
    icon: Home,
    isParent: false,
    allowedRoles: [...admins]

  },
];


export const invoiceStatusOptions = ['APPROVED', 'DELETE', 'RETURNED', 'DRAFT', 'PENDING', 'PAID'];


export const sampleData =
[
  {
    id: 1,
    companyName: "Company A",
    userName: "Alice",
    userRole: "Manager",
    userAccess: "100"
  },
  {
    id: 2,
    companyName: "Company B",
    userName: "Bob",
    userRole: "Developer",
    userAccess: "75"
  },
  {
    id: 3,
    companyName: "Company C",
    userName: "Charlie",
    userRole: "Designer",
    userAccess: "80"
  },
  {
    id: 4,
    companyName: "Company D",
    userName: "David",
    userRole: "Analyst",
    userAccess: "90"
  },
  {
    id: 5,
    companyName: "Company E",
    userName: "Eve",
    userRole: "HR",
    userAccess: "70"
  },
  {
    id: 6,
    companyName: "Company F",
    userName: "Frank",
    userRole: "Support",
    userAccess: "60"
  },
  {
    id: 7,
    companyName: "Company G",
    userName: "Grace",
    userRole: "Executive",
    userAccess: "95"
  },
  {
    id: 8,
    companyName: "Company H",
    userName: "Hank",
    userRole: "Sales",
    userAccess: "85"
  },
  {
    id: 9,
    companyName: "Company I",
    userName: "Ivy",
    userRole: "Marketing",
    userAccess: "78"
  },
  {
    id: 10,
    companyName: "Company J",
    userName: "Jack",
    userRole: "Consultant",
    userAccess: "88"
  }
];

