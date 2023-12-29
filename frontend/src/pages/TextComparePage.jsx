import {useState, useEffect } from 'react';
import { PassageCard } from '../components/PassageCard';

import { BibleKeywordSearch } from '../utilities/BibleKeywordSearch';
import { GitaKeywordSearch } from '../utilities/GitaKeywordSearch';

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
    const [quranText, setQuranText] = useState("Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");


    const fetchBibleSearchResults = async() => {
        const results = await BibleKeywordSearch(searchTerm);
        if (results.length > 0) {
            setFirstBibleResult(results[0])
            console.log(results)
            setAdditionalBibleReferences(results.slice(1));
        }
    }

    const fetchGitaSearchResults = async() => {
        const results = await GitaKeywordSearch(searchTerm);
        setFirstGitaResult(results['1'])
        console.log(results[0])
        setAdditionalGitaReferences(results.slice(1));
    }

    const handleSearch = () => {
    if (searchTerm) {
        // fetchBibleSearchResults()
        fetchGitaSearchResults()

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
                {/* {firstBibleResult && ( */}
                <Row className="mb-3"> {/* Add margin-bottom class */}
                    <Col md={12}>
                        <PassageCard 
                        // sourceText={firstBibleResult.text} 
                        sourceText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptatum dolorum esse doloribus. Officia, dignissimos totam hic ut possimus, vel repellendus tenetur quidem expedita sint omnis asperiores maxime quae quasi!"
                        // sourceReference={`${firstBibleResult.book} ${firstBibleResult.chapter}`}
                        sourceReference="Genesis 1:1"
                        // additionalReferences={additionalBibleReferences}
                        // additionalReferences={['Gen 1:2','Gen 2:3','Gen 3:5','Gen 4:6','Gen 5:7']}
                        />
                    </Col>
                </Row>
                
                {/* )} */}
                <Row className="mb-3"> {/* Add margin-bottom class */}
                    <Col md={12}>
                        {quranText && <PassageCard sourceText={quranText} sourceReference="Quran Reference" />}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {firstGitaResult && (
                            <PassageCard 
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