import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function PassagePostsPage() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { user } = useOutletContext();
    const { book, chapter, verse } = useParams();

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
      

    return (
        <div>
            <h2>{book.charAt(0).toUpperCase()+ book.slice(1).toLowerCase()} {chapter}:{verse}</h2>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Write your post..."
                ></textarea>
                <button type="submit">Submit Post</button>
            </form>
            <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}> {post.username}: "{post.text}" {post.timestamp}</li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    </div>
)};

export default PassagePostsPage;
