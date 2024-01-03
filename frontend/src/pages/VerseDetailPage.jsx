
import { useParams } from 'react-router-dom'

import { BhagavadGitaDetails } from '../components/BhagavadGitaDetails';
import { QuranDetails } from '../components/QuranDetails';

import Container from 'react-bootstrap/Container';

function VerseDetailPage() {
    const { book, chapter, verse } = useParams();

    const renderDetailsComponent = () => {
        switch (book) {
            case 'bhagavadgita':
                return <BhagavadGitaDetails chapter={chapter} verse={verse} />;
            case 'quran':
                return <QuranDetails chapter={chapter} verse={verse} />;
            default:
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