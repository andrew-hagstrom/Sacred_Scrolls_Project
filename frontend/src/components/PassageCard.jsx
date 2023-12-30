import { useState, useEffect } from 'react';

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

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
                        <Card.Body>
                            <Card.Title style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => additionalReferences && additionalReferences.length > 0}>
                                {sourceReference}
                            </Card.Title>
                            <Card.Text>
                                {sourceText}
                            </Card.Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary">Details</Button>
                            <Button variant="secondary">Add to Favorites</Button>
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
