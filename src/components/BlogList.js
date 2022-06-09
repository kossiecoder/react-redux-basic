import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import Card from '../components/Card';
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination';
import { useLocation } from 'react-router-dom';
import propTypes from 'prop-types';
import Toast from '../components/Toast';

const BlogList = ({ isAdmin }) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchText, setSearchText] = useState('');
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfPosts/limit));
  }, [numberOfPosts]);

  const onClickPageButton = (page) => {
    history.push(`${location.pathname}?page=${page}`)
    setCurrentPage(page);
    getPosts(page);
  }
  
  const getPosts = useCallback((page = 1) => {
    let params = {
      _page: page,
      _limit: limit,
      _sort: 'id',
      _order: 'desc',
      title_like: searchText
    }

    if (!isAdmin) {
      params = { ...params, publish: true };
    }

    axios.get(`http://localhost:3001/posts`, {
      params
    }).then((res) => {
      setNumberOfPosts(res.headers['x-total-count']);
      setPosts(res.data);
      setLoading(false);
    })
  }, [isAdmin, searchText])

  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1)
  }, []);

  const deleteBlog = (e, id) => {
    e.stopPropagation();
    
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    });
  };
  
  if (loading) {
    return (
      <LoadingSpinner />
    );
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

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      history.push(`${location.pathname}?page=1`)
      setCurrentPage(1);
      getPosts(1);
    }
  }

  return (
    <div>
      <Toast
        toasts={[
          { text: 'error'},
          { text: 'success', type: 'success'},
        ]}
      />
      <input 
        type="text"
        placeholder="Search.."
        className="form-control"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyUp={onSearch}
      />
      <hr />
      {posts.length === 0 
        ? <div>No blog posts found</div> 
        : <>
          {renderBlogList()}
          {numberOfPages > 1 && <Pagination 
            currentPage={currentPage} 
            numberOfPages={numberOfPages} 
            onClick={onClickPageButton}
          />}
        </>}
      
    </div>
  )
};

BlogList.propTypes = {
  isAdmin: propTypes.bool
};

BlogList.defaultProps = {
  isAdmin: false
}

export default BlogList;