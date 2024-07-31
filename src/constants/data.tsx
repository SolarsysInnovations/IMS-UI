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
    allowedRoles: [Roles.APPROVER, Roles.STANDARDUSER, Roles.ADMIN]
  },
  {
    id: 4,
    title: "Services",
    path: "/services/list",
    icon: MiscellaneousServicesIcon,
    isParent: true,
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
];

export const invoiceStatusOptions: string[] = admins.includes(userRole as Roles)
  ? ["DRAFT", "PAID"]
  : approver.includes(userRole as Roles)
    ? ["PENDING", "APPROVED", "DELETE", "RETURNED"]
    : ["DRAFT", "PAID"];