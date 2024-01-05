import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function BioCard({ imageSrc, name, description, email }) {
  const isAndrew = name === 'Andrew Hagstrom';
  const imageClass = isAndrew ? 'andrew-image' : 'bio-image';
  const cardClass = isAndrew? 'andrew-card' : 'bio-card';
  


  return (
    <Card className={cardClass}>
      <Row noGutters>
        <Col md={6}>
          <div className={imageClass} style={{ backgroundImage: `url(${imageSrc})` }} />
        </Col>
        <Col md={6}>
          <Card.Body className='bio-text'>
            <Card.Title>
                {name}
            </Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
            <Button href={`mailto:${email}`} style={{marginTop: '-4%', marginLeft: '88%'}} variant="dark" size="sm">e-mail me</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default BioCard;