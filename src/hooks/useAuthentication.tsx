import { useState, useEffect } from 'react';

const useAuthentication = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            setAuthenticated(!!token);
        };

        window.addEventListener('storage', checkAuthentication);

        // Cleanup
        return () => {
            window.removeEventListener('storage', checkAuthentication);
        };
    }, []);

    return authenticated;
};

export default useAuthentication;
