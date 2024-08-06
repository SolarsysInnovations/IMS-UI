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
import ServiceCreate from "../pages/service/service-create-screen";
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

const getUserRole = () => {
  return localStorage.getItem('userRole');
};
export const userRole = getUserRole();


export const sidebarTwo = [
  {
    id: 1,
    title: "Dashboard",
    element: <DashboardScreen />,
    path: "/dashboard",
    icon: Home,
    isParent: false,
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER, Roles.SUPERADMIN],
  },
  {
    id: 2,
    title: "Customer",
    path: "/customer-list",
    element: <CustomerList />,
    icon: GroupIcon,
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "Create Customer",
        path: "/customer/create",
        element: <CustomerScreen />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
    ],
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 3,
    title: "Invoices",
    path: "/invoice/list",
    element: <InvoiceList />,
    icon: ReceiptIcon,
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "Create Invoice",
        path: "/invoice/create",
        element: <InvoiceCreateScreen />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
    ],
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 4,
    title: "Services",
    path: "/services/list",
    element: <ServicesList />,
    icon: MiscellaneousServicesIcon,
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "Create Services",
        path: "/service/create",
        element: <ServiceCreate onSuccess={function (): void {
          throw new Error("Function not implemented.");
        } } />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
      {
        id: 2,
        show: false,
        title: "Edit Service",
        path: "/service/edit/:id",
        element: <ServiceEditScreen onSuccess={function (): void { throw new Error("Function not implemented."); }} />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
    ],
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 5,
    title: "Reports",
    element: <Reportscreen />,
    path: "/reports",
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "AR Aging Report",
        path: "/reports/araging",
        element: <ArAgingscreen />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
      {
        id: 2,
        show: false,
        title: "Invoice Report",
        path: "/reports/invoice",
        element: <Reportsinvoice />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
    ],
    icon: TaskIcon,
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 6,
    title: "Users",
    path: "/user/list",
    element: <UserScreen />,
    icon: GroupsIcon,
    isParent: false,
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 7,
    title: "Company",
    path: "/company",
    element: <CompanyList />,
    icon: Home,
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "Create Company",
        path: "/company/create",
        element: <CompanyScreen />,
        allowedRoles: [Roles.SUPERADMIN],
      },
    ],
    allowedRoles: [Roles.SUPERADMIN],
  },
  {
    id: 8,
    title: "Settings",
    path: "/settings",
    element: <SettingScreen />,
    icon: SettingsIcon,
    isParent: true,
    subItems: [
      {
        id: 1,
        show: false,
        title: "Role Settings",
        path: "/settings/Role",
        element: <SettingRoleScreen />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER, Roles.SUPERADMIN],
      },
    ],
    allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER, Roles.SUPERADMIN],
  },
];

export const invoiceStatusOptions = ["DRAFT", "PENDING", "APPROVED", "RETURNED", "PAID",];

export const applicationUserAccess = {
  [Roles.SUPERADMIN]: {
    // customer access
    canCreateCustomers: false,
    canViewCustomers: false,
    canEditCustomers: true,
    canDeleteCustomers: true,
    // invoice access
    canCreateInvoices: true,
    canViewInvoices: true,
    canEditInvoices: true,
    canDeleteInvoices: true,
    // service access
    canCreateServices: true,
    canViewServices: true,
    canEditServices: true,
    canDeleteServices: true,
    // user access
    canCreateUsers: true,
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    // company access
    canCreateCompanies: false,
    canViewCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,

    // settings access
    canCreateSettings: true,
    canViewSettings: true,
    canEditSettings: true,
  },
  [Roles.ADMIN]: {
    // customer access
    canCreateCustomers: true,
    canViewCustomers: true,
    canEditCustomers: true,
    canDeleteCustomers: true,
    // invoice access
    canCreateInvoices: true,
    canViewInvoices: true,
    canEditInvoices: true,
    canDeleteInvoices: true,
    // service access
    canCreateServices: true,
    canViewServices: true,
    canEditServices: true,
    canDeleteServices: true,
    // user access
    canCreateUsers: true,
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    // company access
    canCreateCompanies: false,
    canViewCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,

    // settings access
    canCreateSettings: true,
    canViewSettings: true,
    canEditSettings: true,
  },

};

console.log(applicationUserAccess[Roles.ADMIN].canCreateCustomers);
