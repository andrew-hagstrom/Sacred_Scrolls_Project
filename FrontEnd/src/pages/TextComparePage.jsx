import {useState, useEffect } from 'react';
import { PassageCard } from '../components/PassageCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/Container';




function TextComparePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [bibleText, setBibleText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
    const [quranText, setQuranText] = useState("Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    const [gitaText, setGitaText] = useState("Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.");

    const useEffect = (() => {
    setBibleText("Bible Passage Text");
    setQuranText("Quran Passage Text");
    setGitaText("Gita Passage Text");
}, [])



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
                            <Button variant="primary">Search</Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3"> {/* Add margin-bottom class */}
                    <Col md={12}>
                        {bibleText && <PassageCard sourceText={bibleText} sourceReference="Bible Reference" />}
                    </Col>
                </Row>
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