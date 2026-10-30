import localforage from 'localforage';
import { useEffect, useState } from 'react';

export function useLocalForageState<T>(
    key: string,
    initialValue: T | (() => T)
) {
    const [state, setState] = useState<T>(initialValue);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        let ignore = false;
        localforage.getItem<T>(key)
            .catch(() => null)
            .then(saved => {
                if (ignore) return;
                if (saved !== null) setState(saved);
                setLoaded(true);
            });
            return () => {
                ignore = true;
            };
    }, [key]);

    useEffect(() => {
        if (loaded) {
            localforage.setItem(key, state).catch(console.error);
        }
    }, [key, state, loaded]);
    return [state, setState, loaded] as const;
}
