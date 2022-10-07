import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';
import Toast from './components/Toast';
import useToast from './hooks/toast';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const toasts = useSelector(state => state.toast.toasts);
  const { deleteToast } = useToast();
  return (
    <Router>
      <NavBar />
      <Toast 
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            if (route.auth) {
              return <ProtectedRoute
                path={route.path} 
                component={route.component}
                key={route.path} 
              />
            }
            return <Route 
              key={route.path} 
              exact 
              path={route.path} 
              component={route.component} 
            />
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;