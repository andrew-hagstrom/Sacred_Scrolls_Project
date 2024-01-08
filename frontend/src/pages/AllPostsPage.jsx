import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function AllPostsPage() {
    // const [posts, setUserPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { setUserPosts, user, allPosts, setAllPosts} = useOutletContext();
    const [editedText, setEditedText] = useState('');


    const sortedPosts = allPosts.slice().sort((a, b) => {
        const dateA = new Date(a.formatted_timestamp);
        const dateB = new Date(b.formatted_timestamp);
        return dateB - dateA;
    });

    const handlePostDelete = async (postId) => {
        try {
            console.log(postId)
            const response = await api.delete(`posts/${user}/post/${postId}/`);
            if (response.status === 200) {
                // Post deleted successfully, update the posts list
                const updatedPosts = allPosts.filter(allPost => allPost.id !== postId);
                setAllPosts(updatedPosts);
                // console.log("post deleted successfully")
            } else {
                // Handle deletion failure
                console.error('Failed to delete post');
            }
        } catch (error) {
            // console.error('Error deleting post:', error);
            // Handle other error scenarios
        }
    };

    const handleEditPost = async (postId, newText) => {
        try {
            const response = await api.put(`posts/${user}/post/${postId}/`, {
                text: newText,
            });
    
            if (response.status === 200) {
                // Update the local posts list with the edited post
                const updatedPosts = allPosts.map((allpost) =>
                    allpost.id === postId ? { ...allpost, text: newText } : allpost
                );
                setAllPosts(updatedPosts);
                console.log('Post updated successfully:', response.data);
    
                setEditedText(prevState => {
                    const updatedEditedTexts = { ...prevState };
                    delete updatedEditedTexts[postId];
                    return updatedEditedTexts;
                });
            } else {
                // console.error('Failed to update post');
            }
        } catch (error) {
            // console.error('Error editing post:', error);
        }
    };

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Posts</h2>
            <div>
            {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <div >
                    {sortedPosts.map((allPost) => (
                        <div className="posts-card" key={allPost.id}> 
                        {allPost.formatted_timestamp} <br></br>
                        User: {allPost.username} <br></br>
                        Comment:<span style={{ color: "purple" }}> "{allPost.text}"</span> <br></br>
                        Reference:   
                        <Link to={`/text-compare/${allPost.book.toLowerCase().startsWith('surah') ? 'quran' : allPost.book.toLowerCase().includes('yoga') ? 'bhagavadgita' : allPost.book.toLowerCase()}/${allPost.chapter}/${allPost.verse}/`}> 
                        {allPost.book} {allPost.chapter}:{allPost.verse}</Link>
                    {user === allPost.username && (
                        <div>
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handlePostDelete(allPost.id)}>
                                Delete
                            </button>
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => setEditedText({
                                ...editedText,
                                [allPost.id]: allPost.text
                                    })}>
                                        Edit
                                    </button>
                            {editedText[allPost.id] && (
                            <div>
                                <textarea
                                    value={editedText[allPost.id]}
                                    onChange={(e) => setEditedText({
                                    ...editedText,
                                    [allPost.id]: e.target.value
                                        })}
                                    ></textarea>
                                    <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handleEditPost(allPost.id, editedText[allPost.id])}>
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
)
            }

export default AllPostsPage
