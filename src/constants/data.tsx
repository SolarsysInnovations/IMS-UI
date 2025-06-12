import { Roles } from './Enums';

interface UserAccess {
  canCreateCustomers: boolean;
  canViewCustomers: boolean;
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
  canViewTds: boolean;
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
  [Roles.GUEST]: {
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
    canCreateCompanies: false,
    canViewCompanies: false,
    canEditCompanies: false,
    canDeleteCompanies: false,
    // settings access
    canCreateSettings: false,
    canViewSettings: false,
    canEditSettings: false,
    //tds access
    canCreateTds: false,
    canViewTds: false,
    canEditTds: false,
    canDeleteTds: false,
    //payment access
    canCreatePayment: false,
    canViewPayment: false,
    canEditPayment: false,
    canDeletePayment: false,
    //gst access
    canCreateGst: false,
    canViewGst: false,
    canEditGst: false,
    canDeleteGst: false,
    //service access
    canCreateService: false,
    canViewService: false,
    canEditService: false,
    canDeleteService: false,
  },
};

export const ACCESS_TOKEN = 'accessToken';
