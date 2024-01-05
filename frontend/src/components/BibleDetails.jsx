import { useState, useEffect } from 'react';

import { api } from '../utilities/ApiUtilities';
import { PassageCard } from './PassageCard';


export const BibleDetails = ({ book, chapter, verse }) => {
    const [verseText, setVerseText] = useState('');
    const reference = `${book} ${chapter}:${verse}`;
    

    // Fetch Bible verse by book, chapter, and verse number
    const fetchVerse = async (book, chapter, verse) => {
        try {
            const response = await api.get(`bible/${book}/${chapter}/${verse}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Bible verse:', error);
            throw error;
        }
    };

    const fetchVerseText = async () => {
        try {
            const verseData = await fetchVerse(book, chapter, verse);
            setVerseText(verseData.text);
        } catch (error) {
            console.log('Error fetching Bible verse text:', error);
        }
    };

    useEffect(() => {
        console.log('BibleDetails component rendered');
        fetchVerseText();
    }, [book, chapter, verse]);

    return (
        <>
            <PassageCard
                cardTitle="Bible"
                sourceText={verseText}
                sourceReference={reference}
                additionalReferences={[]}
            />
        </>
    );
};