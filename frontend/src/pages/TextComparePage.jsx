import {useState, useEffect } from 'react';
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
                reference: `Chapter ${results[0].chapter} Verse ${results[0].verse}`
            };
            setFirstGitaResult(firstResultFormatted);

            const additionalReferencesFormatted = results.slice(1).map(result => ({
                text: result.text,
                reference: `Chapter ${result.chapter} Verse ${result.verse}`
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
                reference: `Surah ${matches[0].surah.englishName} (${matches[0].surah.number}): Verse ${matches[0].numberInSurah}`
            };
            setFirstQuranResult(firstResult);
    
            const additionalResults = matches.slice(1).map(match => ({
                text: match.text,
                reference: `Surah ${match.surah.englishName} (${match.surah.number}): Verse ${match.numberInSurah}`
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



    return (
        <>
            <h2>
                TextComparePage
            </h2>
            <Container fluid>
                <Row className="mb-4">
                    <Col md={8}>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter a keyword or phrase"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleSearch}>Search</Button>
                        </InputGroup>
                    </Col>
                </Row>
                {firstBibleResult && (
                <Row className="mb-3"> {/* Add margin-bottom class */}
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
                            />
                        )} 
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default TextComparePage