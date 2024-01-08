import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {api} from '../utilities/ApiUtilities'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { useOutletContext } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

function FavoritesPage() {
  const {favorites, setFavorites} = useOutletContext()
  const [toRender, setToRender] = useState([])
  const [selected, setSelected] = useState(null)
  const [postId, setPostId] = useState(null)
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const deleteFavorite = async() => {
    let response = await api
    .delete(`user/favorite/${postId}/`)
    .catch((err)=>{
      console.log(err.message)
    })
    if (response.status === 204) {
      window.location.reload()
    }
  }

  const getFavorites = async() => {
    let response = await api
    .get('user/favorites/')
    .catch((err)=> {
      console.log(err.message)
    })
    setFavorites(response.data)
  }

  const renderHandler = () => {
    setSelected(toRender)
    return selected
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(()=>{
    getFavorites()
    if (!loading) {
      setIsVisible(true)
    }
  },[loading])


  return (
    <>
    <div className={`fade-in-out ${isVisible ? "" : "fade-out"}`}>
      <Container className="container-fluid">
        <Row>
          {/* Favorites List */}
          <Col lg={4} xs={12} className="order-2 order-lg-1">
            <div className="favorites-list" style={{marginLeft: '11%', overflowY: 'auto', overflowX:'hidden'}}>
              <h1 style={{fontSize: '34px'}}>Favorites</h1>
              {favorites.map((favorite) => (
                <Row style={{cursor: 'pointer'}} key={favorite.id} onMouseEnter={() => {setToRender(favorite); setPostId(favorite.id)}} onClick={renderHandler}>
                  <div className='list-text'>{favorite.reference}</div>
                </Row>
              ))}
            </div>
          </Col>

          {/* Card Display */}
          <Col lg={8} xs={12} className="order-1 order-lg-2">
            {favorites.length === 0 ? 
              <div className='favorites-page-headers'>
                <h1>No favorites saved</h1>
                <h2 style={{textAlign: 'center'}}>Use the <Link to="/text-compare/">Textual Comparison Page</Link> to search for passages</h2>
              </div>
              :
              selected === null ?
                <h1 className='favorites-page-headers'>Select a favorite</h1>
                :
                <Card className='passage-card'>
                  <Card.Header style={{ textAlign: 'center' }}>
                    <strong>{selected.source}</strong>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{textAlign: 'center' }}>
                      {selected.reference}
                    </Card.Title>
                    <Card.Text>{selected.text}</Card.Text>
                  </Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button className='passagecard-button' variant="dark" style={{margin: '3px'}} onClick={() => deleteFavorite(postId)}>Remove</Button>
                  </div>
                </Card>
            }
          </Col>
        </Row>
      </Container>
    </div>
  </>
  )
}

export default FavoritesPage