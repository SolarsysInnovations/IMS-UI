import { useState } from "react";


export enum LocalStorageKeys {
    TOKEN = "token",
    THEME_PREFERENCE = "theme_preference",
    USER_PREFERENCES = "user_preferences",
}



export const useLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    const [value, setValue] = useState(initial);

    const updateValue = (newValue: any) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, updateValue];
}


