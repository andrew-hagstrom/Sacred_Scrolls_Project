import { useState, useEffect } from 'react';

import { api } from '../utilities/ApiUtilities';
import { BibleChapterModal } from './BibleChapterModal';
import { checkIfOldTestament, bibleBookIdAndTestament } from '../utilities/BibleBookUtilities';
import { PassageCard } from './PassageCard';


export const BibleDetails = ({ book, chapter, verse }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('eng');
    const [englishText, setEnglishText] = useState('');
    const [originalText, setOriginalText] = useState('');
    const [showChapterModal, setShowChapterModal] = useState(false);
    const formattedBook = book.toLowerCase().replace(/\s+/g, '');
    const bookId = bibleBookIdAndTestament[formattedBook] ? bibleBookIdAndTestament[formattedBook][0] : 'unknown';
    const reference = `${book} ${chapter}:${verse}`;
    console.log('something')

    const fetchVerse = async (bookId, chapter, verse, language) => {
        try {
            const response = await api.get(`Bible/${language}/${bookId}/chapter/${chapter}/verse/${verse}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${language} Bible verse:`, error);
            throw error;
        }
    };

    const fetchVerseText = async () => {
        try {
            const englishData = await fetchVerse(bookId, chapter, verse, 'eng');
            setEnglishText(englishData.text);

            const originalLanguage = checkIfOldTestament(book) ? 'heb' : 'grk';
            const originalData = await fetchVerse(bookId, chapter, verse, originalLanguage);
            setOriginalText(originalData.text);
        } catch (error) {
            console.log('Error fetching Bible verse text:', error);
        }
    };

    const toggleChapterModal = (language) => {
        setSelectedLanguage(language);
        setShowChapterModal(!showChapterModal);
    };

    useEffect(() => {
        console.log('something')
        fetchVerseText();
    }, [book, chapter, verse]);

    return (
        <>
            <PassageCard
                cardTitle="Bible (English)"
                sourceText={englishText}
                sourceReference={reference}
                additionalReferences={[]}
            />
            <PassageCard
                cardTitle={`Bible (${checkIfOldTestament(book) ? 'Hebrew' : 'Greek'})`}
                sourceText={originalText}
                sourceReference={reference}
                additionalReferences={[]}
            />
            {showChapterModal && (
            <BibleChapterModal
                book={book}
                chapter={chapter}
                language={selectedLanguage}
                isOpen={showChapterModal}
                onRequestClose={() => setShowChapterModal(false)}
            />
            )}
        </>
    );
};
