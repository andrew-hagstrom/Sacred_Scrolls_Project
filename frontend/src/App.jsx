import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { api } from "./utilities/ApiUtilities";

import "./App.css";
import Container from "react-bootstrap/Container";

function App() {
  const [user, setUser] = useState(null);
  const [journalData, setJournalData] = useState([]);
  const [user_id, setUserID] = useState(null);
  const [favorites, setFavorites] = useState([])
  const [posts, setUserPosts] = useState([]);
  const [allposts, setAllPosts] = useState([])

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
    fetchUserPosts();
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
     <Outlet context={{user, setUser, user_id, setUserID, favorites, setFavorites, fetchUserPosts, setUserPosts, posts, allposts, setAllPosts, journalData, setJournalData}}/>
     </Container>
    </>
  );
}

export default App;
