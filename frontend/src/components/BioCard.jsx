import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function BioCard({ imageSrc, name, description, email }) {
    return (
      <Card className="bio-card">
        <Row>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img src={imageSrc} alt={name} className="bio-image" />
          </Col>
          <Col md={6}>
            <Card.Body className='bio-text'>
              <Card.Title>
                  {name}
              </Card.Title>
              <Card.Text>
                  {description}
              </Card.Text>
              <Button href={`mailto:${email}`} variant="dark" size="sm">e-mail me</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
  
  export default BioCard;