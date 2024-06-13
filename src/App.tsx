import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import Login from "./pages/Login-screen";
import Dashboard from "./pages/Dashboard/Dashboard-screen";
import PrivateRoute from "./services/utils/PrivateRoute";
import CustomerList from "./pages/customer/Customer-list-screen";
import CustomerEdit from "./pages/customer/Customer-edit-screen";
import CustomerCreate from "./pages/customer/Customer-create-screen";
import InvoiceList from "./pages/Invoice/Invoice-list-screen";
import CreateInvoice from "./pages/Invoice/Invoice-create-screen";
import ServicesList from "./pages/service/service-list-screen";
import CreateServices from "./pages/service/service-create-screen";
import ServiceEditScreen from "./pages/service/service-edit-screen";
import Reportscreen from "./pages/reports/Reportscreen";
import ArAgingscreen from "./pages/reports/Reports-ar-aging";
import Reportsinvoice from "./pages/reports/Reports-invoice";
import Settingscreen from "./pages/settings/settings";
import RolesList from "./pages/roles/Roles-list-screen";
import RoleBasedRoute from "./services/utils/PrivateRoute";
import Unauthorized from "./unauthorized";

const routesConfig = [
  { path: "/login", element: <Login />, allowedRoles: [] },
  { path: "/unauthorized", element: <Unauthorized />, allowedRoles: [] },
  { path: "/", element: <Navigate to="/dashboard" />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/dashboard", element: <Dashboard />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/reports", element: <Reportscreen />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/reports/araging", element: <ArAgingscreen />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/reports/invoice", element: <Reportsinvoice />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/settings", element: <Settingscreen />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
  { path: "/customer-list", element: <CustomerList />, allowedRoles: ["ADMIN"] },
  { path: "/customer/edit/:id", element: <CustomerEdit />, allowedRoles: ["ADMIN"] },
  { path: "/customer/create", element: <CustomerCreate />, allowedRoles: ["ADMIN"] },
  { path: "/invoice/list", element: <InvoiceList />, allowedRoles: ["ADMIN", "APPROVER"] },
  { path: "/invoice/edit/:id", element: <CreateInvoice />, allowedRoles: ["ADMIN", "APPROVER"] },
  { path: "/invoice/create", element: <CreateInvoice />, allowedRoles: ["ADMIN"] },
  { path: "/services/list", element: <ServicesList />, allowedRoles: ["ADMIN"] },
  { path: "/service/create", element: <CreateServices />, allowedRoles: ["ADMIN"] },
  { path: "/service/edit/:id", element: <ServiceEditScreen />, allowedRoles: ["ADMIN"] },
  { path: "/roles/list", element: <RolesList />, allowedRoles: ["ADMIN", "USER", "APPROVER"] },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {routesConfig.map(({ path, element, allowedRoles }: any) => {
            if (allowedRoles.length === 0) {
              return <Route key={path} path={path} element={element} />;
            } else {
              return (
                <Route
                  key={path}
                  element={<RoleBasedRoute allowedRoles={allowedRoles} />}
                >
                  <Route path={path} element={element} />
                </Route>
              );
            }
          })}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;




// 

