import { ReactNode, useState } from 'react';
import { Roles } from '../../../constants/Enums';
import {
  Building2,
  CircleUserRound,
  Home,
  Menu,
  ReceiptIcon,
  ReceiptText,
  Settings,
  UsersRound,
  Wrench,
} from 'lucide-react';
import { useInVoiceContext } from '../../../context/invoiceContext';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header';
import logo from '../../../assets/solarsys_innovations_private_ltd_logo.jpeg';
import './InvoiceLayout.css';

type NavItem = {
  id: number;
  label: string;
  icon?: ReactNode;
  path: string;
  roles: Roles[];
};

const navItems: NavItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: <Home size={18} />,
    path: '/dashboard',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER, Roles.SUPERADMIN],
  },
  {
    id: 2,
    label: 'Customer',
    icon: <CircleUserRound size={18} />,
    path: '/customer',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 3,
    label: 'Invoice',
    icon: <ReceiptIcon size={18} />,
    path: '/invoice',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 4,
    label: 'Services',
    icon: <Wrench size={18} />,
    path: '/services',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 5,
    label: 'Reports',
    icon: <ReceiptText size={18} />,
    path: '/reports',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER],
  },
  {
    id: 6,
    label: 'Users',
    icon: <UsersRound size={18} />,
    path: '/user',
    roles: [Roles.ADMIN, Roles.APPROVER],
  },
  {
    id: 7,
    label: 'Company',
    icon: <Building2 size={18} />,
    path: '/company',
    roles: [Roles.SUPERADMIN],
  },
  {
    id: 8,
    label: 'Settings',
    icon: <Settings size={18} />,
    path: '/settings',
    roles: [Roles.ADMIN, Roles.APPROVER, Roles.STANDARDUSER, Roles.SUPERADMIN],
  },
];

const InvoiceLayout = () => {
  const context = useInVoiceContext();
  const userrole = context.userDetails.userRole;
  const [collasped, setCollasped] = useState(false);
  const filterNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(userrole),
  );
  return (
    <div className={`layout ${collasped ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-top">
          {!collasped && (
            <div className="sidebar-brand">
              <img src={logo} alt="company logo" className="logo" />
              <span className="logo-text">Solarsys</span>
            </div>
          )}
          <button
            className="collapse-btn"
            onClick={() => setCollasped(!collasped)}
          >
            <Menu size={18} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {filterNavItems.map((item) => (
            <div key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
              >
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                {!collasped && item.label}
              </NavLink>
            </div>
          ))}
        </nav>
      </aside>
      <div className="main">
        <header className="header">
          <Header />
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InvoiceLayout;
