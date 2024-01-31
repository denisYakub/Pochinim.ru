import {Fragment} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import SignUp from './components/SignInUp/SignUp';
import SignIn from './components/SignInUp/SignIn';
import Navbar from './components/Navigation/NavigationBar';
import ListOfTopics from './components/SearchPage/SearchPageOfTopics';
import MainPage from './components/MainPage/MainpageList';


function App(){

  return (
    <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path='/login' element={<SignIn />}/>
            <Route path='/regester' element={<SignUp  />}/>
            <Route path='/search' element={<ListOfTopics  />}/>
          </Routes>
        </BrowserRouter>
      </Fragment>);
}

export default App;