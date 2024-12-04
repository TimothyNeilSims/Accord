import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import  supabase  from '../client'


const CreatePost = () => {

    const [post, setPost] = useState({
        title: "", 
        description: "", 
        flags: "General", 
        secretKey: "",
        hasSecretKey: false,
        imageURL: ""
    })

    const createPost = async (event) => {
        event.preventDefault();

        if (!post.title || !post.description) {
            alert('Please fill all required fields');
            return;
        }

        await supabase
            .from('Posts')
            .insert({ title: post.title, description: post.description, flags: post.flags, secretKey: post.secretKey, hasSecretKey: post.hasSecretKey, imageURL: post.imageURL})
            .select();

        window.location = "/";
    }

    const handleChange = (event) => {
        const { name, type, checked } = event.target;
        let value = type === 'checkbox' ? checked : event.target.value;
    
        if (name === 'hasSecretKey' && value === undefined) {
            value = false;
        }
    
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
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <input type="text" id="description" name="description" onChange={handleChange} /><br />
                <br />

                <label htmlFor="imageURL">Image or YouTube URL</label><br />
                <input type="text" id="imageURL" name="imageURL" onChange={handleChange} /><br />
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

                <label htmlFor="hasSecretKey">Enable secret key</label><br />
                <input type="checkbox" id="hasSecretKey" name="hasSecretKey" onChange={handleChange} checked={post.hasSecretKey} />
                <br />

                {post.hasSecretKey && (
                    <>
                        <label htmlFor="secretKey">Secret Key</label><br />
                        <input type="text" id="secretKey" name="secretKey" onChange={handleChange} /><br />
                        <br />
                    </>
                )}
                <br />
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost