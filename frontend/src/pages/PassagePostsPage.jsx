import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
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

    const sortedPosts = posts.slice().sort((a, b) => {
        const dateA = new Date(a.formatted_timestamp);
        const dateB = new Date(b.formatted_timestamp);
        return dateB - dateA;
    });
  

    const fetchPosts = async () => {
        try {
            const response = await api.get('posts/passageposts/', {
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

    const handlePostDelete = async (postid) => {
        try {
            console.log(postid)
            const response = await api.delete(`posts/${user}/post/${postid}/`);
            if (response.status === 200) {
                // Post deleted successfully, update the posts list
                const updatedPosts = posts.filter(post => post.id !== postid);
                setPosts(updatedPosts);
                console.log("post deleted successfully")
            } else {
                // Handle deletion failure
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            // Handle other error scenarios
        }
    };
      
    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };


    return (
        <div> 
            <h2 style={{textTranform: 'capitalize', textAlign: 'center', marginBottom: '5vh'}}> <Link to={`/text-compare/${book.toLowerCase().startsWith('surah') 
            ? 'quran'
            : book.toLowerCase().startsWith('bhagavad')
            ? 'bhagavadgita'
            : book.toLowerCase()}/${chapter}/${verse}/`}>

          {book} {chapter}:{verse}
        </Link></h2>
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
            {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <div>
                    {sortedPosts.map((post) => (
                        <div className="posts-card" key={post.id}> {post.formatted_timestamp} <br></br> 
                        User: {post.username} <br></br>
                        Comment:<span style={{ fontSize: '25px', color: "purple" }}> "{post.text}"</span> <br></br>
                        Reference: <Link to={`/text-compare/${post.book.toLowerCase()}/${post.chapter}/${post.verse}/`}> {post.book} {post.chapter}:{post.verse}</Link>
                        {user === post.username && (
                            <div>
                            <button onClick={() => handlePostDelete(post.id)}>Delete</button> 
                            <button>Edit</button>
                            </div>
        
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts available</p>
            )}
        </div>
       
    </div>
)};

export default PassagePostsPage;
