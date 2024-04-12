import { useState } from "react";


export enum LocalStorageKeys {
    TOKEN = "token",
    THEME_PREFERENCE = "theme_preference",
    USER_PREFERENCES = "user_preferences",
    CUSTOMER_EDIT = "customerDetails",
}

export const useLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    let initial;
    try {
        initial = storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
        console.error(`Error parsing JSON for key ${key}:`, error);
        initial = initialValue;
    }
    const [value, setValue] = useState(initial);

    const updateValue = (newValue: any) => {
        if (typeof newValue === 'object') {
            localStorage.setItem(key, JSON.stringify({ ...newValue }));
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
        setValue(newValue);
    };

    return [value, updateValue];
};

