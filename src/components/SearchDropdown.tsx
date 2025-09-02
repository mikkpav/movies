import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import PosterIcon from '../assets/poster-icon.png';
import { getYearFromDate } from '../utils/formats';

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
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
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
        const keyHandlers: Record<string, () => void> = {
            Escape: () => {
                setIsOpen(false);
            },
            ArrowDown: () => {
                event.preventDefault();
                setSelectedIndex(prev => prev === results.length - 1 ? 0 : prev + 1)
            },
            ArrowUp: () => {
                event.preventDefault();
                setSelectedIndex(prev => prev === 0 ? results.length - 1 : prev - 1)
            },
            Enter: () => {
                if (selectedIndex >= 0) {
                    handleSelect(results[selectedIndex]);
                }
            }
        }

        keyHandlers[event.key]?.();
    };

    return (
        <div className='p-1 relative' ref={dropdownRef}>
            <input
                type="text"
                value={query}
                onFocus={() => setIsOpen(true)}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className='h-11 px-2 border rounded-md w-full'
                placeholder="Search movies..."
            />
            {isOpen && results.length > 0 && (
                <ul className='absolute w-full mt-1 md:w-100 bg-white border z-10 shadow-md rounded-md'>
                    {results.map((item, index) => (
                        <li
                            key={item.id}
                            className={`p-3 hover:bg-gray-100 cursor-pointer overflow-hidden ${index === selectedIndex ? 'bg-gray-100' : ''}`}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onMouseLeave={() => setSelectedIndex(-1)}
                        >
                            <article className='flex h-30 gap-2'>
                                <img src={item.imageUrl ?? PosterIcon} className='object-contain rounded-xl'></img>
                                <div className='flex items-center gap-4'>
                                    <div className='flex flex-col'>
                                        <div className='flex gap-2 justify-between'>
                                            <h1 className='font-list-item-title line-clamp-1'>{item.title}</h1>
                                            {item.date && <p className='font-list-item-title'>{getYearFromDate(item.date)}</p>
                                            }
                                        </div>
                                        <p className='line-clamp-3 font-list-item-content'>{item.subtitle}</p>
                                    </div>
                                    
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}