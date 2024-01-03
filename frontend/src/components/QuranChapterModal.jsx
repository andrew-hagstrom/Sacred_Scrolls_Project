import { useState, useEffect } from 'react';
import { api } from '../utilities/ApiUtilities';
import { Modal, Button } from 'react-bootstrap';

export const QuranChapterModal = ({ chapterNumber, isOpen, onRequestClose }) => {
  const [chapterText, setChapterText] = useState('');

  // Fetch the entire chapter
  const fetchQuranChapter = async () => {
    try {
      const response = await api.get(`Quran/en/chapter/${chapterNumber}/`);
      const verses = response.data.data.ayahs.map(ayah => ayah.text).join(' ');
      setChapterText(verses);
    } catch (error) {
      console.error(`Error fetching Quran chapter ${chapterNumber}:`, error);
      throw error;
    }
  }

  useEffect(() => {
    fetchQuranChapter();
  }, [chapterNumber]);

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chapter {chapterNumber}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{chapterText}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}