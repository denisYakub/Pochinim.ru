import {Fragment, useState, useEffect} from 'react';
import "./components/styles.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";

import SignUp from './components/SignInUp/SignUp';
import SignIn from './components/SignInUp/SignIn';
import Navbar from './components/NavigationBar';
import ListOfTopics from './components/SearchPageOfTopics';
import User from './models/USER-model';


function App(){

  const user = new User();
  if(localStorage.getItem('token')){
    getData();
  }
  async function getData(){
    await user.checkAuth();
  }

  return (
    <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Main Window: {localStorage.getItem('token')}</h1>}/>
            <Route path='/login' element={<SignIn />}/>
            <Route path='/regester' element={<SignUp  />}/>
            <Route path='/search' element={<ListOfTopics  />}/>
          </Routes>
        </BrowserRouter>
      </Fragment>);
}

export default App;