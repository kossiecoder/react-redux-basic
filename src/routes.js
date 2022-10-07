import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';
import AdminPage from './pages/AdminPage';
import ShowPage from './pages/ShowPage';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/blogs',
    component: ListPage
  },
  {
    path: '/admin',
    component: AdminPage,
    auth: true
  },
  {
    path: '/blogs/create',
    component: CreatePage,
    auth: true
  },
  {
    path: '/blogs/:id/edit',
    component: EditPage,
    auth: true
  },
  {
    path: '/blogs/:id',
    component: ShowPage
  }
];

export default routes;