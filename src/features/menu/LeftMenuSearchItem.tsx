import { useState } from 'react';
import SearchDropdown, { type DropdownItem } from '../../components/SearchDropdown';
import type { Movie } from '../../types/movies';
import useSearch from './hooks/useSearch';

interface SearchDropdownProps {
    onSelect: (movieId: number) => void;
}

export default function LeftMenuSearchItem({ onSelect }: SearchDropdownProps) {
    const [query, setQuery] = useState('');
    const { searchResults } = useSearch(query);

    const mapMovieItemToDropdownItem = (movieItem: Movie): DropdownItem => {
        return {
            id: movieItem.id,
            title: movieItem.title,
            subtitle: movieItem.overview,
            rating: movieItem.voteAverage,
            date: movieItem.releaseDate,
            imageUrl: movieItem.posterPathSmall
        }
    }

    return <SearchDropdown 
                query={query} 
                results={searchResults.map(mapMovieItemToDropdownItem)}
                onQueryChange={setQuery}
                onSelect={onSelect}
            />;
}
