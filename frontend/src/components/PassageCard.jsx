import { useState, useEffect } from 'react';
<<<<<<< Updated upstream
import { useNavigate, useParams, useLocation, useOutletContext } from 'react-router-dom';
=======
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    const location = useLocation();

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        const { book, chapter, verse } = extractBookChapterVerse(currentReference);
    
        if (location.pathname === `/text-compare/${book}/${chapter}/${verse}/`) {
            // Navigate to the default text compare page
            navigate('/text-compare/');
        } else {
            // Navigate to the details page with the route parameters
            navigate(`/text-compare/${book}/${chapter}/${verse}/`);
        }
=======
        const { book, chapter, verse } = extractBookChapterVerse(currentReference)
        // Navigate to the details page with the route parameters
        navigate(`/text-compare/${book}/${chapter}/${verse}/`);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    const handlePostClick = () => {
        navigate(`/passageposts/${encodeURIComponent(book)}/${encodeURIComponent(chapter)}/${encodeURIComponent(verse)}`);
    };

    useEffect(()=> {
        checkIfFavorite()
    },[currentReference])

    const detailsButtonText = location.pathname.startsWith('/text-compare/') && !location.pathname.endsWith('/text-compare/') ? 'Go Back' : 'See More';
=======
    useEffect(()=> {
        checkIfFavorite()
    },[currentReference])
>>>>>>> Stashed changes
    
    return (
        <>
  
<<<<<<< Updated upstream
            <Card style={{ margin: '2vh'}}>
                <Card.Header style={{ textAlign: 'center'}}>
=======
            <Card>
                <Card.Header style={{ textAlign: 'center' }}>
>>>>>>> Stashed changes
                    <strong>{cardTitle}</strong>
                    <Button 
                        variant="outline-secondary" 
                        onClick={toggleCollapse}
                        size="sm" 
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
<<<<<<< Updated upstream
                                {currentText} 
                            </Card.Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary" onClick={() => handleDetailsClick(book, chapter, verse)}>{detailsButtonText}</Button>
                            <Button onClick={handlePostClick}>Write Comment</Button>
=======
                                {currentText}
                            </Card.Text>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="primary" onClick={() => handleDetailsClick(book, chapter, verse)}>Details</Button>
>>>>>>> Stashed changes
                            <Button variant="secondary" onClick={(e)=>addToFavorites(e)} disabled={isFavorite === true}>
                                {isFavorite ? 
                                'Already Added to Favorites' :
                                'Add to Favorites'} 
                                </Button>
                        
                        
                        
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
