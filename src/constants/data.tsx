import { Roles } from "./Enums";
import { Navigate } from "react-router-dom";
import { Home, ReceiptRounded, LogoutOutlined, AccountCircleRounded, SettingsSuggestRounded } from "@mui/icons-material"
 import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import TaskIcon from '@mui/icons-material/Task';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
//import Login from "../pages/Login-screen";
// Lazy load all components
import { Suspense, lazy, Profiler, ProfilerOnRenderCallback, ReactNode } from "react";
const Unauthorized = lazy(() => import("../unauthorized"));
const Reportscreen = lazy(() => import("../pages/reports/Reportscreen"));
const ArAgingscreen = lazy(() => import("../pages/reports/Reports-ar-aging"));
const Reportsinvoice = lazy(() => import("../pages/reports/Reports-invoice"));
const SettingScreen = lazy(() => import("../pages/settings/settings"));
const CustomerList = lazy(() => import("../pages/customer/Customer-list-screen"));
const InvoiceList = lazy(() => import("../pages/Invoice/Invoice-list-screen"));
const ServicesList = lazy(() => import("../pages/service/service-list-screen"));
const CreateServices = lazy(() => import("../pages/service/create-service-screen"));
const ServiceEditScreen = lazy(() => import("../pages/service/service-edit-screen"));
const Login = lazy(() => import("../pages/Login-screen"));
const Dashboard = lazy(() => import("../pages/Dashboard/Admin-dashboard/Dashboard-screen"));
const InvoiceCreateScreen = lazy(() => import("../pages/Invoice/Invoice-create-screen"));
const CustomerScreen = lazy(() => import("../pages/customer/Customer-screen"));
const CompanyList = lazy(() => import("../pages/super-admin-company/companyListScreen"));
const CompanyScreen = lazy(() => import("../pages/super-admin-company/companyScreen"));
const SuperAdminDashboardScreen = lazy(() => import("../pages/Dashboard/superAdmin-dashboard/DashboardScreen"));
const ApproverDashboardScreen = lazy(() => import("../pages/Dashboard/approver-dashboard/DashboardScreen"));
const EnduserDashboardScreen = lazy(() => import("../pages/Dashboard/End-user dashboard/DashboardScreen"));
const UserScreen = lazy(() => import("../pages/company-users/UserScreen"));
const SettingRoleScreen = lazy(() => import("../pages/settings/settings-role"));
//const ForgetPassword = lazy(() => import("../pages/ForgetPassword-screen"));
// const CustomerCreate = lazy(() => import("../pages/customer/Customer-create-screen"));
// const CreateInvoice = lazy(() => import("../pages/Invoice/Invoice-create-screen"));
// const DemoScreen = lazy(() => import("../pages/Demo-screen"));
// const CompanyCreate = lazy(() => import("../pages/super-admin-company/companyCreate"));

