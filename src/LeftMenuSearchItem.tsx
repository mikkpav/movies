import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { SearchMovieItem } from './types/movies';

interface SearchDropdownProps {
    results: SearchMovieItem[];
    onSelect: (movie: SearchMovieItem) => void;
}

export default function LeftMenuSearchItem({results, onSelect }: SearchDropdownProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(true);
    };

    const handleSelect = (item: SearchMovieItem) => {
        onSelect(item);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                className="border p-2 w-full"
                placeholder="Search movies..."
            />
            {isOpen && results.length > 0 && (
                <ul className="absolute bg-white border mt-1 w-full md:w-100 z-10 max-h-80 overflow-auto shadow">
                    {results.map((movie) => (
                        <li
                            key={movie.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
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
