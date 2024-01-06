import { useState, useEffect } from 'react';

import { api} from '../../utilities/ApiUtilities'
import { PassageCard } from '../PassageCard';
import { QuranChapterModal } from './QuranChapterModal';

import Button from 'react-bootstrap/Button'

export const QuranDetails = ({chapter, verse }) => {
    const [arabicVerse, setArabicVerse] = useState('');
    const [englishVerse, setEnglishVerse] = useState('');
    const [showChapterModal, setShowChapterModal] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('ar');

    const fetchArabicVerse = async () => {
        try {
            const response = await api.get(`Quran/ar/chapter/${chapter}/verse/${verse}/`);
            const verseData = response.data.data[0];
            setArabicVerse(verseData.text);
        }catch (error) {
            console.error('error fetching Arabic verse:', error);
            throw error;
        }
    };

    const fetchEnglishVerse = async () => {
        try {
            const response = await api.get(`Quran/en/chapter/${chapter}/verse/${verse}/`);
            const verseData = response.data.data[0];
            setEnglishVerse(verseData.text);
        }catch (error) {
            console.error('error fetching English verse:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchArabicVerse();
        fetchEnglishVerse();
    }, [chapter, verse]);
    
    const toggleChapterModal = (language) => {
        setSelectedChapter(chapter)
        setSelectedLanguage(language)
        setShowChapterModal(!showChapterModal);
    };

    return (
        <div>
            <div className="detail-card-container">
            <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('ar')}>View Chapter</Button>
            <PassageCard
              cardTitle={`Quran ${chapter}:${verse} (Arabic)`}
              sourceText={arabicVerse}
              sourceReference={`Chapter ${chapter}, Verse ${verse}`}
              additionalReferences={[]}
            />
            </div>
            <div className="detail-card-container">
            <Button size='sm' variant="secondary" className='see-chapter' onClick={() => toggleChapterModal('en')}>View Chapter</Button>
            <PassageCard
              cardTitle={`Quran ${chapter}:${verse} (English)`}
              sourceText={englishVerse}
              sourceReference={`Chapter ${chapter}, Verse ${verse}`}
              additionalReferences={[]}
            />
            </div>
        {showChapterModal && (
                <QuranChapterModal
                    chapter={chapter}
                    language={selectedLanguage}
                    isOpen={showChapterModal}
                    onRequestClose={() => setShowChapterModal(false)}
                />
            )}
        </div>

    );
};







