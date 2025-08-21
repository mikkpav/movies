import { useParams } from 'react-router-dom';
import MovieDetailsContainer from '../containers/MovieDetailsContainer';

export default function MovieDetailsPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Invalid movie ID: {id}</p>
    
    return (
        <MovieDetailsContainer id={id} />
    );
}