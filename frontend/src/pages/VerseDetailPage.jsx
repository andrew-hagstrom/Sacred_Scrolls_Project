
<<<<<<< Updated upstream
import { useParams } from 'react-router-dom'
import { checkIfOldTestament, bibleBookIdAndTestament } from '../utilities/BibleBookUtilities';
import { BhagavadGitaDetails } from '../components/verse-detail-components/BhagavadGitaDetails';
import { QuranDetails } from '../components/verse-detail-components/QuranDetails';
import { BibleDetails } from '../components/verse-detail-components/BibleDetails';
=======
import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { BhagavadGitaDetails } from '../components/BhagavadGitaDetails';
>>>>>>> Stashed changes

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
    const { book, chapter, verse } = useParams();
<<<<<<< Updated upstream


    const renderDetailsComponent = () => {
        if (book === 'bhagavadgita') {
            return <BhagavadGitaDetails book={book} chapter={chapter} verse={verse} />;
        } else if (book === 'quran') {
            return <QuranDetails book={book} chapter={chapter} verse={verse} />;
        } else if (bibleBookIdAndTestament[book]) {
            return <BibleDetails book={book} chapter={chapter} verse={verse} />;
        } else {
            return <div>Book not found</div>;
        }
    };
=======
    const [showChapterModal, setShowChapterModal] = useState(false);

    const openChapterModal = () => {
        setShowChapterModal(true);
      };
>>>>>>> Stashed changes

    return (
        <Container>
            <h2>Verse Details Page</h2>
<<<<<<< Updated upstream
            {renderDetailsComponent()}
=======
            <h3>{`Book: ${book}, Chapter: ${chapter}, Verse: ${verse}`}</h3>

            {/* Include the BhagavadGitaDetails component to render verse details */}
            <BhagavadGitaDetails book={book} chapter={chapter} verse={verse} />
>>>>>>> Stashed changes
        </Container>
    );
}

export default VerseDetailPage;