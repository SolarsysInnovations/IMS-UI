import React, { useEffect }from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import RoleBasedRoute from "./services/utils/PrivateRoute";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentId,
} from "./redux-store/auth/authSlice";
import { sidebarTwo } from "./constants/data";
import Login from "./pages/Login-screen";
import Unauthorized from "./unauthorized";
import ForgetPassword from "./pages/ForgetPassword-screen";
import ResetPassword from "./pages/ResetPassword";
import { useGetUserRoleMutation } from "./redux-store/api/injectedApis";
import {
  InvoiceContextProvider,
  useInVoiceContext,
} from "./invoiceContext/invoiceContext";

function App() {
  const context = useInVoiceContext();
  const token = useSelector(selectCurrentToken);
  const id = useSelector(selectCurrentId);
  const [getUserRole] = useGetUserRoleMutation();

  const generateRoutes = (menuItems: any) => {
    return menuItems.flatMap(
      ({ path, element, allowedRoles, subItems }: any) => {
        const mainRoute =
          allowedRoles.length === 0 ? (
            <Route key={path} path={path} element={element} />
          ) : (
            <Route
              key={path}
              element={<RoleBasedRoute allowedRoles={allowedRoles} />}
            >
              <Route path={path} element={element} />
            </Route>
          );
        const subRoutes = subItems ? generateRoutes(subItems) : [];

        return [mainRoute, ...subRoutes];
      }
    );
  };

  useEffect(() => {
    if (id) {
      getUserRole(id)
        .unwrap()
        .then((response) => {
          context.userDetails.userId = id;
          context.userDetails.userRole = response.userRole;
          context.userDetails.userName = response.userName;
          context.userDetails.userEmail = response.userEmail;
          context.userDetails.userMobile = response.userMobile;
          context.userDetails.description = response.description;
          context.companyDetails.companyId = response.companyId;
        })
        .catch((error) => {
          console.error("Error fetching user role:", error);
        });
    }
  }, [id, getUserRole, context]);

  return (
    <InvoiceContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {generateRoutes(sidebarTwo)}
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="*"
              element={<Navigate to={token ? "/dashboard" : "/login"} />}
            />
            <Route
              path="/forgotpassword"
              element={token ? <Navigate to="/login" /> : <ForgetPassword />}
            />
            <Route
              path="/resetpassword"
              element={token ? <Navigate to="/login" /> : <ResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </InvoiceContextProvider>
  );
}

export default App;
