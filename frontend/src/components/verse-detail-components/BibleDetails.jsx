import { useState, useEffect } from 'react';

import { api } from '../../utilities/ApiUtilities';
import { BibleChapterModal } from './BibleChapterModal';
import { checkIfOldTestament, bibleBookIdAndTestament, getOriginalBookNameAndTranslation } from '../../utilities/BibleBookUtilities';
import { PassageCard } from '../PassageCard';

import Button from 'react-bootstrap/Button'


export const BibleDetails = ({ book, chapter, verse }) => {

    /* This page is mostly a straightforward api call. There is some conditional logic related to whether the book in question is from the old or new testement. This logic takes place here:
    
    *BibleBookUtilities.js
    
    */
    const [selectedLanguage, setSelectedLanguage] = useState('eng');
    const [englishText, setEnglishText] = useState('');
    const [originalText, setOriginalText] = useState('');
    const [originalBookName, setOriginalBookName] = useState('');
    const [showChapterModal, setShowChapterModal] = useState(false);
    const formattedBook = book.toLowerCase().replace(/\s+/g, '');
    const bookId = bibleBookIdAndTestament[formattedBook] ? bibleBookIdAndTestament[formattedBook][0] : 'unknown';
    
  

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
            setEnglishText(englishData);

            const originalLanguage = checkIfOldTestament(book) ? 'heb' : 'grk';
            const originalData = await fetchVerse(bookId, chapter, verse, originalLanguage);
            const bookName = getOriginalBookNameAndTranslation(book)
            setOriginalBookName(bookName)            
            setOriginalText(originalData);
            
        } catch (error) {
            console.log('Error fetching Bible verse text:', error);
        }
    };

    const toggleChapterModal = (language) => {
        setSelectedLanguage(language);
        setShowChapterModal(!showChapterModal);
    };

    useEffect(() => {
        fetchVerseText();
    }, [book, chapter, verse]);

    

    const reference = `${book} ${chapter}:${verse}`;
    const originalReference = `${originalBookName} ${chapter}:${verse}`;

    return (
        <>
            <div className="detail-card-container">
            <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal(checkIfOldTestament(book) ? 'heb' : 'grk')}>See Chapter</Button>           
            <PassageCard
                cardTitle={`Bible (${checkIfOldTestament(book) ? 'Hebrew' : 'Greek'})`}
                sourceText={originalText}
                sourceReference={originalReference}
                additionalReferences={[]}
            />
            </div>
            <div className="detail-card-container">
            <Button className='see-chapter' size='sm' variant="secondary" onClick={() => toggleChapterModal('eng')}>See Chapter</Button>   
            <PassageCard
                cardTitle="Bible (English)"
                sourceText={englishText}
                sourceReference={reference}
                additionalReferences={[]}
            />
            </div>
            {showChapterModal && (
            <BibleChapterModal
                book={book}
                chapter={chapter}
                selectedLanguage={selectedLanguage}
                isOpen={showChapterModal}
                onRequestClose={() => setShowChapterModal(false)}
            />
            )}
        </>
    );
};












