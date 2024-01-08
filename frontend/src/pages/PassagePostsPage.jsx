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
    const [editedText, setEditedText] = useState('');

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
    
        try {
            const response = await api.post(`posts/${user}/`, { text: newPostContent, book: book, chapter: chapter, verse: verse});
            fetchPosts();
            setNewPostContent('');
            window.location.reload(); 
            // console.log('Post created:', response.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    const handlePostDelete = async (postid) => {
        try {
            // console.log(postid)
            const response = await api.delete(`posts/${user}/post/${postid}/`);
            if (response.status === 200) {
                // Post deleted successfully, update the posts list
                const updatedPosts = posts.filter(post => post.id !== postid);
                setPosts(updatedPosts);
                // window.location.reload(); 
                // console.log("post deleted successfully")
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

    const handleEditPost = async (postId, newText) => {
        try {
            const response = await api.put(`posts/${user}/post/${postId}/`, {
                text: newText,
            });
    
            if (response.status === 200) {
                // Update the local posts list with the edited post
                const updatedPosts = posts.map((post) =>
                    post.id === postId ? { ...post, text: newText } : post
                );
                setPosts(updatedPosts);
                // console.log('Post updated successfully:', response.data);
    
                setEditedText(prevState => {
                    const updatedEditedTexts = { ...prevState };
                    delete updatedEditedTexts[postId];
                    return updatedEditedTexts;
                });
            } else {
                console.error('Failed to update post');
            }
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };


    return (
        <div> 
            <h2 style={{textTranform: 'capitalize', textAlign: 'center', marginBottom: '2vh'}}> <Link to={`/text-compare/${book.toLowerCase().startsWith('surah') 
            ? 'quran'
            : book.toLowerCase().startsWith('bhagavad')
            ? 'bhagavadgita'
            : book.toLowerCase()}/${chapter}/${verse}/`}>

          {book} {chapter}:{verse}
        </Link></h2>
            <div style={{textAlign:"center", marginBottom: '5vh'}}><button style={{background:'transparent', border: '1px solid white', borderRadius: '5px', color: 'white'}} onClick={handleGoBack}>Return to Search Results</button> </div>
            <h3 style={{marginBottom: "2vh"}}>"{currentText}"</h3>
           
            <form style={{display:'flex', flexDirection:'row', justifyContent: 'center', marginBottom: '5vh'}} onSubmit={handlePostSubmit}>
               
                <textarea 
                    style = {{width: "90vw", borderRadius:'5px', border:'2px solid goldenrod'}}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post here..."
                ></textarea>
                <button style={{background:'transparent', border: '1px solid white', borderRadius: '5px', color: 'white', margin:'2px'}} type="submit">Submit Post</button>   
            </form>
         
            <div>
            {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <div>
                    {sortedPosts.map((post) => (
                        <div className="posts-card" key={post.id}> {post.formatted_timestamp} <br></br> 
                        User: {post.username} <br></br>
                        Comment:<span style={{ color: "purple" }}> "{post.text}"</span> <br></br>
                        Reference: <Link to={`/text-compare/${book.toLowerCase().startsWith('surah') 
            ? 'quran'
            : book.toLowerCase().includes('yoga')
            ? 'bhagavadgita'
            : book.toLowerCase()}/${chapter}/${verse}/`}>

          {book} {chapter}:{verse}
        </Link>
                        {user === post.username && (
                            <div>
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handlePostDelete(post.id)}>Delete</button> 
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => setEditedText({
                                ...editedText,
                                [post.id]: post.text
                                    })}>
                                        Edit
                                    </button>
                            {editedText[post.id] && (
                            <div>
                                <textarea
                                    value={editedText[post.id]}
                                    onChange={(e) => setEditedText({
                                    ...editedText,
                                    [post.id]: e.target.value
                                        })}
                                    ></textarea>
                                    <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handleEditPost(post.id, editedText[post.id])}>
                                        Save
                                    </button>
                            </div>
                        )}
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