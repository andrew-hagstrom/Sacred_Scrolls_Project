import {useState} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export const PassageCard =({ sourceText, sourceReference, additionalReferences }) => {
    const [showCard, setShowCard] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentText, setCurrentText] = useState(sourceText);
    const [currentReference, setCurrentReference] = useState(sourceReference);

    const handleReferenceClick = (newText, newReference) => {
        setCurrentText(newText);
        setCurrentReference(newReference);
        setShowModal(false);
    };

  return (
    <>
        {showCard && (
            <Card>
                <Card.Header>
                    Source Text 
                    <Button 
                        variant="outline-secondary" 
                        onClick={() => setShowCard(false)}
                    >
                        Hide
                    </Button>
                </Card.Header>

                <Card.Body>
                    <Card.Title 
                        onClick={() => setShowModal(true)} 
                        style={{ cursor: 'pointer' }}
                    >
                        {currentReference}
                    </Card.Title>
                
                    <Card.Text>
                        {currentText}
                    </Card.Text>
                    
                    <div 
                        style={{ display: 'flex', justifyContent: 'space-between' }}    
                    >
                        <Button variant="primary">Details</Button>
                        <Button variant="secondary">Add to Favorites</Button>
                    </div>

                </Card.Body>
            </Card>
        )}

    </>
  );
}

