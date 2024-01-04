import { useState, useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { api } from './utilities/ApiUtilities'

import './App.css'
import Container from 'react-bootstrap/Container'


function App() {
  const [user, setUser] = useState(null);
<<<<<<< Updated upstream
  const [user_id, setUserID] = useState(null);
=======
>>>>>>> Stashed changes
  const [favorites, setFavorites] = useState([])

  const getInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        const response = await api.get("user/info/"); // Update with the correct endpoint
        setUser(response.data.username);
        setUserID(response.data.user_id);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Optionally handle error (e.g., invalid token)
      }
    }
  }; 
  
  const getFavorites = async() => {
    let response = await api
    .get('user/favorites/')
    .catch((err)=> {
      console.log(err.message)
    })
    setFavorites(response.data)
    console.log(favorites)
  }

  useEffect(() => {
    getInfo();
    getFavorites();
<<<<<<< Updated upstream
  }, [user, user_id]);
=======
  }, [user]);
>>>>>>> Stashed changes


  return (
    <>
    <NavBar user={user} setUser={setUser} />

    <Container >
<<<<<<< Updated upstream
     <Outlet context={{user, setUser, user_id, setUserID, favorites, setFavorites}}/>
=======
     <Outlet context={{user, setUser, favorites, setFavorites}}/>
>>>>>>> Stashed changes
     </Container>
    </>
  )
}

export default App
