import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import RoleBasedRoute from "./services/utils/PrivateRoute";
import { admins, allRoles, routesConfig } from "./constants/data";

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



