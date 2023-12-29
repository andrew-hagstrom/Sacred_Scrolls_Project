import {useState, useEffect } from 'react';
import { PassageCard } from '../components/PassageCard';

import { BibleKeywordSearch } from '../utilities/BibleKeywordSearch';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/Container';




function TextComparePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [firstBibleResult, setFirstBibleResults] = useState(null);
    const [additionalBibleReferences, setAdditionalBibleReferences] = useState([]);
    const [quranText, setQuranText] = useState("Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    const [gitaText, setGitaText] = useState("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.");


    const fetchBibleSearchResults = async() => {
        const results = await BibleKeywordSearch(searchTerm);
        if (results.length > 0) {
            setFirstBibleResults(results[0])
            console.log(results[0])
            setAdditionalBibleReferences(results.slice(1));
        }
    }

    const handleSearch = () => {
    if (searchTerm) {
        fetchBibleSearchResults()
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
                        sourceText={firstBibleResult.text} 
                        sourceReference={`${firstBibleResult.book} ${firstBibleResult.chapter}`}
                        additionalReferences={additionalBibleReferences}
                        />
                    </Col>
                </Row>
                )}
                <Row className="mb-3"> {/* Add margin-bottom class */}
                    <Col md={12}>
                        {quranText && <PassageCard sourceText={quranText} sourceReference="Quran Reference" />}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {gitaText && <PassageCard sourceText={gitaText} sourceReference="Bhagavad Gita Reference" />}
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default TextComparePage