import React, { useState, useEffect } from 'react';
import supabase from '../client';
import { useParams, Link } from 'react-router-dom';
import './CardDetail.css';



const CardDetail = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [count, setCount] = useState(0)

    const updateCount = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ upvotes: count + 1 })
            .eq('id', card.id)

        setCount((count) => count + 1);
    }

    useEffect(() => {
        const fetchCardDetails = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching card details:', error);
            } else {
                setCard(data);
                setComments(data.comments || []);
                setCount(data.upvotes || 0);
            }
        };

        fetchCardDetails();
    }, [id]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        if (!newComment) {
            alert('Please fill all required fields');
            return;
        }

        const updatedComments = [...comments, newComment];
        const { error } = await supabase
            .from('Posts')
            .update({ comments: updatedComments })
            .eq('id', id);

        if (error) {
            console.error('Error updating comments:', error);
        } else {
            setComments(updatedComments);
            setNewComment('');
        }
    };

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = card && card.imageURL ? getYouTubeVideoId(card.imageURL) : null;
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;


    if (!card) {
        return <div className='loading-animation'>Loading...</div>;
    }

    return (
        <div className='post'>
            <div className='postInfo'>
                <p className='time'>Posted at: {new Date(card.created_at).toLocaleString()}</p>
                <h2 className='title'>{card.title}</h2>
                <p className='description'>{card.description}</p>

                {embedUrl && (
                    <div className='videoContainer'>
                        <iframe
                            width="560"
                            height="315"
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className='postVideo'
                        ></iframe>
                    </div>
                )}

                {!embedUrl && card.imageURL && <img src={card.imageURL} alt='post' className='postImage' />}

                <div className='Upvotes'>
                
                <button className="betButton" onClick={updateCount} >👍 {count}</button>
                <Link to={'/edit/' + card.id} className='betButton'>Edit</Link>
                </div>
                
                
            </div>


            <h3>Comments:</h3>
            <div className='comments'>
                {comments ? (
                    comments.map((comment, index) => (
                        <p key={index}>-- {comment}</p>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}
                        required
                    />
                    <button type="submit">Post Comment</button>
                </form>
            </div>

        </div>
    );
}

export default CardDetail;