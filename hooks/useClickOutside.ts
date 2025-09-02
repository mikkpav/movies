import { useEffect } from 'react';

export function useClickOutside(action: () => void, ref: React.RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                action();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [action, ref]);
}