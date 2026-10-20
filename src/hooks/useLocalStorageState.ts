import { useEffect, useState } from 'react';

export function useLocalStorageState<T>(
    key: string,
    initialValue: T | (() => T)
) {
    const [state, setState] = useState<T>(() => {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return initialValue instanceof Function ? initialValue() : initialValue;
        }

        try {
            return JSON.parse(raw) as T;
        } catch {
            return initialValue instanceof Function ? initialValue() : initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
}
