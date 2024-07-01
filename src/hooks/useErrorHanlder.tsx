import { useState, useEffect } from 'react';

const useErrorHandler = (error: any) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (error) {
            setErrorMessage("Something went wrong. Please try again.");
        } else {
            setErrorMessage(null);
        }
    }, [error]);

    return errorMessage;
};

export default useErrorHandler;
