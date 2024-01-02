import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ChapterModal = 
({ show, onHide, currentChapter, onNext, onPrev }) => {

    return (
        <Modal show={show} onHide={onHide}>
            {/* Modal content displaying the chapter */}
            <Modal.Footer>
                <Button onClick={onPrev}>Previous Chapter</Button>
                <Button onClick={onNext}>Next Chapter</Button>
            </Modal.Footer>
        </Modal>

    )
}