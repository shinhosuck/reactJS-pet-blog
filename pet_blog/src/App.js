import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

// Layouts
import RootLayout from './layouts/RootLayout';
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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<ScrollToTop />}>
      <Route path='/' element={<RootLayout />} >
        <Route index element={<LandingPage />}/>
        <Route element={<ContentLayout/>}>
          <Route path='posts' element={<PostList/>} />
          <Route path='post/:id/detail' element={<PostDetail/>} />
          <Route path='create/post' element={<CreatePost />}/>
          <Route path='my-posts' element={<MyPost />}/>
          <Route path='my-comments' element={<MyComment />}/>
          <Route path='topic/:name/posts' element={<TopicPosts />}/>
          <Route path='update/:id/post' element={<UpdatePost />}/>
          <Route path='register' element={<Register />}/>
          <Route path='login' element={<Login />}/>
          <Route path='logout' element={<Logout />}/>
          <Route path='error' element={<Error />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Route>
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
