import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import CardDetail from './pages/CardDetail';

const App = () => {
  

  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts />
    },
    {
      path:"/edit/:id",
      element: <EditPost />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path: "/card/:id",
      element: <CardDetail />
  }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <Link to="/" className='Title'>Accord</Link>
        <Link to="/" className='postButton'><button className="headerBtn"> Browse Posts  </button></Link>
        <Link to="/new" className='createPostButton'><button className="headerBtn"> Create Post </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
