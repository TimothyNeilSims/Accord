import React, { useState, useEffect } from 'react';
import  supabase  from '../client';
import Card from '../components/Card.js';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState('recent');
    const [searchTerm, setSearchTerm] = useState(''); 
    const [flagFilter, setFlagFilter] = useState(''); 


    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select('*');

            setPosts(data || []);
        };

        fetchPosts();
    }, []);

    const sortedPosts = [...posts].sort((a, b) => {
        switch (sortType) {
            case 'recent':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'oldest':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'mostUpvotes':
                return b.upvotes - a.upvotes;
            case 'leastUpvotes':
                return a.upvotes - b.upvotes;
            default:
                return posts;
        }
    });

    const filteredPosts = sortedPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (flagFilter === '' || post.flags === flagFilter) 
    );

    if (!filteredPosts || filteredPosts.length === 0) {
        return (
            <div className="loading-animation">
                Loading...
            </div>
        );
    }

    return (
        <div>
            <input type="text" placeholder="Search by title" onChange={(e) => setSearchTerm(e.target.value)} /> 
            <div className='sort'>
            <p>Order by: </p>
            <button onClick={() => setSortType('recent')}>Sort by Most Recent</button>
            <button onClick={() => setSortType('oldest')}>Sort by Oldest</button>
            <button onClick={() => setSortType('mostUpvotes')}>Sort by Most Upvotes</button>
            <button onClick={() => setSortType('leastUpvotes')}>Sort by Least Upvotes</button>
            </div>
            <select onChange={(e) => setFlagFilter(e.target.value)}> 
            <option value="">Select a category</option>
            <option value="General">General</option>
            <option value="Question">Question</option>
            <option value="Opinion">Opinion</option>
            <option value="Discussion">Discussion</option>
            <option value="News">News</option>
            <option value="Event">Event</option>
            <option value="Announcement">Announcement</option>
            <option value="Educational">Educational</option>
        </select> 
            <div className="ReadPosts">
                {
                    filteredPosts && filteredPosts.length > 0 ?
                        filteredPosts.map((post) =>
                            <Card key={post.id} id={post.id} title={post.title} created_at={post.created_at} upvotes={post.upvotes} flags={post.flags} />
                        ) : <h2>{'No Posts Yet'}</h2>
                }
            </div>
        </div>
    );
}

export default ReadPosts;