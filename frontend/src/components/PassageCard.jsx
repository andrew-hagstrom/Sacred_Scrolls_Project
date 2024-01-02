import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse'

export const PassageCard =({ sourceText, sourceReference, additionalReferences, cardTitle }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentText, setCurrentText] = useState(sourceText || 
        'Text not available');
    const [currentReference, setCurrentReference] = useState(
        sourceReference || "Reference not available"
    )
    const navigate = useNavigate();
    const {favorites, setFavorites, user} = useOutletContext()
    const [favText, setFavText] = useState("")
    const [favSource, setFavSource] = useState("")
    const [favRef, setFavRef] = useState("")

    const extractBookChapterVerse = (reference) => {
        const match = reference.match(/(.+) (\d+:\d+)/);
        if (match) {
          const book = match[1].toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces
          const [chapter, verse] = match[2].split(':'); // Extract chapter and verse
          return { book, chapter, verse };
        }
        return { book: "N/A", chapter: "N/A", verse: "N/A" }; // Return default values if no match
      };

      const { book, chapter, verse } = extractBookChapterVerse(currentReference);


    useEffect(() => {
        setCurrentText(sourceText || 'Text not available');
        setCurrentReference(sourceReference || "Reference not available");
    }, [sourceText, sourceReference]); 

    const handleReferenceClick = (newText, newReference) => {
        setCurrentText(newText || 
            'Text not available');
        setCurrentReference(newReference || 
            'Reference not available');
        setShowModal(false);
    };

    const handleDetailsClick = () => {
        const { book, chapter, verse } = extractBookChapterVerse(currentReference)
        // Navigate to the details page with the route parameters
        navigate(`/text-compare/${book}/${chapter}/${verse}/`);
    };

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const addToFavorites = async() => {
        let token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Token ${token}`

        let data = {
            user : user,
            language : 'English',
            source : favSource,
            reference : favRef,
            text : favText
        }
        let response = await axios.post('http://127.0.0.1:8000/api/v1/user/favorites/', data)
        console.log(response)
    }   

    const favDataHandler = () => {
        setFavRef(currentReference)
        setFavSource(cardTitle)
        setFavText(currentText)
    }

    return (
        <>
            
            <Card>
                <Card.Header style={{ textAlign: 'center' }}>
                    <strong>{cardTitle}</strong>
                    <Button 
                        variant="outline-secondary" 
                        onClick={toggleCollapse} 
                        style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {isCollapsed ? 'Expand' : 'Collapse'}
                    </Button>
                </Card.Header>
                <Collapse in={!isCollapsed}>
                    <div>
                        <Card.Body onMouseEnter={(e) => favDataHandler(e)}>
                            <Card.Title style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => { 
                                if (additionalReferences && additionalReferences.length > 0) {
                                        setShowModal(true);
                                }
                                }}>
                                {currentReference}
                            </Card.Title>
                            <Card.Text>
                                {currentText}
                            </Card.Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary" onClick={() => handleDetailsClick(book, chapter, verse)}>Details</Button>
                            <Button variant="secondary" onClick={(e)=>addToFavorites(e)}>Add to Favorites</Button>
                        </div>
                    </Card.Body>
                    </div>
                </Collapse>
            </Card>
            

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Reference</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {additionalReferences && additionalReferences.length > 0 ? (
                            additionalReferences.map(({ text, reference }) => (
                                <ListGroup.Item key={reference} onClick={() => handleReferenceClick(text, reference)}>
                                    {reference}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>No additional references available</ListGroup.Item>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
};
