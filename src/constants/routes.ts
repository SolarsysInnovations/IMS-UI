import Dashboard from "../pages/Dashboard-screen";
import ForgetPassword from "../pages/ForgetPassword-screen";
import Login from "../pages/Login-screen";

export const ROUTES: { id: number; path: string; exact: boolean; component: React.ComponentType<any> }[] = [
  {
    id: 1,
    path: "/dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    id: 2,
    path: "/forgetPassword",
    exact: true,
    component: ForgetPassword,
  },
];
