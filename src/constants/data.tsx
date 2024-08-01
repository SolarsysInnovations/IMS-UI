import { Roles } from "./Enums";
import Unauthorized from "../unauthorized";
import { Navigate } from "react-router-dom";
import Reportscreen from "../pages/reports/Reportscreen";
import ArAgingscreen from "../pages/reports/Reports-ar-aging";
import Reportsinvoice from "../pages/reports/Reports-invoice";
import SettingScreen from "../pages/settings/settings";
import CustomerList from "../pages/customer/Customer-list-screen";
import InvoiceList from "../pages/Invoice/Invoice-list-screen";
import ServicesList from "../pages/service/service-list-screen";
import CreateServices from "../pages/service/create-service-screen";
import ServiceEditScreen from "../pages/service/service-edit-screen";
import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import Login from "../pages/Login-screen";
import InvoiceCreateScreen from "../pages/Invoice/Invoice-create-screen";
import CustomerScreen from "../pages/customer/Customer-screen";
import CompanyList from "../pages/super-admin-company/companyListScreen";
import CompanyScreen from "../pages/super-admin-company/companyScreen";
import UserScreen from "../pages/company-users/UserScreen";
import SettingRoleScreen from "../pages/settings/settings-role";
import DashboardScreen from "../pages/Dashboard/Dashboard";

export const allRoles = [Roles.SUPERADMIN, Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER];
export const admins = [Roles.ADMIN];
export const superAdmin = [Roles.SUPERADMIN,];
export const standardUser = [Roles.STANDARDUSER,];
export const approver = [Roles.APPROVER,]

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const userRole = getUserRole();
//console.log("userRole", userRole);

export const routesConfig = [
  // * -------- login ---------
  { path: "/login", element: <Login />, allowedRoles: [] },
  { path: "/unauthorized", element: <Unauthorized />, allowedRoles: [] },
  { path: "/", element: <Navigate to="/dashboard" />, allowedRoles: [...allRoles] },

  // * -------- dashboard ---------
  { path: "/dashboard", element: <DashboardScreen />, allowedRoles: [...allRoles] },

  // * ----------- customers ------------
  { path: "/customer-list", element: <CustomerList />, allowedRoles: [...admins, ...standardUser] },
  { path: "/customer/create", element: <CustomerScreen />, allowedRoles: [...admins, ...standardUser] },

  // * -------- reports ---------
  { path: "/reports", element: <Reportscreen />, allowedRoles: [...allRoles] },
  { path: "/reports/araging", element: <ArAgingscreen />, allowedRoles: [...allRoles] },
  { path: "/reports/invoice", element: <Reportsinvoice />, allowedRoles: [...allRoles] },

  // * ---------- settings -----------
  { path: "/settings", element: <SettingScreen />, allowedRoles: [...allRoles] },
  { path: "/settings/Role", element: <SettingRoleScreen />, allowedRoles: [...superAdmin, ...approver, ...standardUser] },
  // * ----------- invoice ------------
  { path: "/invoice/list", element: <InvoiceList />, allowedRoles: [...allRoles] },
  { path: "/invoice/create", element: <InvoiceCreateScreen />, allowedRoles: [...allRoles] },

  // * --------- service -----------
  { path: "/services/list", element: <ServicesList />, allowedRoles: [...admins] },
  { path: "/service/create", element: <CreateServices />, allowedRoles: [...admins] },
  {
    path: "/service/edit/:id", element: <ServiceEditScreen onSuccess={function (): void {
      throw new Error("Function not implemented.");
    }} />, allowedRoles: [...admins]
  },

  // * -------- company users ---------
  { path: "/user/list", element: <UserScreen />, allowedRoles: [...allRoles] },

  // * -------- company ---------
  { path: "/company", element: <CompanyList />, allowedRoles: [...superAdmin] },
  { path: "/company/create", element: <CompanyScreen />, allowedRoles: [...superAdmin] },

  // // * -------- super admin ---------
  // { path: "/super-admin", element: <SuperAdminDashboardScreen />, allowedRoles: [...allRoles] },
  // { path: "/super-admin/create", element: <CompanyScreen />, allowedRoles: [...allRoles] },

  // // * -------- approver ---------
  // { path: "/approver", element: <ApproverDashboardScreen />, allowedRoles: [...approver] },

  // // * -------- enduser ---------
  // { path: "/standarduser", element: <EnduserDashboardScreen />, allowedRoles: [...standardUser] },
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
    allowedRoles: [...admins, ...standardUser]
  },
  {
    id: 3,
    title: "Invoices",
    path: "/invoice/list",
    icon: ReceiptIcon,
    isParent: true,
    // subItems: [
    //   { id: 1, title: "Create", path: "/invoice/create" },
    // ],
    allowedRoles: [Roles.APPROVER, Roles.STANDARDUSER, Roles.ADMIN]
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
    allowedRoles: [...admins, ...standardUser]
  },
  {
    id: 6,
    title: "Users",
    path: "/user/list",
    icon: GroupsIcon,
    isParent: true,
    allowedRoles: [Roles.ADMIN],
  },


  {
    id: 7,
    title: "Company",
    path: "/company",
    icon: Home,
    isParent: true,
    allowedRoles: [...superAdmin]
  },
  {
    id: 8,
    title: "Settings",
    path:
      userRole === Roles.SUPERADMIN
        ? "/settings/Role"
        : userRole === Roles.APPROVER || userRole === Roles.STANDARDUSER
          ? "/settings/Role"
          : "/settings",
    icon: SettingsIcon,
    isParent: false,
    allowedRoles: [...allRoles],
  },
  // {
  //   id: 9,
  //   title: "Super Admin Dashboard",
  //   path: "/super-admin",
  //   icon: Home,
  //   isParent: true,
  //   allowedRoles: [...allRoles]
  // },
  // {
  //   id: 10,
  //   title: "Approver Dashboard",
  //   path: "/approver",
  //   icon: Home,
  //   isParent: true,
  //   allowedRoles: [...allRoles]
  // },

];

export const invoiceStatusOptions = ["DRAFT", "PENDING", "APPROVED", "RETURNED", "PAID",];



export const invoiceOptionsAccess = {

}