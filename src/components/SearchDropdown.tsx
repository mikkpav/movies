import { useState, useEffect, useRef, type ChangeEvent } from 'react';

export type DropdownItem = {
    id: number,
    title: string
}

type SearchDropdownProps = {
    query: string,
    results: DropdownItem[],
    onQueryChange: (q: string) => void,
    onSelect: (item: DropdownItem) => void;
}

export default function SearchDropdown({ query, results, onQueryChange, onSelect }: SearchDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const handleChange = (e: ChangeEvent <HTMLInputElement>) => {
        onQueryChange(e.target.value);
        setIsOpen(true);
    };

    const handleSelect = (item: DropdownItem) => {
        onSelect(item);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="p-1 relative" ref={dropdownRef}>
            <input
                type="text"
                value={query}
                onFocus={() => setIsOpen(true)}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="h-12 px-2 border rounded-md w-full"
                placeholder="Search movies..."
            />
            {isOpen && results.length > 0 && (
                <ul className="absolute bg-white border mt-1 w-full md:w-100 z-10 max-h-80 overflow-auto shadow rounded-md">
                    {results.map((movie) => (
                        <li
                            key={movie.id}
                            className="h-12 p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(movie)}
                        >
                            {movie.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}