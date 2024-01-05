import { useState, useEffect } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { api } from './utilities/ApiUtilities'

import './App.css'
import Container from 'react-bootstrap/Container'


function App() {
  const [user, setUser] = useState(null);
  const [user_id, setUserID] = useState(null);
  const [favorites, setFavorites] = useState([])
  const [posts, setUserPosts] = useState([]);

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

  const fetchUserPosts = async () => {
    try {
        const response = await api.get(`posts/${user}/`);
        console.log(user)
        setUserPosts(response.data);
        console.log(posts)
        console.log("from fetch posts")
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

  useEffect(() => {
    getInfo();
    getFavorites();
    fetchUserPosts();
  }, [user, user_id]);


  return (
    <>
    <NavBar user={user} setUser={setUser} />

    <Container >
     <Outlet context={{user, setUser, user_id, setUserID, favorites, setFavorites, fetchUserPosts, setUserPosts, posts}}/>
     </Container>
    </>
  )
}

export default App
