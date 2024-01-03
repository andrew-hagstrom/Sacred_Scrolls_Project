import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../utilities/ApiUtilities';
import { checkIfOldTestament, bibleBookIdAndTestament } from '../utilities/BibleBookUtilities';

export const BibleChapterModal = ({ book, chapter, isOpen, onRequestClose }) => {
    const [englishChapterText, setEnglishChapterText] = useState('');
    const [originalChapterText, setOriginalChapterText] = useState('');
    const bookId = bibleBookIdAndTestament[book] ? bibleBookIdAndTestament[book][0] : 'unknown';

    const fetchChapter = async (bookId, chapter, language) => {
        try {
            const response = await api.get(`Bible/${language}/${bookId}/chapter/${chapter}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${language} Bible chapter:`, error);
            throw error;
        }
    };

    const fetchChapterText = async () => {
        try {
            const englishData = await fetchChapter(bookId, chapter, 'eng');
            setEnglishChapterText(englishData.text);

            const originalLanguage = checkIfOldTestament(book) ? 'heb' : 'grk';
            const originalData = await fetchChapter(bookId, chapter, originalLanguage);
            setOriginalChapterText(originalData.text);
        } catch (error) {
            console.log('Error fetching Bible chapter text:', error);
        }
    };

    useEffect(() => {
        fetchChapterText();
    }, [book, chapter]);

    return (
        <Modal show={isOpen} onHide={onRequestClose}>
            <Modal.Header closeButton>
                <Modal.Title>{`Chapter ${chapter} of ${book}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>English</h5>
                <p>{englishChapterText}</p>
                <h5>{checkIfOldTestament(book) ? 'Hebrew' : 'Greek'}</h5>
                <p>{originalChapterText}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};