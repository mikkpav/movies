import { useState, useRef, type ChangeEvent } from 'react';
import SearchDropdownItem from './SearchDropDownItem';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useClickOutside } from '../../hooks/useClickOutside';

export type DropdownItem = {
    id: number,
    title: string,
    subtitle: string,
    rating: number,
    date: string,
    imageUrl: string,
}

type SearchDropdownProps = {
    query: string,
    results: DropdownItem[],
    onQueryChange: (q: string) => void,
    onSelect: (itemId: number) => void;
}

export default function SearchDropdown({ query, results, onQueryChange, onSelect }: SearchDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { selectedIndex, setSelectedIndex, handleKeyPress} = useKeyboardNavigation(
                                                                    handleEnter, 
                                                                    handleEscape, 
                                                                    results.length
                                                                );
    useClickOutside(tapOutsideSearchDropdown, dropdownRef);

    function tapOutsideSearchDropdown() {
        setIsOpen(false);
    }
    
    const handleChange = (e: ChangeEvent <HTMLInputElement>) => {
        onQueryChange(e.target.value);
        setIsOpen(true);
        setSelectedIndex(-1);
    };

    const handleSelect = (item: DropdownItem) => {
        onQueryChange('');
        onSelect(item.id);
        setIsOpen(false);
    };

    function handleEnter() {
        if (selectedIndex >= 0) {
            handleSelect(results[selectedIndex]);
        }
    }

    function handleEscape() {
        setIsOpen(false);
    }

    return (
        <div className='p-1 relative' ref={dropdownRef}>
            <input
                type="text"
                value={query}
                onFocus={() => setIsOpen(true)}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className='h-11 px-2 border rounded-md w-full'
                placeholder='Search movies...'
            />
            {isOpen && results.length > 0 && (
                <ul className='absolute w-full mt-1 md:w-100 bg-white border z-10 shadow-md rounded-md'>
                    {results.map((item, index) => (
                        <SearchDropdownItem 
                            item={item} 
                            itemIndex={index} 
                            selectedIndex={selectedIndex}
                            onSelect={handleSelect}
                            onMouseHover={setSelectedIndex}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}