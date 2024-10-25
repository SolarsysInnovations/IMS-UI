import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import RoleBasedRoute from "./services/utils/PrivateRoute";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux-store/auth/authSlice";
import { sidebarTwo } from "./constants/data";
import Login from "./pages/Login-screen";
import Unauthorized from "./unauthorized";
import ForgetPassword from "./pages/ForgetPassword-screen";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const token = useSelector(selectCurrentToken);

  const generateRoutes = (menuItems: any) => {
    return menuItems.flatMap(({ path, element, allowedRoles, subItems }: any) => {
      const mainRoute = (
        allowedRoles.length === 0 ?
          <Route key={path} path={path} element={element} /> :
          (
            <Route
              key={path}
              element={<RoleBasedRoute allowedRoles={allowedRoles} />}
            >
              <Route path={path} element={element} />
            </Route>
          )
      );
      const subRoutes = subItems ? generateRoutes(subItems) : [];

      return [mainRoute, ...subRoutes];
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {generateRoutes(sidebarTwo)}
          <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          <Route path="/forgotpassword" element={token ? <Navigate to="/login" /> : <ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
