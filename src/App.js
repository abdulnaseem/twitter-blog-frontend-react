import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register/register.component'
import Login from './components/login/login.component'
import Navigation from './components/Navbar/navbar.component'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/dashboard';
import Posts from './components/posts/posts.component';
import Post from './components/auth-post/post.component';
import ReplyPost from './components/reply-post/reply-post.component';
import UserSearch from './components/user-search/user-search.component';
import { LOGOUT } from './actions/types';

//redux
import { Provider } from 'react-redux'
import store from './store'



const App = () => {

  useEffect(() => {
    if(localStorage.token) {
      setAuthToken(localStorage.token)
      console.log(localStorage.token)
    }

    store.dispatch(loadUser())

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    })
  }, [])

  

  return (
    <>
      <Provider store={store}>
        <Router>
          <Navigation />
          <Alert />
          <Routes>
            <Route path='/' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route exact path='/posts' element={<Posts />}></Route>
            <Route exact path='/post' element={<Post />}></Route>
            <Route exact path='/post/:id' element={<ReplyPost />}></Route>
            <Route exact path='/search' element={<UserSearch />}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  )

}

export default App;