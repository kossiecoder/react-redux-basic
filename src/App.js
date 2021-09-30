import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import BlogForm from './components/BlogForm';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            Home Page
          </Route>
          <Route path="/blogs">
            <BlogForm />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;