import { createContext, useContext } from 'react';
import { useFavorites } from './useFavorites';

const FavoritesContext = createContext<ReturnType<typeof useFavorites> | null> (null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const value = useFavorites();
    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavoritesContext() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error('useFavoritesContext must be used within FavoritesProvider');
    return context;
}