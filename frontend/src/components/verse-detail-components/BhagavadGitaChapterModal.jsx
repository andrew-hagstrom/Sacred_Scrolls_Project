import { useState, useEffect } from 'react';

import { api } from '../../utilities/ApiUtilities';

import { Modal, Button } from 'react-bootstrap';

////////////////////////////////////////////////////


export const BhagavadGitaChapterModal = ({ chapter, language, isOpen, onRequestClose }) => {
  const [sanskritText, setSanskritText] = useState('');
  const [englishText, setEnglishText] = useState('');

  // Fetch chapter content based on the selected language
  const fetchBhagavadGitaChapter = async () => {
    try {
      const response = await api.get(`BG/${language}/chapter/${chapter}/`);
      const chapterData = response.data;
      setSanskritText(chapterData);
      setEnglishText(chapterData);
    } catch (error) {
      console.error(`Error fetching ${language} Bhagavad Gita chapter ${chapter}:`, error);
      throw error;
    }
  }

  useEffect(() => {
    fetchBhagavadGitaChapter();
  }, [chapter, language]);

  return (
    <Modal className="verse-modal" show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chapter {chapter}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Conditionally render chapter content based on the selected language */}
        {language === 'san' ? (
          <p>Sanskrit Text: {sanskritText}</p>
        ) : (
          <p>English Text: {englishText}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
