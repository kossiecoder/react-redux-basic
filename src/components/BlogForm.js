import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { bool } from 'prop-types';

const BlogForm = ({ editing }) => {
  const history = useHistory();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [body, setBody] = useState('');
  const [originalBody, setOriginalBody] = useState('');

  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:3001/posts/${id}`).then(res => {
        setTitle(res.data.title);
        setOriginalTitle(res.data.title);
        setBody(res.data.body);
        setOriginalBody(res.data.body);
      })
    }
  }, [id, editing]);

  const isEdited = () => {
    console.log('a')
    return title !== originalTitle || body !== originalBody;
  };

  const goBack = () => {
    if (editing) {
      history.push(`/blogs/${id}`);
    } else {
      history.push('/blogs');
    }
  };

  const onSubmit = () => {
    if (editing) {
      axios.patch(`http://localhost:3001/posts/${id}`, {
        title,
        body,
      }).then(res => {
        console.log(res);
        history.push(`/blogs/${id}`)
      })
    } else {
      axios.post('http://localhost:3001/posts', {
        title,
        body,
        createdAt: Date.now()
      }).then(() => {
        history.push('/blogs');
      })
    }
  };

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input 
          className="form-control" 
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Body</label>
        <textarea 
          className="form-control" 
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
          }}
          rows="10"
        />
      </div>
      <button 
        className="btn btn-primary"
        onClick={onSubmit}
        disabled={editing && !isEdited()}
      >
        {editing ? 'Edit' : 'Post' }
      </button>
      <button 
        className="btn btn-danger ms-2"
        onClick={goBack}
      >
        Cancel
      </button>
    </div>
  );
};

BlogForm.propTypes = {
  editing: bool
}

BlogForm.defaultProps = {
  editing: false
}

export default BlogForm;