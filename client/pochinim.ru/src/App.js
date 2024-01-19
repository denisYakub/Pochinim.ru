import {Fragment, useState} from 'react';
import "./components/styles.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";

import SignUp from './components/SignInUp/SignUp';
import SignIn from './components/SignInUp/SignIn';
import Navbar from './components/NavigationBar';
import ListOfTopics from './components/SearchPageOfTopics';
import MyProfile from './components/Profiles/MyProfile';


function App(){
  return (
    <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<h1>Main Window</h1>}/>
            <Route path="/account" element={<MyProfile  />}/>
            <Route path='/login' element={<SignIn />}/>
            <Route path='/regester' element={<SignUp  />}/>
            <Route path='/search' element={<ListOfTopics  />}/>
          </Routes>
        </BrowserRouter>
      </Fragment>);
}

export default App;