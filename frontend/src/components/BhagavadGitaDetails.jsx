import { useState, useEffect } from 'react';


import { api } from '../utilities/ApiUtilities';

import { PassageCard } from './PassageCard';


export const BhagavadGitaDetails = ({ chapter, verse }) => {
    const [sanskritText, setSanskritText] = useState('');

    const [englishText, setEnglishText] = useState('')

    const book = "bhagavadgita"

    const reference = `Bhagavad Gita ${chapter}:${verse}`;
 

   // Fetch English verse by chapter and verse number
    const fetchEnglishVerse = async (chapterNumber, verseNumber) => {
        try {
        const response = await api.get(`BG/eng/chapter/${chapterNumber}/verse/${verseNumber}/`);
        return response.data;
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
        return response.data;
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

    return (
        <>
            <PassageCard
                cardTitle="Bhagavad Gita"
                sourceText={sanskritText}
                sourceReference={reference}
                additionalReferences={[]}
            />

            <PassageCard
                cardTitle="Bhagavad Gita (English)"
                sourceText={englishText}
                sourceReference={reference}
                additionalReferences={[]}
            />
        </>
    )
}

