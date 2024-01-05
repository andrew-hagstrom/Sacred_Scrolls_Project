import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function UserPostsPage() {
    // const [posts, setUserPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { user, posts } = useOutletContext();


    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Posts</h2>
            <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                <div >
                    {posts.map((post) => (
                        <div className="posts-card" key={post.id}> {post.timestamp} <br></br>Comment: "{post.text}" <br></br>Reference: {post.book} {post.chapter}:{post.verse} </div>
                    ))}
                </div>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    </div>
)};

export default UserPostsPage;
