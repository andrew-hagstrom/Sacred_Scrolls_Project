import { useState, useEffect } from 'react';
import { api } from '../../utilities/ApiUtilities';
import { Modal, Button } from 'react-bootstrap';

export const QuranChapterModal = ({ chapter, language, isOpen, onRequestClose }) => {
  const [chapterText, setChapterText] = useState('');

  // Fetch the entire chapter
  const fetchQuranChapter = async () => {
    try {
      const response = await api.get(`Quran/${language}/chapter/${chapter}/`);
      const verses = response.data.data.ayahs.map(ayah => ayah.text).join(' ');
      setChapterText(verses);
    } catch (error) {
      console.error(`Error fetching Quran chapter ${chapter}:`, error);
      throw error;
    }
  }

  useEffect(() => {
    fetchQuranChapter();
  }, [chapter]);

  return (
    <Modal className="verse-modal" show={isOpen} onHide={onRequestClose} scrollable={true}>
      <Modal.Header closeButton>
        <Modal.Title>Chapter {chapter}</Modal.Title>
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







