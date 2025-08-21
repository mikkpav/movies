import type { MovieDetails } from '../../../types/movies'

type MovieDetailsProps = {
    details: MovieDetails
};

export default function MovieDetails({ details }: MovieDetailsProps) {
    return (
        <p>{details.title}</p>
    );
}