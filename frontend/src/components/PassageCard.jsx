import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';

export const PassageCard =({ sourceText, sourceReference, additionalReferences }) => {
    const [showCard, setShowCard] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentText, setCurrentText] = useState(sourceText || 
        'Text not available');
    const [currentReference, setCurrentReference] = useState(
        sourceReference || "Reference not available"
    )

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

    return (
        <>
            {showCard && (
                <Card>
                    <Card.Header>
                        Source Text 
                        <Button variant="outline-secondary" onClick={() => setShowCard(false)}>Hide</Button>
                    </Card.Header>

                    <Card.Body>
                        <Card.Title style={{ cursor: 'pointer' }} onClick={() => additionalReferences && additionalReferences.length > 0 && setShowModal(true)}>
                            {currentReference}
                        </Card.Title>
                        
                        <Card.Text>
                            {currentText}
                        </Card.Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary">Details</Button>
                            <Button variant="secondary">Add to Favorites</Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

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
