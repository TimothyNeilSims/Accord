import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) => {

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return `${Math.floor(interval)} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return `${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return `${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return `${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
        return `${Math.floor(interval)} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}


return (
  <Link to={`/card/${props.id}`} className='underline'>
    <div className="Card" >
    <p className='flag'>{props.flags}</p>
      <p className='timestamp'>Posted {timeSince(props.created_at)}</p>
      
      <h2 className='title'>{props.title}</h2>
      
      <p className='upvotes'>{props.upvotes} upvotes</p>
    </div>
  </Link>
);
};

export default Card;