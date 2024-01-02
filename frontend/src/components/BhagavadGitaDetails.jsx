import { useState, useEffect } from 'react';

import { api } from '../utilities/ApiUtilities';

import { PassageCard } from './PassageCard';


export const BhagavadGitaDetails = ({match}) => {
    const { BGChapterNumber, BGVerseNumber } = match.params;
    const [sanskritText, setSanskritText] = useState('');
    const [sanskritReference, setSanskritReference] = useState('');
    const [englishText, setEnglishText] = useState('')
    const [englishReference, setEnglishReference] = useState('')
}