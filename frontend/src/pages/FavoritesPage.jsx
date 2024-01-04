import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {api} from '../utilities/ApiUtilities'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { useOutletContext } from 'react-router';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom'

function FavoritesPage(currentReference) {
  const {favorites, setFavorites} = useOutletContext()
  const [toRender, setToRender] = useState([])
  const [selected, setSelected] = useState([])
  const [postId, setPostId] = useState(null)

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

  useEffect(()=>{
    getFavorites()
  },[])

  return (
    <>
      <div style={{width:'75vw', display:'flex'}}>
        <Container style={{overflowY:'auto', width:'11vw', position:'absolute', marginLeft:'-10px'}}>
          <Col style={{position:'relative', border:'2px solid black', height:'70vh', paddingLeft:'15px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          {favorites.map((favorite)=> (
            <Row style={{cursor: 'pointer'}} key={favorite.id} onMouseEnter={()=>{setToRender(favorite), setPostId(favorite.id), console.log(favorite.id)}} onClick={()=>renderHandler()}>
              {favorite.reference}
              </Row>
              ))}
        </Col>
        </Container>
      {favorites.length === 0 ? 
      <div>
      <h1 className='favorites-page-headers'>No favorites saved</h1>
      <div>
      <h2 className='favorites-page-headers' style={{textAlign:'center', display:'inline-block'}}>Use the {<Link to="/text-compare/">Text Compare Page</Link>} to search for passages</h2>
      </div>
      </div>
      :
      <div> 
      {selected.length === 0 ?
      <h1 className='favorites-page-headers'>Select a favorite</h1>  
      :
      <Card className='passage-card' style={{marginLeft:'275px'}}>
      <Card.Header style={{ textAlign: 'center'}}>
          <strong>{selected.source}</strong>
      </Card.Header>
              <Card.Body>
                  <Card.Title style={{textAlign: 'center' }}>
                      {selected.reference}
                  </Card.Title>
                  <Card.Text>
                      {selected.text} 
                  </Card.Text>

          </Card.Body>
          <Button style={{width:'15vw'}} onClick={()=>deleteFavorite(postId)}>Remove from Favorites</Button>
      </Card>
      }
      </div>
      }
      </div>
      </>
      )
}

export default FavoritesPage