import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    const { id } = useParams();

    return(
        <p>Movie with ID: {id}</p>
    );
}