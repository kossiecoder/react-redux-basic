import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { bool } from 'prop-types';
import Pagination from './Pagination';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = (page = 1) => {
    setCurrentPage(page);
    let params = {
      _page: page,
      _limit: 5,
      _sort: 'id',
      _order: 'desc',
    }

    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios.get(`http://localhost:3001/posts`, {
      params
    }).then((res) => {
      setPosts(res.data);
      setLoading(false);
    })
  }

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  
  if (posts.length === 0) {
    return (<div>No blog posts found</div>)
  }
  const renderBlogList = () => {
    return posts.map(post => {
      return (
        <Card 
          key={post.id} 
          title={post.title} 
          onClick={() => history.push(`/blogs/${post.id}`)} 
        >
          {isAdmin ? (<div>
            <button 
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteBlog(e, post.id)}
            >
              Delete
            </button>
          </div>) : null}
        </Card>
      );
    })
  }

  return (
    <div>
      {renderBlogList()}
      <Pagination 
        currentPage={currentPage} 
        numberOfPages={3} 
        onClick={getPosts}
      />
    </div>
  )
};

BlogList.propTypes = {
  isAdmin: bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;