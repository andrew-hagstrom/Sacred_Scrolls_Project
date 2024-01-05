import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function PassagePostsPage() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { user } = useOutletContext();
    const { book, chapter, verse } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentText = searchParams.get('currentText');
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await api.get('posts/', {
                params: {
                    book: book,
                    chapter: chapter,
                    verse: verse
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []); 


    const handlePostSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;


        console.log("User:", user);
        console.log("Book:", book);
        console.log("Chapter:", chapter);
        console.log("Verse:", verse);
        console.log("New Post Content:", newPostContent);
    
        try {
            const response = await api.post(`posts/${user}/`, { text: newPostContent, book: book, chapter: chapter, verse: verse});
            console.log('Post created:', response.data);
            fetchPosts();
            setNewPostContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
      
    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };


    return (
        <div> 
            <h2 style={{textTranform: 'capitalize', textAlign: 'center', marginBottom: '5vh'}}>{book} {chapter}:{verse}</h2>
            <h3>{currentText}</h3>
           
            <form style={{display:'flex', flexDirection:'row', justifyContent: 'center', marginBottom: '5vh'}} onSubmit={handlePostSubmit}>
                <button type="submit">Submit Post</button>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post..."
                ></textarea>
                  
            </form>
         <div style={{textAlign:"center"}}><button onClick={handleGoBack}>Go Back</button> </div>
            <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <div className="posts-card" key={post.id}> {post.timestamp} <br></br> User: {post.username} <br></br>Comment: "{post.text}" </div>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
       
    </div>
)};

export default PassagePostsPage;
