import { useState, useEffect } from 'react';
import { useNavigate, useParams, useOutletContext, useLocation } from 'react-router-dom';
import {api} from '../utilities/ApiUtilities'
import axios from 'axios';
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
    const location=useLocation();
    const {favorites, setFavorites, user} = useOutletContext()
    const [favText, setFavText] = useState("")
    const [favSource, setFavSource] = useState("")
    const [favRef, setFavRef] = useState("")
    const [isFavorite, setIsFavorite] = useState(false);

    const extractBookChapterVerse = (reference) => {
        const match = reference.match(/(.+) (\d+:\d+)/);
        if (match) {
          let book = match[1].toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces
          if (book.includes('surah')) {
            book = 'quran'
          }
            
          const [chapter, verse] = match[2].split(':'); // Extract chapter and verse
          return { book, chapter, verse };
        }
        return { book: "N/A", chapter: "N/A", verse: "N/A" }; // Return default values if no match
      };

    const { book, chapter, verse } = extractBookChapterVerse(currentReference);

    const extractPostBookChapterVerse = (reference) => {
        const match = reference.match(/(.+) (\d+:\d+)/);
        if (match) {
          let postBook = match[1]
            
          const [postChapter, postVerse] = match[2].split(':'); // Extract chapter and verse
          return { postBook, postChapter, postVerse };
        }
        return { postBook: "N/A", postChapter: "N/A", postVerse: "N/A" }; // Return default values if no match
      };

    const { postBook, postChapter, postVerse } = extractBookChapterVerse(currentReference);


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
        const { book, chapter, verse } = extractBookChapterVerse(currentReference);
    
        if (location.pathname !== `/text-compare/`) {
            // Navigate to the default text compare page
            navigate(-1);
        } else {
            // Navigate to the details page with the route parameters
            navigate(`/text-compare/${book}/${chapter}/${verse}/`);
        }
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
            text : favText,
            details: '?'
        }
        let response = await api
        .post('user/favorites/', data)
        .catch((err) => {
            console.log(err.message)
        })
        console.log(response)
        console.log(response)
        if (response.status === 201) {
            setFavorites([...favorites, data])
            setIsFavorite(true)
        } 
    }

    const favDataHandler = () => {
        setFavRef(currentReference)
        setFavSource(cardTitle)
        setFavText(currentText)
    }

    const checkIfFavorite = () => {
        let checking = favorites.some((fav) => fav.reference === currentReference)
        setIsFavorite(checking)
    }

    const handlePostClick = () => {
        const { postBook, postChapter, postVerse } = extractPostBookChapterVerse(currentReference);
        navigate(`/passageposts/${encodeURIComponent(postBook)}/${encodeURIComponent(postChapter)}/${encodeURIComponent(postVerse)}?currentText=${encodeURIComponent(currentText)}`);
    };

    useEffect(()=> {
        checkIfFavorite()
    },[currentReference])

    const detailsButtonText = location.pathname.startsWith('/text-compare/') && !location.pathname.endsWith('/text-compare/') ? 'Return to Search' : 'See More';
    
    return (
        <>
  
            <Card className='passage-card'style={{ margin: '2vh'}}>
                <Card.Header className='card-header' >
                    <strong>{cardTitle}</strong>
                    <Button 
                        variant="outline-secondary" 
                        className='passagecard-button'
                        onClick={toggleCollapse}
                        size="sm" 
                        >
                        {isCollapsed ? 'Expand' : 'Collapse'}
                    </Button>
                </Card.Header>
                <Collapse in={!isCollapsed}>
                    <div>
                        <Card.Body onMouseEnter={(e) => favDataHandler(e)}>
                            <Card.Title style={{ textTransform: 'capitalize',cursor: 'pointer', textAlign: 'center' }} onClick={() => { 
                                if (additionalReferences && additionalReferences.length > 0) {
                                        setShowModal(true);
                                }
                                }}>
                                {currentReference}
                            </Card.Title>
                            <Card.Text>
                                {currentText}
                            </Card.Text>
                        
                        <div className="passage-card-buttons">
                            <Button className='passagecard-button' variant="dark" onClick={() => handleDetailsClick(book, chapter, verse)}>{detailsButtonText}</Button>
                            <Button className='passagecard-button' variant="dark" onClick={handlePostClick}>Comment</Button>
                            <Button className='passagecard-button' variant="dark" onClick={(e)=>addToFavorites(e)} disabled={isFavorite === true}>
                                {isFavorite ? 
                                'Added to Favorites' :
                                'Add to Favorites'} 
                                </Button>
                        
                        
                        
                        </div>
                    </Card.Body>
                    </div>
                </Collapse>
            </Card>
            

            <Modal className='extra-source-modal' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Reference</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {additionalReferences && additionalReferences.length > 0 ? (
                            additionalReferences.map(({ text, reference }) => (
                                <ListGroup.Item style={{cursor:'pointer'}} key={reference} onClick={() => handleReferenceClick(text, reference)}>
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
