import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';

function App() {
  return (
    <Router>
      <NavBar />
      
      <div className="container">
        <Switch>
          {routes.map((route) => {
            return <Route key={route.path} exact path={route.path} component={route.component} />;
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;