import React, { lazy, Suspense, ReactElement } from 'react';
import { Roles } from "./Enums";
import Unauthorized from "../unauthorized";
import { Navigate } from "react-router-dom";
import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';

// Lazy load components
const Login = lazy(() => import("../pages/Login-screen"));
const Reportscreen = lazy(() => import("../pages/reports/Reportscreen"));
const ArAgingscreen = lazy(() => import("../pages/reports/Reports-ar-aging"));
const Reportsinvoice = lazy(() => import("../pages/reports/Reports-invoice"));
const SettingScreen = lazy(() => import("../pages/settings/settings"));
const CustomerList = lazy(() => import("../pages/customer/Customer-list-screen"));
const InvoiceList = lazy(() => import("../pages/Invoice/Invoice-list-screen"));
const ServicesList = lazy(() => import("../pages/service/service-list-screen"));
const CreateServices = lazy(() => import("../pages/service/create-service-screen"));
const ServiceEditScreen = lazy(() => import("../pages/service/service-edit-screen"));
const InvoiceCreateScreen = lazy(() => import("../pages/Invoice/Invoice-create-screen"));
const CustomerScreen = lazy(() => import("../pages/customer/Customer-screen"));
const CompanyList = lazy(() => import("../pages/super-admin-company/companyListScreen"));
const CompanyScreen = lazy(() => import("../pages/super-admin-company/companyScreen"));
const UserScreen = lazy(() => import("../pages/company-users/UserScreen"));
const SettingRoleScreen = lazy(() => import("../pages/settings/settings-role"));
const DashboardScreen = lazy(() => import("../pages/Dashboard/Dashboard"));

// Profiler component
interface ProfilerProps {
  id: string;
  children: React.ReactNode;
}

const Profiler: React.FC<ProfilerProps> = ({ id, children }) => (
  <React.Profiler id={id} onRender={(id, phase, actualDuration) => {
    console.log(`Component ${id} took ${actualDuration}ms to ${phase}`);
  }}>
    {children}
  </React.Profiler>
);

export const allRoles: Roles[] = [Roles.SUPERADMIN, Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER];
export const admins: Roles[] = [Roles.ADMIN];
export const superAdmin: Roles[] = [Roles.SUPERADMIN];
export const standardUser: Roles[] = [Roles.STANDARDUSER];
export const approver: Roles[] = [Roles.APPROVER];
import Login from "../pages/Login-screen";
import InvoiceCreateScreen from "../pages/Invoice/Invoice-create-screen";
import CustomerScreen from "../pages/customer/Customer-screen";
import CompanyList from "../pages/super-admin-company/companyListScreen";
import CompanyScreen from "../pages/super-admin-company/companyScreen";
import UserScreen from "../pages/company-users/UserScreen";
import SettingRoleScreen from "../pages/settings/settings-role";
import DashboardScreen from "../pages/Dashboard/Dashboard";

const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

export const userRole: string | null = getUserRole();

interface RouteConfig {
  path: string;
  element: ReactElement;
  allowedRoles: Roles[];
}

export const routesConfig: RouteConfig[] = [
  { path: "/login", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="Login"><Login /></Profiler></Suspense>, allowedRoles: [] },
  { path: "/unauthorized", element: <Unauthorized />, allowedRoles: [] },
  { path: "/", element: <Navigate to="/dashboard" />, allowedRoles: [...allRoles] },
  { path: "/dashboard", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="Dashboard"><DashboardScreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/customer-list", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="CustomerList"><CustomerList /></Profiler></Suspense>, allowedRoles: [...admins, ...standardUser] },
  { path: "/customer/create", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="CustomerScreen"><CustomerScreen /></Profiler></Suspense>, allowedRoles: [...admins, ...standardUser] },
  { path: "/reports", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="Reportscreen"><Reportscreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/reports/araging", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="ArAgingscreen"><ArAgingscreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/reports/invoice", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="Reportsinvoice"><Reportsinvoice /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/settings", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="SettingScreen"><SettingScreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/settings/Role", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="SettingRoleScreen"><SettingRoleScreen /></Profiler></Suspense>, allowedRoles: [...superAdmin, ...approver, ...standardUser] },
  { path: "/invoice/list", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="InvoiceList"><InvoiceList /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/invoice/create", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="InvoiceCreateScreen"><InvoiceCreateScreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/services/list", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="ServicesList"><ServicesList /></Profiler></Suspense>, allowedRoles: [...admins] },
  { path: "/service/create", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="CreateServices"><CreateServices /></Profiler></Suspense>, allowedRoles: [...admins] },
  { 
    path: "/service/edit/:id", 
    element: <Suspense fallback={<div>Loading...</div>}>
      <Profiler id="ServiceEditScreen">
        <ServiceEditScreen onSuccess={function (): void {
          throw new Error("Function not implemented.");
        }} />
      </Profiler>
    </Suspense>, 
    allowedRoles: [...admins]
  },
  { path: "/user/list", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="UserScreen"><UserScreen /></Profiler></Suspense>, allowedRoles: [...allRoles] },
  { path: "/company", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="CompanyList"><CompanyList /></Profiler></Suspense>, allowedRoles: [...superAdmin] },
  { path: "/company/create", element: <Suspense fallback={<div>Loading...</div>}><Profiler id="CompanyScreen"><CompanyScreen /></Profiler></Suspense>, allowedRoles: [...superAdmin] },
];
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
        element: <CreateServices />,
        allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      },
      {
        id: 2,
        show: false,
        title: "Edit Service",
        path: "/service/edit/:id",
        element: <ServiceEditScreen />,
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
