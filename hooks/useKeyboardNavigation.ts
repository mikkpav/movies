import { useState } from 'react';

export function useKeyboardNavigation(onEnter: () => void, onEscape: () => void, resultsCount: number) {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyHandlers: Record<string, () => void> = {
            Escape: () => {
                onEscape();
            },
            ArrowDown: () => {
                event.preventDefault();
                setSelectedIndex(prev => prev === resultsCount - 1 ? 0 : prev + 1)
            },
            ArrowUp: () => {
                event.preventDefault();
                setSelectedIndex(prev => prev === 0 ? resultsCount - 1 : prev - 1)
            },
            Enter: () => {
                onEnter();
            }
        }

        keyHandlers[event.key]?.();
    };

    return { selectedIndex, setSelectedIndex, handleKeyPress }
}