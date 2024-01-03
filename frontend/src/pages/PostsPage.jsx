import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { user, user_id } = useOutletContext();

    const fetchPosts = async () => {
        try {
            const response = await api.get(`posts/`);
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

        try {
            const response = await api.post(`posts/${user_id}/`, { text: newPostContent });
            console.log('Post created:', response.data);
            fetchPosts();
            // Clear the new post input field after submission
            setNewPostContent('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };
      

    return (
        <div>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post..."
                ></textarea>
                <button type="submit">Submit Post</button>
            </form>
            <div>
            <h2>Posts:</h2>
            {Array.isArray(posts) && posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>{post.user_id}: "{post.text}"</li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    </div>
)};

export default PostsPage;
