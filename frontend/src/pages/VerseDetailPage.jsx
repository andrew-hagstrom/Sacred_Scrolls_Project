import { useParams } from 'react-router-dom'
import { checkIfOldTestament, bibleBookIdAndTestament } from '../utilities/BibleBookUtilities';
import { BhagavadGitaDetails } from '../components/verse-detail-components/BhagavadGitaDetails';
import { QuranDetails } from '../components/verse-detail-components/QuranDetails';
import { BibleDetails } from '../components/verse-detail-components/BibleDetails';

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
 /* This page is really the result of 

 *PassageCard.jsx

 *BhagavadGitaDetails.jsx
 *BhagavadGitaChapterModal.jsx 
 
 *BibleDetails.jsx
 *BibleChapterModal.jsx
 
 *QuranDetails.jsx
 *QuranChapterModal.jsx
 
 */

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
            <h1 style={{display:'grid', textAlign:'center'}}>Verse Details</h1>
            <div>
            {renderDetailsComponent()}
            </div>
        </Container>
    );
}

export default VerseDetailPage;