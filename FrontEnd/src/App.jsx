import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { NavBar } from './components/NavBar'
import { api } from './utilities/ApiUtilities'

import './App.css'
import Container from 'react-bootstrap/Container'


function App() {
  const [user, setUser] = useState(null);

  const getInfo = async () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        const response = await api.get("users/info/"); // Update with the correct endpoint
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Optionally handle error (e.g., invalid token)
      }
    }
  }; 
  
  // useEffect(() => {
  //   getInfo();
  // }, []);


  return (
    <>
    <NavBar user={user} setUser={setUser} />

    <Container>
     <h1>
      SacredScrolls
     </h1>
     <Outlet />
     </Container>
    </>
  )
}

export default App
