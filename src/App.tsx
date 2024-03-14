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
import ClientList from "./pages/client/Clients-List";
import CreateClient from "./pages/client/Create-client";
import { Edit } from "@mui/icons-material";
import EditClient from "./pages/client/Edit-client";
import DemoTwo from "./pages/DemoTwo";
import InvoiceList from "./pages/Invoice/Invoice-list";
import CreateInvoice from "./pages/Invoice/create-invoice";
import ServicesList from "./pages/service/service-list-screen";
import CreateServices from "./pages/service/create-service-screen";
import EditService from "./pages/service/edit-service-screen";


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
              <Route element={<ClientList />} path="/client-list" />
              <Route element={<EditClient />} path="/client-list/edit/:id" />
              <Route element={<CreateClient />} path="/client/create" />
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
