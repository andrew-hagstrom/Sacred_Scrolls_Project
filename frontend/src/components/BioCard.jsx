import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


function BioCard({ imageSrc, name, description, email, githubLink, linkedinLink }) {
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
              <div>
                <a href={`mailto:${email}`} className="icon-link">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </a>
                {' '}
                <a href={githubLink} className="icon-link">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                {' '}
                <a href={linkedinLink} className="icon-link">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
  
  export default BioCard;