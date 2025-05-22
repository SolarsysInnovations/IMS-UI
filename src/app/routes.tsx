import { createBrowserRouter } from 'react-router-dom';
import { Roles } from '../constants/Enums';
import Login from '../pages/Login-screen';
import Unauthorized from '../unauthorized';
import ProtectedRoutes from '../components/ProtectedRoutes';
import DashboardScreen from '../pages/Dashboard';
import ForgetPassword from '../pages/ForgetPassword-screen';
import ResetPassword from '../pages/ResetPassword';
import CustomerList from '../pages/customer/Customer-list-screen';
import CustomerScreen from '../pages/customer/Customer-screen';
import InvoiceList from '../pages/Invoice/Invoice-list-screen';
import InvoiceCreateScreen from '../pages/Invoice/Invoice-create-screen';
import ServicesList from '../pages/service/service-list-screen';
import Reportscreen from '../pages/reports/Reportscreen';
import ArAgingscreen from '../pages/reports/Reports-ar-aging';
import Reportsinvoice from '../pages/reports/Reports-invoice';
import UserScreen from '../pages/company-users/UserScreen';
import CompanyList from '../pages/super-admin-company/companyListScreen';
import CompanyScreen from '../pages/super-admin-company/companyScreen';
import SettingScreen from '../pages/settings/settings';
import SettingRoleScreen from '../pages/settings/settings-role';
import InvoiceLayout from '../components/layouts/InvoiceLayout';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/forgotpassword', element: <ForgetPassword /> },
  { path: '/resetpassword', element: <ResetPassword /> },
  {
    element: <InvoiceLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoutes
            requiredRole={[
              Roles.ADMIN,
              Roles.APPROVER,
              Roles.STANDARDUSER,
              Roles.SUPERADMIN,
            ]}
          >
            <DashboardScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/customer',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <CustomerList />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/customer/create',
        element: (
          <ProtectedRoutes requiredRole={[Roles.ADMIN, Roles.APPROVER]}>
            <CustomerScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/customer/edit',
        element: (
          <ProtectedRoutes requiredRole={[Roles.ADMIN, Roles.APPROVER]}>
            <CustomerScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/invoice',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <InvoiceList />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/invoice/create',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <InvoiceCreateScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/services',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <ServicesList />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/reports',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <Reportscreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/reports/araging',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <ArAgingscreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/reports/invoice',
        element: (
          <ProtectedRoutes
            requiredRole={[Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER]}
          >
            <Reportsinvoice />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/user',
        element: (
          <ProtectedRoutes requiredRole={[Roles.ADMIN, Roles.APPROVER]}>
            <UserScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/company',
        element: (
          <ProtectedRoutes requiredRole={[Roles.SUPERADMIN]}>
            <CompanyList />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/company/create',
        element: (
          <ProtectedRoutes requiredRole={[Roles.SUPERADMIN]}>
            <CompanyScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/company/edit',
        element: (
          <ProtectedRoutes requiredRole={[Roles.SUPERADMIN]}>
            <CompanyScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoutes
            requiredRole={[
              Roles.ADMIN,
              Roles.APPROVER,
              Roles.STANDARDUSER,
              Roles.SUPERADMIN,
            ]}
          >
            <SettingScreen />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/settings/role',
        element: (
          <ProtectedRoutes
            requiredRole={[
              Roles.ADMIN,
              Roles.APPROVER,
              Roles.STANDARDUSER,
              Roles.SUPERADMIN,
            ]}
          >
            <SettingRoleScreen />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export { router };
