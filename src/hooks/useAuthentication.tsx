import { useState, useEffect } from 'react';

const useAuthentication = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Token doesn't exist, logout the user
                setAuthenticated(false);
                return;
            }
            // Parse token to get expiration time
            const tokenData = parseJwt(token);
            const currentTime = Math.floor(Date.now() / 1000);

            if (tokenData.exp && currentTime >= tokenData.exp) {
                // Token is expired, logout the user
                localStorage.removeItem('token');
                setAuthenticated(false);
                // You may want to clear other user-related data from local storage here
            } else {
                // Token is still valid
                setAuthenticated(true);
            }
        };

        const parseJwt = (token: any) => {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return {};
            }
        };

        // Initial check
        checkAuthentication();

        // Listen for changes in local storage (e.g., token updates)
        window.addEventListener('storage', checkAuthentication);

        // Cleanup
        return () => {
            window.removeEventListener('storage', checkAuthentication);
        };
    }, []);

    return authenticated;
};

export default useAuthentication;
