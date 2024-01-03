
import { useParams } from 'react-router-dom'
import { checkIfOldTestament, bibleBookIdAndTestament } from '../utilities/BibleBookUtilities';
import { BhagavadGitaDetails } from '../components/BhagavadGitaDetails';
import { QuranDetails } from '../components/QuranDetails';
import { BibleDetails } from '../components/BibleDetails';

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
    const { book, chapter, verse } = useParams();


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

    return (
        <Container>
            <h2>Verse Details Page</h2>
            {renderDetailsComponent()}
        </Container>
    );
}

export default VerseDetailPage;