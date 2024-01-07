import{ useState } from 'react';

import { FavoritesTutorial } from './tutorial-pages/FavoritesTutoral';
import { JournalTutorial } from './tutorial-pages/JournalTutorial';
import { PostsTutorial } from './tutorial-pages/PostsTutorial';
import { TextualComparisonTutorial } from './tutorial-pages/TextualComparisonTutorial';

import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const TutorialModal = ({ show, onHide }) => {

  const [currentTutorial, setCurrentTutorial] = useState(0); 

  // Array of tutorial contents
  const tutorials = [
    <TextualComparisonTutorial />,
    <JournalTutorial />,
    <PostsTutorial />,
    <FavoritesTutorial />
  ];

  const handleNext = () => {
    if (currentTutorial < tutorials.length - 1) {
      setCurrentTutorial(currentTutorial + 1);
    }
  };

  const handlePrev = () => {
    if (currentTutorial > 0) {
      setCurrentTutorial(currentTutorial - 1);
    }
  };

  return (
    <Modal style={{color:"black"}}show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Tutorial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tutorials[currentTutorial]}
      </Modal.Body>
      <Modal.Footer>
        <FontAwesomeIcon icon={faArrowLeft} onClick={handlePrev} />
        <FontAwesomeIcon icon={faArrowRight} onClick={handleNext} />
      </Modal.Footer>
    </Modal>
  );
};
