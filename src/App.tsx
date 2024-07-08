import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import RoleBasedRoute from "./services/utils/PrivateRoute";
import { admins, allRoles, routesConfig } from "./constants/data";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./redux-store/auth/authSlice";

function App() {

  const token = useSelector(selectCurrentToken);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {routesConfig.map(({ path, element, allowedRoles }: any) => {
            if (path === "/login" && token) {
              // Redirect to dashboard if token is present and trying to access login
              return <Route key={path} path={path} element={<Navigate to="/dashboard" />} />;
            }
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
};

export default App;



