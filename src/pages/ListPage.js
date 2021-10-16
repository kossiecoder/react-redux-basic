import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom'; 
import { useHistory } from 'react-router';

const ListPage = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((res) => {
      setPosts(res.data);
    })
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h1>Blogs</h1>
        <div>
          <Link to="/blogs/create" className="btn btn-success">
            Create New
          </Link>
        </div>
      </div>
      {posts.map(post => {
        return (
          <Card 
            key={post.id} 
            title={post.title} 
            onClick={() => history.push('/blogs/edit')} 
          />
        );
      })}
    </div>
  );
};

export default ListPage;