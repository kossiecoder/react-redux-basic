import { useParams } from "react-router";
import axios from 'axios';
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ShowPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const getPost = (id) => {
    axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
      setPost(res.data)
      setLoading(false);
    })
  };

  useEffect(() => {
    getPost(id)
  }, [id])

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div className="d-flex">
        <h1 className="flex-grow-1">{post.title}</h1>
        {isLoggedIn && <div>
          <Link 
            className="btn btn-primary"
            to={`/blogs/${id}/edit`}
          >
            Edit
          </Link>
        </div>}
      </div>
      <small className="text-muted">
        Created At: {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>
    </div>
  );
};

export default ShowPage;