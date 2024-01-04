import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../utilities/ApiUtilities';
import { checkIfOldTestament, bibleBookIdAndTestament } from '../../utilities/BibleBookUtilities';

export const BibleChapterModal = ({ book, chapter, isOpen, onRequestClose, selectedLanguage }) => {
    const [chapterText, setChapterText] = useState('');
    const bookId = bibleBookIdAndTestament[book] ? bibleBookIdAndTestament[book][0] : 'unknown';

    const fetchChapter = async (bookId, chapter, selectedLanguage) => {
        try {
            const response = await api.get(`Bible/${selectedLanguage}/${bookId}/chapter/${chapter}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${selectedLanguage} Bible chapter:`, error);
            throw error;
        }
    };

    const fetchChapterText = async () => {
        try {
            const data = await fetchChapter(bookId, chapter, selectedLanguage);
            setChapterText(data); // Fetches and sets the text for the selected language
        } catch (error) {
            console.log('Error fetching Bible chapter text:', error);
        }
    };

    useEffect(() => {
        fetchChapterText();
    }, [book, chapter, selectedLanguage]);

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`Chapter ${chapter} of ${book}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{selectedLanguage === 'eng' ? 'English' : (checkIfOldTestament(book) ? 'Hebrew' : 'Greek')}</h5>
                <p>{chapterText}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};