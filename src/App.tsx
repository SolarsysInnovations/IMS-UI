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
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<ComponentsScreen />} path="/components" />
            </Route>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
