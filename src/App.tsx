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
import { Roles } from "./constants/Enums";
import { admins, allRoles } from "./constants/data";



const routesConfig = [

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
  { path: "/settings", element: <Settingscreen />, allowedRoles: [...allRoles] },

  // * ----------- customer ------------
  { path: "/customer-list", element: <CustomerList />, allowedRoles: [...allRoles] },
  { path: "/customer/edit/:id", element: <CustomerEdit />, allowedRoles: [...allRoles] },
  { path: "/customer/create", element: <CustomerCreate />, allowedRoles: [...allRoles] },

  // * ----------- invoice ------------
  { path: "/invoice/list", element: <InvoiceList />, allowedRoles: [...allRoles] },
  { path: "/invoice/edit/:id", element: <CreateInvoice />, allowedRoles: [...allRoles] },
  { path: "/invoice/create", element: <CreateInvoice />, allowedRoles: [...allRoles] },

  // * --------- service -----------
  { path: "/services/list", element: <ServicesList />, allowedRoles: [...admins] },
  { path: "/service/create", element: <CreateServices />, allowedRoles: [...admins] },
  { path: "/service/edit/:id", element: <ServiceEditScreen />, allowedRoles: [...admins] },

  // * -------- roles ---------
  { path: "/roles/list", element: <RolesList />, allowedRoles: [...admins] },
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

