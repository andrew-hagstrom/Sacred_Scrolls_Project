import { useState, useEffect } from 'react';


import { api } from '../../utilities/ApiUtilities';
import { gitaChapters } from '../../utilities/GitaBookUtilities';

import { PassageCard } from '../PassageCard';
import { BhagavadGitaChapterModal } from './BhagavadGitaChapterModal'

import Button from 'react-bootstrap/Button';


export const BhagavadGitaDetails = ({ chapter, verse }) => {

  /* This is mostly a straight-forward api call, but the titles of the Gita chapters in both English and Sanskrit come from 
  
  *GitaBookUtilities.js
  
  */
    const [sanskritText, setSanskritText] = useState('');
    const [englishText, setEnglishText] = useState('');
    const [showChapterModal, setShowChapterModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('san');

    const book = "bhagavadgita"
    const englishChapter = gitaChapters[`${chapter}`][1]
    const gitaChapter = gitaChapters[`${chapter}`][0]
   
 

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
          <div className="detail-card-container">
          
          <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('san')}>See Chapter</Button>
            <PassageCard
              cardTitle="Bhagavad Gita (Sanskrit)"
              sourceText={sanskritText}
              sourceReference={`${gitaChapter} ${chapter}:${verse}`}
              additionalReferences={[]}
            />
          </div>
          <div className="detail-card-container">
          <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('eng')}>See Chapter</Button>
            <PassageCard
              cardTitle="Bhagavad Gita (English)"
              sourceText={englishText}
              sourceReference={`${gitaChapter} ${englishChapter} ${chapter}:${verse}`}
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