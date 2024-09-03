import { Roles } from "./Enums";
import { Navigate } from "react-router-dom";
import Reportscreen from "../pages/reports/Reportscreen";
import ArAgingscreen from "../pages/reports/Reports-ar-aging";
import Reportsinvoice from "../pages/reports/Reports-invoice";
import SettingScreen from "../pages/settings/settings";
import CustomerList from "../pages/customer/Customer-list-screen";
import InvoiceList from "../pages/Invoice/Invoice-list-screen";
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
import ServicesList from "../pages/service/service-list-screen";
import SendEmail from "../pages/Invoice/Send-email";

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
      // {
      //   id: 1,
      //   show: false,
      //   title: "Create Services",
      //   path: "/service/create",
      //   element: <ServiceCreate />,
      //   allowedRoles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
      // },
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
  // {
  //   path: '/settings',
  //   element: <SettingScreen />,
  //   allowedRoles: [],
  //   subItems: [
  //     {
  //       path: '/send-email',
  //       element: <SendEmail />,
  //       allowedRoles: [],
  //     },
  //   ],
  // }
 ];

export const invoiceStatusOptions = ["DRAFT", "PENDING", "APPROVED", "RETURNED", "PAID",];


interface UserAccess {
  canCreateCustomers: boolean;
  canViewCustomers: boolean;
  // canViewCustomerList: boolean;
  canEditCustomers: boolean;
  canDeleteCustomers: boolean;
  canCreateInvoices: boolean;
  canViewInvoices: boolean;
  canEditInvoices: boolean;
  canDeleteInvoices: boolean;
  canCreateServices: boolean;
  canViewServices: boolean;
  canEditServices: boolean;
  canDeleteServices: boolean;
  canCreateUsers: boolean;
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canCreateCompanies: boolean;
  canViewCompanies: boolean;
  canEditCompanies: boolean;
  canDeleteCompanies: boolean;
  canCreateSettings: boolean;
  canViewSettings: boolean;
  canEditSettings: boolean;
  canCreateTds: boolean;
  canViewTds: boolean
  canEditTds: boolean;
  canDeleteTds: boolean;
  canCreatePayment: boolean;
  canViewPayment: boolean;
  canEditPayment: boolean;
  canDeletePayment: boolean;
  canCreateGst: boolean;
  canViewGst: boolean;
  canEditGst: boolean;
  canDeleteGst: boolean;
  canCreateService: boolean;
  canViewService: boolean;
  canEditService: boolean;
  canDeleteService: boolean;

}

type ApplicationUserAccess = {
  [key in Roles]: UserAccess;
};

export const applicationUserAccess: ApplicationUserAccess = {
  [Roles.SUPERADMIN]: {
    // customer access
    canCreateCustomers: false,
    canViewCustomers: false,
    canEditCustomers: false,
    canDeleteCustomers: false,
    // invoice access
    canCreateInvoices: false,
    canViewInvoices: false,
    canEditInvoices: false,
    canDeleteInvoices: false,
    // service access
    canCreateServices: false,
    canViewServices: false,
    canEditServices: false,
    canDeleteServices: false,
    // user access
    canCreateUsers: false,
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    // company access
    canCreateCompanies: true,
    canViewCompanies: true,
    canEditCompanies: true,
    canDeleteCompanies: true,
    // settings access
    canCreateSettings: true,
    canViewSettings: true,
    canEditSettings: true,
    //tds access
   canCreateTds: true,
   canViewTds: true,
   canEditTds: true,
   canDeleteTds: true,
    //payment access
    canCreatePayment: true,
    canViewPayment: true,
    canEditPayment: true,
    canDeletePayment: true,
    //gst access
    canCreateGst: true,
    canViewGst: true,
    canEditGst: true,
    canDeleteGst: true,
    //service access
   canCreateService: true,
   canViewService: true,
   canEditService: true,
   canDeleteService: true,

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
     //tds access
   canCreateTds: true,
   canViewTds: true,
   canEditTds: true,
   canDeleteTds: true,
    //payment access
    canCreatePayment: true,
    canViewPayment: true,
    canEditPayment: true,
    canDeletePayment: true,
    //gst access
    canCreateGst: true,
    canViewGst: true,
    canEditGst: true,
    canDeleteGst: true,
    //service access
   canCreateService: true,
   canViewService: true,
   canEditService: true,
   canDeleteService: true,
  },
  [Roles.APPROVER]: {
    // customer access
    canCreateCustomers: false,
    canViewCustomers: true,
    canEditCustomers: false,
    canDeleteCustomers: false,
    // invoice access
    canCreateInvoices: false,
    canViewInvoices: true,
    canEditInvoices: false,
    canDeleteInvoices: false,
    // service access
    canCreateServices: false,
    canViewServices: true,
    canEditServices: false,
    canDeleteServices: false,
    // user access
    canCreateUsers: false,
    canViewUsers: true,
    canEditUsers: false,
    canDeleteUsers: false,
    // company access
    canCreateCompanies: false,
    canViewCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,
    // settings access
    canCreateSettings: true,
    canViewSettings: true,
    canEditSettings: true,
   //tds access
   canCreateTds: true,
   canViewTds: true,
   canEditTds: true,
   canDeleteTds: true,
    //payment access
    canCreatePayment: true,
    canViewPayment: true,
    canEditPayment: true,
    canDeletePayment: true,
    //gst access
    canCreateGst: true,
    canViewGst: true,
    canEditGst: true,
    canDeleteGst: true,
    //service access
   canCreateService: true,
   canViewService: true,
   canEditService: true,
   canDeleteService: true,
  },
  [Roles.STANDARDUSER]: {
    // customer access
    canCreateCustomers: false,
    canViewCustomers: true,
    canEditCustomers: false,
    canDeleteCustomers: false,
    // invoice access
    canCreateInvoices: true,
    canViewInvoices: true,
    canEditInvoices: true,
    canDeleteInvoices: true,
    // service access
    canCreateServices: false,
    canViewServices: true,
    canEditServices: false,
    canDeleteServices: false,
    // user access
    canCreateUsers: false,
    canViewUsers: true,
    canEditUsers: false,
    canDeleteUsers: false,
    // company access
    canCreateCompanies: false,
    canViewCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,
    // settings access
    canCreateSettings: true,
    canViewSettings: true,
    canEditSettings: true,
   //tds access
   canCreateTds: false,
   canViewTds: false,
   canEditTds: true,
   canDeleteTds: true,
    //payment access
    canCreatePayment: false,
    canViewPayment: true,
    canEditPayment: true,
    canDeletePayment: true,
    //gst access
    canCreateGst: false,
    canViewGst: true,
    canEditGst: true,
    canDeleteGst: true,
    //service access
   canCreateService: false,
   canViewService: true,
   canEditService: true,
   canDeleteService: true,
  },
};


console.log(applicationUserAccess[Roles.ADMIN].canCreateCustomers);
