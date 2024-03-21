import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme, colors } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import Login from "./pages/Login-screen";
import Dashboard from "./pages/Dashboard-screen";
import ForgetPassword from "./pages/ForgetPassword-screen";
import PrivateRoutes from "./services/utils/PrivateRoute";
import Demo from "./pages/Demo-screen";
import useAuthentication from "./hooks/useAuthentication";
import ComponentsScreen from "./pages/Components-screen";
import CreateClient from "./pages/customer/Customer-create-screen";
import { Edit } from "@mui/icons-material";
import EditClient from "./pages/customer/Customer-edit-screen";
import DemoTwo from "./pages/DemoTwo";
import InvoiceList from "./pages/Invoice/Invoice-list-screen";
import CreateInvoice from "./pages/Invoice/Invoice-create-screen";
import ServicesList from "./pages/service/service-list-screen";
import CreateServices from "./pages/service/create-service-screen";
import EditService from "./pages/service/edit-service-screen";
import CustomerList from "./pages/customer/Customer-list-screen";
import CustomerEdit from "./pages/customer/Customer-edit-screen";
import CustomerCreate from "./pages/customer/Customer-create-screen";


function App() {
  const isAuthenticated = useAuthentication();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Navigate to="/dashboard" replace={true} />} />
              <Route element={<Dashboard />} path="/" />
              // ! customer routes
              <Route element={<CustomerList />} path="/customer-list" />
              <Route element={<CustomerEdit />} path="/customer-list/edit/:id" />
              <Route element={<CustomerCreate />} path="/customer/create" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<DemoTwo />} path="/demo-two" />
              <Route element={<ComponentsScreen />} path="/components" />
              <Route element={<InvoiceList />} path="/invoice/list" />
              <Route element={<CreateInvoice />} path="/invoice/create" />
              <Route element={<ServicesList />} path="/services/list" />
              <Route element={<CreateServices />} path="/service/create" />
              <Route element={<EditService />} path="/service/edit" />
            </Route>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
