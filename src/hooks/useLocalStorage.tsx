import { useState } from "react";


export enum LocalStorageKeys {
    TOKEN = "token",
    THEME_PREFERENCE = "theme_preference",
    USER_PREFERENCES = "user_preferences",
    CUSTOMER_EDIT = "customerDetails",
    SERVICE_EDIT = "serviceDetails",
}




type SetValue<T> = (value: T) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error parsing JSON for key ${key}:`, error);
            return initialValue;
        }
    });

    const setValue: SetValue<T> = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting value for key ${key}:`, error);
        }
    };

    return [storedValue, setValue];
}