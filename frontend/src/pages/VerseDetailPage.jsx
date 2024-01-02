
import { useParams } from 'react-router-dom'

import { BhagavadGitaDetails } from '../components/BhagavadGitaDetails';

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
    const { book, chapter, verse } = useParams();

    return (
        <Container>
            <h2>Verse Details Page</h2>
            <h3>{`Book: ${book}, Chapter: ${chapter}, Verse: ${verse}`}</h3>

            {/* Include the BhagavadGitaDetails component to render verse details */}
            <BhagavadGitaDetails book={book} chapter={chapter} verse={verse} />
            
            {/* Button to open modal for reading entire chapter */}
        </Container>
    );
}

export default VerseDetailPage;