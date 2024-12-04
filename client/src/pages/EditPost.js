import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../client'
import './EditPost.css'

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        description: "",
        flags: "",
        hasSecretKey: false,
        secretKey: "",
        imageURL: ""
    });
    const [enteredSecretKey, setEnteredSecretKey] = useState('');


    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id);

            if (data && data.length > 0) {
                setPost(data[0]);
            } else {
                alert('Post not found');
                window.location = "/";
            }
        };

        fetchPost();
    }, [id]);

    const updatePost = async (event) => {
        event.preventDefault();

        if (!post.title || !post.description || !post.flags) {
            alert('Please fill all required fields');
            return;
        }

        if (post.hasSecretKey && post.secretKey !== enteredSecretKey) {
            alert('Incorrect secret key');
            return;
        }

        let updatedPost = {
            title: post.title,
            flags: post.flags,
            description: post.description,
            imageURL: post.imageURL
        };

        await supabase
            .from('Posts')
            .update(updatedPost)
            .eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();

        if (post.hasSecretKey && post.secretKey !== enteredSecretKey) {
            alert('Incorrect secret key');
            return;
        }

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = "/";
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <input type="text" id="description" name="description" value={post.description} onChange={handleChange} /><br />
                <br />

                <label htmlFor="imageURL">Image or YouTube URL</label><br />
                <input type="text" id="imageURL" name="imageURL" value={post.imageURL} onChange={handleChange} /><br />
                <br />

                <label htmlFor="flags">Category</label><br />
                <select id="flags" name='flags' onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Question">Question</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Discussion">Discussion</option>
                    <option value="News">News</option>
                    <option value="Event">Event</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Educational">Educational</option>
                </select>
                <br />

                {post.hasSecretKey && (
                    <>
                        <label htmlFor="enteredSecretKey">Enter Your Key</label><br />
                        <input type="text" id="enteredSecretKey" name="enteredSecretKey" onChange={(e) => setEnteredSecretKey(e.target.value)} /><br />
                        <br />
                    </>
                )}

                <button onClick={updatePost}>Update</button>
                <button onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
}

export default EditPost;