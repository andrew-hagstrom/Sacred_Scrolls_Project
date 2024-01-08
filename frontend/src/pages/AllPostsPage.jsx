import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext, useParams, Link } from 'react-router-dom';
import { api } from '../utilities/ApiUtilities'; 

function AllPostsPage() {
    // const [posts, setUserPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const { setUserPosts, user, posts, allposts, setAllPosts} = useOutletContext();
    const [editedText, setEditedText] = useState('');


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

    const handleEditPost = async (postId, newText) => {
        try {
            const response = await api.put(`posts/${user}/post/${postId}/`, {
                text: newText,
            });
    
            if (response.status === 200) {
                // Update the local posts list with the edited post
                const updatedPosts = allposts.map((post) =>
                    post.id === postId ? { ...post, text: newText } : post
                );
                setAllPosts(updatedPosts);
                console.log('Post updated successfully:', response.data);
    
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

    // <Link to={`/text-compare/${allposts.book.toLowerCase().startsWith('surah') 
    //         ? 'quran'
    //         : allposts.book.toLowerCase().startsWith('bhagavad')
    //         ? 'bhagavadgita'
    //         : allposts.book.toLowerCase()}/${allposts.chapter}/${allposts.verse}/`}>

    //       {allposts.book} {allposts.chapter}:{allposts.verse}
    //     </Link>

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>Posts</h2>
            <div>
            {Array.isArray(sortedPosts) && sortedPosts.length > 0 ? (
                <div >
                    {sortedPosts.map((allpost) => (
                        <div className="posts-card" key={allpost.id}> 
                        {allpost.formatted_timestamp} <br></br>
                        User: {allpost.username} <br></br>
                        Comment:<span style={{ color: "purple" }}> "{allpost.text}"</span> <br></br>
                        Reference:   
                        <Link to={`/text-compare/${allpost.book.toLowerCase().startsWith('surah') ? 'quran' : allpost.book.toLowerCase().includes('yoga') ? 'bhagavadgita' : allpost.book.toLowerCase()}/${allpost.chapter}/${allpost.verse}/`}> 
                        {allpost.book} {allpost.chapter}:{allpost.verse}</Link>
                    {user === allpost.username && (
                        <div>
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handlePostDelete(allpost.id)}>
                                Delete
                            </button>
                            <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => setEditedText({
                                ...editedText,
                                [allpost.id]: allpost.text
                                    })}>
                                        Edit
                                    </button>
                            {editedText[allpost.id] && (
                            <div>
                                <textarea
                                    value={editedText[allpost.id]}
                                    onChange={(e) => setEditedText({
                                    ...editedText,
                                    [allpost.id]: e.target.value
                                        })}
                                    ></textarea>
                                    <button style={{background:'transparent', borderRadius: '5px'}} onClick={() => handleEditPost(allpost.id, editedText[allpost.id])}>
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