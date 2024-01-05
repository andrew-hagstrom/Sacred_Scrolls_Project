import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function UserPostsPage() {
    // const [posts, setUserPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { setUserPosts, user, posts } = useOutletContext();

    const handlePostDelete = async (postid) => {
        try {
            // let token = localStorage.getItem("token")
            // axios.defaults.headers.common["Authorization"] = `Token ${token}`;
            
            console.log(postid)
            const response = await api.delete(`posts/${user}/post/${postid}/`);
            if (response.status === 200) {
                // Post deleted successfully, update the posts list
                const updatedPosts = posts.filter(post => post.id !== postid);
                setUserPosts(updatedPosts);
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

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Posts</h2>
            <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                <div >
                    {posts.map((post) => (

                        <div className="posts-card" key={post.id}> {post.formatted_timestamp} <br></br>
                        
                        Comment: "{post.text}" <br></br>
                        Reference: {post.book} {post.chapter}:{post.verse} 
                        <button className="delete-button" onClick={() => handlePostDelete(post.id)}>Delete</button>
                        </div>
                    ))}
                </div>
                
            ) : (
                <p>No posts available</p>
            )}
        </div>
    </div>
)};

export default UserPostsPage;
