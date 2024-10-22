import { useState } from "react";

export enum StorageKeys {
    TOKEN = "token",
    THEME_PREFERENCE = "theme_preference",
    USER_PREFERENCES = "user_preferences",
    CUSTOMER_EDIT = "customerDetails",
    SERVICE_EDIT = "serviceDetails",
}

type SetValue<T> = (value: T) => void;

export function useSessionStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.sessionStorage.getItem(key);
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
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting value for key ${key}:`, error);
        }
    };

    return [storedValue, setValue];
}
