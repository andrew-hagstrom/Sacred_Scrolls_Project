import { useState, useEffect } from 'react';


import { api } from '../../utilities/ApiUtilities';
import { PassageCard } from '../PassageCard';
import { BhagavadGitaChapterModal } from './BhagavadGitaChapterModal'

import Button from 'react-bootstrap/Button';


export const BhagavadGitaDetails = ({ chapter, verse }) => {
    const [sanskritText, setSanskritText] = useState('');
    const [englishText, setEnglishText] = useState('');
    const [showChapterModal, setShowChapterModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('san');

    const book = "bhagavadgita"

    const reference = `Bhagavad Gita ${chapter}:${verse}`;
 

   // Fetch English verse by chapter and verse number
    const fetchEnglishVerse = async (chapterNumber, verseNumber) => {
        try {
        const response = await api.get(`BG/eng/chapter/${chapterNumber}/verse/${verseNumber}/`);
        return response.data.verse_text;
        } catch (error) {
        // Handle errors here
        console.error('Error fetching English Bhagavad Gita verse:', error);
        throw error;
        }
    };
    
    // Fetch Sanskrit verse by chapter and verse number
    const fetchSanskritVerse = async (chapterNumber, verseNumber) => {
        try {
        const response = await api.get(`BG/san/chapter/${chapterNumber}/verse/${verseNumber}/`);
        return response.data.verse_text;
        } catch (error) {
        // Handle errors here
        console.error('Error fetching Sanskrit Bhagavad Gita verse:', error);
        throw error;
        }
    };

    const fetchVerses = async() => {
        try {
            const englishVerse = await fetchEnglishVerse(chapter, verse);
            setEnglishText(englishVerse);
            
            const sanskritVerse = await fetchSanskritVerse(chapter, verse);
            setSanskritText(sanskritVerse)
        } catch(error) {
            console.log(error, "something went wrong")
        }

            
    };

    useEffect(() => {
        console.log('VerseDetailPage rendered');
        fetchVerses()
        
    }, [book, chapter, verse])

    const toggleChapterModal = (language) => {
        setSelectedChapter(chapter)
        setSelectedLanguage(language)
        setShowChapterModal(!showChapterModal);
    };

    return (
        <>
          <div>
          
          <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('san')}>See Chapter</Button>
            <PassageCard
              cardTitle="Bhagavad Gita"
              sourceText={sanskritText}
              sourceReference={reference}
              additionalReferences={[]}
            />
          </div>
          <div>
          <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('eng')}>See Chapter</Button>
            <PassageCard
              cardTitle="Bhagavad Gita (English)"
              sourceText={englishText}
              sourceReference={reference}
              additionalReferences={[]}
            />
          </div>
          {showChapterModal && (
            <BhagavadGitaChapterModal
              
              chapter={selectedChapter}
              language={selectedLanguage}
              isOpen={showChapterModal}
              onRequestClose={() => setShowChapterModal(false)}
            />
          )}
        </>
      );
}

