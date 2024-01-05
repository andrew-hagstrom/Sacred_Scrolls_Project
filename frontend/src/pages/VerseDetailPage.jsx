
import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { BhagavadGitaDetails } from '../components/BhagavadGitaDetails';

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
    const { book, chapter, verse } = useParams();
    const [showChapterModal, setShowChapterModal] = useState(false);

    const openChapterModal = () => {
        setShowChapterModal(true);
      };

    return (
        <Container>
            <h2>Verse Details Page</h2>
            <h3>{`Book: ${book}, Chapter: ${chapter}, Verse: ${verse}`}</h3>

            {/* Include the BhagavadGitaDetails component to render verse details */}
            <BhagavadGitaDetails book={book} chapter={chapter} verse={verse} />
        </Container>
    );
}

export default VerseDetailPage;