import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { api } from "./utilities/ApiUtilities";

import "./App.css";
import Container from "react-bootstrap/Container";

import  reactLogo from './assets/reactLogo.png'
import  djangoLogo from './assets/djangoLogo.png'
import gitHubLogo from './assets/gitHubLogo.png'
import codePlatoonLogo from './assets/codePlatoonLogo.png'
import javascriptLogo from './assets/JavascriptLogo.png'
import awsLogo from './assets/awsLogo.png'
import postgresLogo from './assets/PostgreSQL_logo.3colors.png'
import pythonLogo from './assets/pythonLogo.png'
import certBotLogo from './assets/certbotLogo.png'
import nginxLogo from './assets/nginxLogo.png'



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
      <div style={{size: "20%", display: "flex", justifyContent: "space-evenly", marginBottom: "2%"}}>
        
        
        <a href="https://reactjs.org/">
          <img src={reactLogo} alt="React Logo" />
        </a>
        <a href="https://www.codeplatoon.org">
          <img src={codePlatoonLogo} alt="Code Platoon Logo" />
        </a> 
        <a href="https://docs.python.org/3/">
          <img src={pythonLogo} alt="Python Logo" />
        </a>  
        <a href="https://www.djangoproject.com/">
          <img  src={djangoLogo} alt="Django Logo" />
        </a>
        
      </div>
        <div style={{size: "20%", display: "flex", justifyContent: "space-evenly", marginBottom: "2%"}}>
      
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
            <img src={javascriptLogo} alt="JS Logo" />
          </a>
          <a href="https://eff-certbot.readthedocs.io/en/latest/">
            <img src={certBotLogo} alt="CertBot Logo" />
          </a>
          
          <a href="https://aws.amazon.com/free/?trk=6a4c3e9d-cdc9-4e25-8dd9-2bd8d15afbca&sc_channel=ps&ef_id=Cj0KCQiAwP6sBhDAARIsAPfK_wb8Q4nYt2EC7SvH5AMSVEVW3xxaDRnQ5TRP8TETYUJjpNGcqOPQRpoaAgCvEALw_wcB:G:s&s_kwcid=AL!4422!3!651751059783!e!!g!!aws!19852662197!145019195897&gclid=Cj0KCQiAwP6sBhDAARIsAPfK_wb8Q4nYt2EC7SvH5AMSVEVW3xxaDRnQ5TRP8TETYUJjpNGcqOPQRpoaAgCvEALw_wcB&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all">
            <img src={awsLogo} alt="AWS Logo" />
          </a>
        </div>
        <div style={{size: "20%", display: "flex", justifyContent: "space-evenly", marginBottom: "2%"}}>
          <a href="https://github.com/andrew-hagstrom/Sacred_Scrolls_Project">
            <img src={gitHubLogo} alt="Github Logo" />
          </a>
          <a href="https://docs.nginx.com">
            <img src={nginxLogo} alt="NGINX Logo" />
          </a>
          <a href="https://www.postgresql.org">
            <img  src={postgresLogo} alt="PostgreSQL Logo" />
          </a>
          
        </div>        
     </div>
    </>
  );
}

export default App;
