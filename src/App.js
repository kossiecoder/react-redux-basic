import { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const onSubmit = () => {
    axios.post('http://localhost:3001/posts', {
      title,
      body
    })
  };

  return (
    <Router>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">Home</Link>
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact>
          Home Page
        </Route>
        <Route path="/blogs">
          <div className="container">
            <h1>Create a blog post</h1>
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
                rows="20"
              />
            </div>
            <button 
              className="btn btn-primary"
              onClick={onSubmit}
            >
              Post
            </button>
          </div>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;