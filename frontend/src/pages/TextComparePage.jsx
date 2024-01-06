import {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'


import { PassageCard } from '../components/PassageCard';

import { BibleKeywordSearch } from '../utilities/BibleKeywordSearch';
import { GitaKeywordSearch } from '../utilities/GitaKeywordSearch';
import { QuranKeywordSearch } from '../utilities/QuranKeywordSearch';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/Container';



function TextComparePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [firstBibleResult, setFirstBibleResult] = useState(null);
    const [additionalBibleReferences, setAdditionalBibleReferences] = useState([]);
    const [firstGitaResult, setFirstGitaResult] = useState(null);
    const [additionalGitaReferences, setAdditionalGitaReferences] = useState([])
    const [firstQuranResult, setFirstQuranResult] = useState(null);
    const [additionalQuranReferences, setAdditionalQuranReferences] = useState([]);
    const navigate = useNavigate();

    const initialState = {
        searchTerm: '',
        firstBibleResult: null,
        additionalBibleReferences: [],
        firstGitaResult: null,
        additionalGitaReferences: [],
        firstQuranResult: null,
        additionalQuranReferences: []
    };

    const [resultsState, setResultsState] = useState(() => {
    
    const savedState = sessionStorage.getItem('resultsState');
    return savedState ? JSON.parse(savedState) : initialState;
  });


    const { book, chapter, verse } = useParams();


    const fetchBibleSearchResults = async() => {
        const results = await BibleKeywordSearch(searchTerm);
        if (results.length > 0) {
            setFirstBibleResult({
                text: results[0].text,
                reference: results[0].reference
            });
            setAdditionalBibleReferences(results.slice(1).map(verse => ({
                text: verse.text,
                reference: verse.reference
            })));
        } else {
            setFirstBibleResult(null);
            setAdditionalBibleReferences([]);
        }
    };

    const fetchGitaSearchResults = async() => {
        const results = await GitaKeywordSearch(searchTerm);
    
        // Check if any results were found
        if (results.length > 0) {
            // Update the state with the first result
            const firstResultFormatted = {
                text: results[0].text,
                reference: `Bhagavad Gita ${results[0].chapter}:${results[0].verse}`
            };
            setFirstGitaResult(firstResultFormatted);

            const additionalReferencesFormatted = results.slice(1).map(result => ({
                text: result.text,
                reference: `Bhagavad Gita ${result.chapter}:${result.verse}`
            }));
            setAdditionalGitaReferences(additionalReferencesFormatted);
        } else {
            setFirstGitaResult(null);
            setAdditionalGitaReferences([]);
        }
    };

    const fetchQuranSearchResults = async () => {
        const response = await QuranKeywordSearch(searchTerm);
        const matches = response.matches; 
    
        if (matches && matches.length > 0) {
            const firstResult = {
                text: matches[0].text,
                reference: `Surah ${matches[0].surah.englishName} ${matches[0].surah.number}:${matches[0].numberInSurah}`
            };
            setFirstQuranResult(firstResult);
    
            const additionalResults = matches.slice(1).map(match => ({
                text: match.text,
                reference: `Surah ${match.surah.englishName} ${match.surah.number}:${match.numberInSurah}`
            }));
            setAdditionalQuranReferences(additionalResults);
        } else {
            setFirstQuranResult(null);
            setAdditionalQuranReferences([]);
        }
    };
    
    const handleSearch = () => {
    if (searchTerm) {
        fetchBibleSearchResults()
        fetchGitaSearchResults()
        fetchQuranSearchResults()

    }
}
useEffect(() => {
    const savedState = sessionStorage.getItem('TextComparePageState');
    if (savedState) {
        const {
            searchTerm,
            firstBibleResult,
            additionalBibleReferences,
            firstGitaResult,
            additionalGitaReferences,
            firstQuranResult,
            additionalQuranReferences
        } = JSON.parse(savedState);

        setSearchTerm(searchTerm);
        setFirstBibleResult(firstBibleResult);
        setAdditionalBibleReferences(additionalBibleReferences);
        setFirstGitaResult(firstGitaResult);
        setAdditionalGitaReferences(additionalGitaReferences);
        setFirstQuranResult(firstQuranResult);
        setAdditionalQuranReferences(additionalQuranReferences);
    }
}, []);

useEffect(() => {
    const stateToSave = {
        searchTerm,
        firstBibleResult,
        additionalBibleReferences,
        firstGitaResult,
        additionalGitaReferences,
        firstQuranResult,
        additionalQuranReferences
    };
    sessionStorage.setItem('TextComparePageState', JSON.stringify(stateToSave));
}, [searchTerm, firstBibleResult, additionalBibleReferences, firstGitaResult, additionalGitaReferences, firstQuranResult, additionalQuranReferences]);






    return (
        <>
            <h2 style={{marginBottom: '2vh', textAlign: "center", fontSize:'26px', marginBottom: '5vh'}}>
                Enter a keyword or phrase into the search bar to find relevant passages in the Bible, Bhagavad Gita, or Quran
            </h2>
            <Container fluid style={{display:'flex', flexDirection:'column'}}>
                <Row className="mb-4" style={{alignSelf:'center'}}>
                    <Col md={8}>
                        <InputGroup style={{display:'flex', width:'25vw'}}>
                            <Form.Control
                                type="text"
                                placeholder="Enter a keyword or phrase"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{marginRight:'6px'}}
            
                            />
                            <Button variant="none" style={{backgroundColor:'transparent', color:'#dcdbd5', border:'1px solid #dcdbd5'}}onClick={handleSearch}>Search</Button>
                        </InputGroup>
                    </Col>
                </Row>
                {firstBibleResult && (
                <Row> {/* Add margin-bottom class */}
                    <Col md={12}>
                        <PassageCard 
                            cardTitle = "Bible"
                            sourceText={firstBibleResult.text} 
                            sourceReference={firstBibleResult.reference}
                            additionalReferences={additionalBibleReferences}
                        
                        />
                    </Col>
                </Row>
                
                )}
                <Row>
                    <Col md={12}>
                        {firstQuranResult && (
                            <PassageCard 
                                cardTitle = "Quran"
                                sourceText={firstQuranResult.text} 
                                sourceReference={firstQuranResult.reference}
                                additionalReferences={additionalQuranReferences}
                            />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {firstGitaResult && ( 
                            <PassageCard 
                                cardTitle = "Bhagavad Gita"
                                sourceText={firstGitaResult.text} 
                                sourceReference={firstGitaResult.reference} 
                                additionalReferences={additionalGitaReferences}
                                book = {book}
                                chapter={chapter}
                                verse={verse}
                            />
                        )} 
                    </Col>
                </Row>
            
            </Container>

        </>
    )
}

export default TextComparePage