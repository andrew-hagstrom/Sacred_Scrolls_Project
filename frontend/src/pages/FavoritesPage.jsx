import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {api} from '../utilities/ApiUtilities'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'

function FavoritesPage() {
  const [userFavorites, setUserFavorites] = useState([])
  const [toRender, setToRender] = useState([])
  const [selected, setSelected] = useState([])

  const getFavorites = async() => {
    let response = await api
    .get('user/favorites/')
    .catch((err)=> {
      console.log(err.message)
    })
    setUserFavorites(response.data)
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
        <div id='favorites-page'>
        <Container style={{width:'auto'}}>
          <Col style={{border:'2px solid black', overflowY:'scroll', height:'70vh', width:'10vw', paddingLeft:'15px'}}>
          {userFavorites.map((favorite)=> (
            <Row key={favorite.id} onMouseEnter={()=>{setToRender(favorite)}} onClick={()=>renderHandler()}>
              {favorite.reference}
              </Row>
              ))}
        </Col>
        </Container>
          
        <div> 
            <h2>{selected.source}</h2>
            <h3>{selected.reference}</h3>
            <p>{selected.text}</p>
        </div>
        </div>
      </>
    )
}

export default FavoritesPage