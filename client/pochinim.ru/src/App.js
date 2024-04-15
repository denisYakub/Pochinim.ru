import {Fragment} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import '../src/design/buttons/Buttons.css';

import '../src/design/wrappers/PhaseWrappers.css';
import '../src/design/wrappers/LocationChooseWrappers.css';
import '../src/design/wrappers/HintWrappers.css';
import '../src/design/wrappers/PhotoWrappers.css';

import '../src/design/Inputs/TextInputs.css';
import '../src/design/options/Options.css';

import SignInUp from './components/SignInUp/SignInUp';
import Navbar from './components/Navigation/NavigationBar';
import ListOfTopics from './components/SearchPage/SearchPageOfTopics';
import MainPage from './components/MainPage/MainpageList';
import Footer from './components/Footer/Footer';
import UserProfile from './components/UserProfile/UserProfile';
import CreateTopic from './components/CreateTopic/CreateTopic';
import SignInUpAsMaster from './components/SignUpAsMaster/SignUpAsMaster';


function App(){

  return (
    <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path='/SignInUp' element={<SignInUp />}/>
            <Route path='/Search' element={<ListOfTopics  />}/>
            <Route path='/UserProfile' element={<UserProfile  />}/>
            <Route path='/CreateTopic' element={<CreateTopic  />}/>
            <Route path='/SignInUpAsMaster' element={<SignInUpAsMaster />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;