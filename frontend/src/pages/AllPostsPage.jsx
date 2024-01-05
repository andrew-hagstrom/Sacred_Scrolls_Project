import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function AllPostsPage() {
    // const [posts, setUserPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { setUserPosts, user, posts, allposts, setAllPosts} = useOutletContext();


    const sortedPosts = allposts.slice().sort((a, b) => {
        const dateA = new Date(a.formatted_timestamp);
        const dateB = new Date(b.formatted_timestamp);
        return dateB - dateA;
    });

    const handlePostDelete = async (postid) => {
        try {
            console.log(postid)
            const response = await api.delete(`posts/${user}/post/${postid}/`);
            if (response.status === 200) {
                // Post deleted successfully, update the posts list
                const updatedPosts = allposts.filter(allpost => allpost.id !== postid);
                setAllPosts(updatedPosts);
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
            {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <div >
                    {sortedPosts.map((allpost) => (

                        <div className="posts-card" key={allpost.id}> {allpost.formatted_timestamp} <br></br>
                        User: {allpost.username} <br></br>
                        Comment:<span style={{ fontSize: '25px', color: "purple" }}> "{allpost.text}"</span> <br></br>
                        Reference: <Link to={`/text-compare/${allpost.book.toLowerCase()}/${allpost.chapter}/${allpost.verse}/`}>
                        {allpost.book} {allpost.chapter}:{allpost.verse}
                    </Link>
                        {user === allpost.username && (
                            <div>
                            <button onClick={() => handlePostDelete(allpost.id)}>Delete</button>
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

export default AllPostsPage;