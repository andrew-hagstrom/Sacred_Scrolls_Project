import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { api } from "./utilities/ApiUtilities";

import "./App.css";
import Container from "react-bootstrap/Container";

import  reactIcon from './assets/react.svg'
import  djangoIcon from './assets/django-logo-negative.svg'
import gitHubIcon from './assets/github-mark.png'
import codePlatoonIcon from './assets/CP-Logo-White-NoPadding.png'

function App() {
  const [user, setUser] = useState(null);
  const [journalData, setJournalData] = useState([]);
  const [user_id, setUserID] = useState(null);
  const [favorites, setFavorites] = useState([])
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([])

  const getInfo = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      try {
        const response = await api.get("user/info/"); // Update with the correct endpoint
        setUser(response.data.username);
        // setUserID(response.data.user_id);
      } catch (error) {
        console.error("Error fetching user info:", error);
        // Optionally handle error (e.g., invalid token)
      }
    }
  };

  const getFavorites = async () => {
    let response = await api.get("user/favorites/").catch((err) => {
      // console.log(err.message);
    });
    setFavorites(response.data);
    // console.log(favorites);
  };

  const getJournalData = async () => {
    try {
      const response = await api.get("user/journal/");
      if (response.status === 200) {
        setJournalData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const fetchAllPosts = async () => {
  try {
      const response = await api.get('posts/');
      setAllPosts(response.data);
  } catch (error) {
      console.error('Error fetching posts:', error);
  }
};

  const fetchUserPosts = async () => {
    try {
        // console.log(user)
        const response = await api.get(`posts/${user}/`);
        setUserPosts(response.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


  useEffect(() => {
    getInfo();
    getFavorites();
    getJournalData();
    // fetchUserPosts();
    fetchAllPosts();
  }, [user, user_id]);

  // TESTING - DELETE WHEN DONE
  useEffect(() => {
    // console.log("app level loading journal data",journalData)

  }, [journalData])
  return (
    <>
      <NavBar user={user} setUser={setUser} />

    
    <Container >
     <Outlet context={{user, setUser, user_id, setUserID, favorites, setFavorites, setUserPosts, userPosts, allPosts, setAllPosts, journalData, setJournalData}}/>
     </Container>
     <div className="footer">
     <p>&copy; Sacred Scrolls 2024</p>
     <p>Powered By:</p>
     <div style={{marginLeft: "-5%",display: "flex", justifyContent: "center", marginBottom: "1%"}}>
        
        <a href="https://github.com/andrew-hagstrom/Sacred_Scrolls_Project">
          <img style={{height: "auto", width: '25%'}} src={gitHubIcon} alt="Github Logo" />
        </a>
        <a style={{marginLeft: "-2%", height: "auto", width: '20%'}} href="https://www.codeplatoon.org">
          <img src={codePlatoonIcon} alt="Code Platoon Logo" />
        </a>
        <a href="https://reactjs.org/">
          <img src={reactIcon} alt="React Logo" />
        </a>
        
      </div>
      <a href="https://www.djangoproject.com/">
              <img style={{height: "auto", width: '5%'}} src={djangoIcon} alt="Django Logo" />
        </a>
     </div>
    </>
  );
}

export default App;
