import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// Layouts
import ContentLayout from './layouts/ContentLayout';

// Pages
import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import MyPost from './pages/MyPost';
import MyComment from './pages/MyComment';
import TopicPosts from './pages/TopicPosts';
import UpdatePost from './pages/UpdatePost';
import ScrollToTop from './components/ScrollToTop';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';
import SearchResults from './pages/SearchResults';
import UserDashboard from './pages/UserDashboard';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import DashboardHome from './pages/DashboardHome';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ScrollToTop />}>
        <Route path='/' element={<ContentLayout/>}>
          <Route index element={<LandingPage />}/>
          <Route path='posts' element={<PostList/>} />
          <Route path='post/:id/detail' element={<PostDetail/>} />
          <Route path='create/post' element={<CreatePost />}/>
          <Route path='topic/:name/posts' element={<TopicPosts />}/>
          <Route path='update/:id/post' element={<UpdatePost />}/>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='logout' element={<Logout />}/>
          <Route path='posts/search/results' element={<SearchResults />}/>
          <Route path='user/:username/dashboard' element={<UserDashboard />} >
            <Route index element={<DashboardHome />} />
            <Route path='posts' element={<MyPost />}/>
            <Route path='comments' element={<MyComment />}/>
            <Route path='contact' element={<Contact />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
          <Route path='error' element={<Error />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Route>
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
