import { useState } from 'react';

// documentation for useLocalStorage
// custom hook called with a key a initialValue pair

export const useLocalStorage = (key, initialValue) => {
    if (typeof key !== 'string') {
        throw new Error(
            'Invalid parameters: useLocalStorage should receive a string for the first argument'
        )
    }

// Initialization of storage:
// if the key exists in local storage, initializes state to local storage
// else adds key to local storage and initializes state to the param initialValue

    const [storedValue, setStoredValue] = useState(() => {
        if (localStorage.getItem(key)) {
            return JSON.parse(window.localStorage.getItem(key));
        } else {
            window.localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });

// Update of storage:
// updates state and local storage simultaneously

    const setValue = value => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    };

// Custom hook returns an array with a value and function for altering the value

return [storedValue, setValue]
}