export const allRoles = [Roles.SUPERADMIN, Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER];
export const admins = [Roles.ADMIN];
export const superAdmin = [Roles.SUPERADMIN,];
export const standardUser = [Roles.STANDARDUSER,];
export const approver = [Roles.APPROVER,]

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const getDashboardComponent = (role: any) => {
  switch (role) {
    case Roles.ADMIN:
      return <Dashboard />;
    case Roles.SUPERADMIN:
      return <SuperAdminDashboardScreen />;
    case Roles.APPROVER:
      return <ApproverDashboardScreen />;
    case Roles.STANDARDUSER:
      return <EnduserDashboardScreen />;
  }
};
export const userRole = getUserRole();
//console.log("userRole", userRole);
// Define props interface for LazyLoadWrapper
const onRenderCallback: any = (
  id: any,
  phase: any,
  actualDuration: any,
  baseDuration: any,
  startTime: any,
  commitTime: any,
  interactions: any
) => {
  try {
    console.log(`Component ${id} rendered:`);
    console.log(`Phase: ${phase}`);
    console.log(`Actual duration: ${actualDuration}`);
    console.log(`Base duration: ${baseDuration}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
    console.log('Interactions:', interactions);    
    console.log('-------------------');
  } catch (error) {
    console.error('Error in Profiler callback:', error);
  }
};

// Define props interface for LazyLoadWrapper
interface LazyLoadWrapperProps {
  children: ReactNode;
  id: string;
}


const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ children, id }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  </Suspense>
);
export const routesConfig = [
  { path: "/login", element: <LazyLoadWrapper id="Login"><Login /></LazyLoadWrapper>, allowedRoles: [] },
  { path: "/unauthorized", element: <LazyLoadWrapper id="Unauthorized"><Unauthorized /></LazyLoadWrapper>, allowedRoles: [] },
  { path: "/", element: <Navigate to="/dashboard" />, allowedRoles: [...allRoles] },
  { path: "/dashboard", element: <LazyLoadWrapper id="Dashboard">{getDashboardComponent(userRole)}</LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/customer-list", element: <LazyLoadWrapper id="CustomerList"><CustomerList /></LazyLoadWrapper>, allowedRoles: [...admins, ...standardUser] },
  { path: "/customer/create", element: <LazyLoadWrapper id="CustomerScreen"><CustomerScreen /></LazyLoadWrapper>, allowedRoles: [...admins, ...standardUser] },
  { path: "/reports", element: <LazyLoadWrapper id="Reportscreen"><Reportscreen /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/reports/araging", element: <LazyLoadWrapper id="ArAgingscreen"><ArAgingscreen /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/reports/invoice", element: <LazyLoadWrapper id="Reportsinvoice"><Reportsinvoice /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/settings", element: <LazyLoadWrapper id="SettingScreen"><SettingScreen /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/settings/Role", element: <LazyLoadWrapper id="SettingRoleScreen"><SettingRoleScreen /></LazyLoadWrapper>, allowedRoles: [...superAdmin, ...approver, ...standardUser] },
  { path: "/invoice/list", element: <LazyLoadWrapper id="InvoiceList"><InvoiceList /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/invoice/create", element: <LazyLoadWrapper id="InvoiceCreateScreen"><InvoiceCreateScreen /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/services/list", element: <LazyLoadWrapper id="ServicesList"><ServicesList /></LazyLoadWrapper>, allowedRoles: [...admins] },
  { path: "/service/create", element: <LazyLoadWrapper id="CreateServices"><CreateServices /></LazyLoadWrapper>, allowedRoles: [...admins] },
  { path: "/service/edit/:id", element: <LazyLoadWrapper id="ServiceEditScreen"><ServiceEditScreen onSuccess={function (): void { throw new Error("Function not implemented."); }} /></LazyLoadWrapper>, allowedRoles: [...admins] },
  { path: "/user/list", element: <LazyLoadWrapper id="UserScreen"><UserScreen /></LazyLoadWrapper>, allowedRoles: [...allRoles] },
  { path: "/company", element: <LazyLoadWrapper id="CompanyList"><CompanyList /></LazyLoadWrapper>, allowedRoles: [...superAdmin] },
  { path: "/company/create", element: <LazyLoadWrapper id="CompanyScreen"><CompanyScreen /></LazyLoadWrapper>, allowedRoles: [...superAdmin] },
  { path: "/approver", element: <LazyLoadWrapper id="ApproverDashboardScreen"><ApproverDashboardScreen /></LazyLoadWrapper>, allowedRoles: [...approver] },
  { path: "/standarduser", element: <LazyLoadWrapper id="EnduserDashboardScreen"><EnduserDashboardScreen /></LazyLoadWrapper>, allowedRoles: [...standardUser] },
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

export const invoiceStatusOptions = admins
  ? ["DRAFT", "PAID"]
  : approver
    ? ["PENDING", "APPROVED", "DELETE", "RETURNED"]
    :
    ["DRAFT", "PAID"]
// : ["APPROVED", "DELETE", "RETURNED", "DRAFT", "PENDING", "PAID"];



