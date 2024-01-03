import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {api} from '../utilities/ApiUtilities'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { useOutletContext } from 'react-router';

function FavoritesPage() {
  const {favorites, setFavorites} = useOutletContext()
  const [toRender, setToRender] = useState([])
  const [selected, setSelected] = useState([])


  const renderHandler = () => {
    setSelected(toRender)
    return selected
  }
  
  return (
    <>
      {favorites.length === 0 ? 
      <h1>No favorites saved</h1>
      :
      <div style={{display:'flex'}}>
        <Container style={{overflowY:'auto', width:'11vw', position:'absolute'}}>
          <Col style={{position:'relative', border:'2px solid black', height:'70vh', paddingLeft:'15px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          {favorites.map((favorite)=> (
            <Row key={favorite.id} onMouseEnter={()=>{setToRender(favorite)}} onClick={()=>renderHandler()}>
              {favorite.reference}
              </Row>
              ))}
        </Col>
        </Container>
          
        <div id='favorites-text-display'style={{}}> 
            <h2>{selected.source}</h2>
            <h3>{selected.reference}</h3>
            <p>{selected.text}</p>
        </div>
        </div>
      } 
      </>
      )
}

export default FavoritesPage