import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminLogin from './Pages/adminPage/AdminLogin';
import AdminPage from './Pages/adminPage/AdminPage';
import AddPost from './Pages/adminPage/AddPost';
import MaintainPost from './Pages/adminPage/MaintainPost';
import MaintainComment from './Pages/adminPage/MaintainComment';
import UpdatePost from './Pages/adminPage/UpdatePost';
import PostDetail from './Pages/PostDetail';
import UpdateCommentPage from './Pages/adminPage/UpdateCommentPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact component = {LandingPage} path="/" />
          <Route exact component ={Login} path="/login" />
          <Route exact component ={Register} path ="/register" />
          <Route exact component={AdminLogin} path="/adminLogin" />
          <Route exact component = {AdminPage} path="/dashboard" />
          <Route exact component = {AddPost} path = "/addPost"/>
          <Route exact component = {MaintainPost} path = "/managePost" />
          <Route exact component = {UpdatePost} path = "/managePost/updatePost/:id" />
          <Route exact component = {UpdateCommentPage} path ="/manageComment/updateComment/:id" />
          <Route exact component = {MaintainComment} path = "/manageComment" />
          <Route exact component = {PostDetail} path = "/postDetail/:id" />
        </Switch>
      </Router>
    </div>
  )
}
export default App;
