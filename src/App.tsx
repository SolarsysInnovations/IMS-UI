import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTheme } from "@mui/material";
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
import InvoiceEditScreen from "./pages/Invoice/Invoice-edit-screen";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux-store/auth/authSlice";
import DemoInvoice from "./pages/Invoice/Demo-Invocie";

function App() {
  const token = useSelector(selectCurrentToken);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>

            <Route element={<PrivateRoutes />}>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="/" element={<Dashboard />} />
              {/* Customer routes */}
              <Route path="/customer-list" element={<CustomerList />} />
              <Route path="/customer/edit/:id" element={<CustomerEdit />} />
              <Route path="/customer/create" element={<CustomerCreate />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/demo-two" element={<DemoTwo />} />
              <Route path="/demo-invoice" element={<DemoInvoice />} />
              <Route path="/components" element={<ComponentsScreen />} />
              <Route path="/invoice/list" element={<InvoiceList />} />
              <Route path="/invoice/edit/:id" element={<InvoiceEditScreen />} />
              <Route path="/invoice/create" element={<CreateInvoice />} />
              <Route path="/services/list" element={<ServicesList />} />
              <Route path="/service/create" element={<CreateServices />} />
              <Route path="/service/edit" element={<EditService />} />
            </Route>
            <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
