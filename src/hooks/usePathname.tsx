import { useLocation } from 'react-router-dom';

function usePathname() {
    const location = useLocation();
    const pathnameWithSpaces = location.pathname.replace('/', '').replace(/-/g, ' ');
    return pathnameWithSpaces.charAt(0).toUpperCase() + pathnameWithSpaces.slice(1);
}

export default usePathname;
