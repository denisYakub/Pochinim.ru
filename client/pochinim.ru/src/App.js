import {Fragment, useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { contextCreatetopic } from './contexts/contextCreatetopic';

import '../src/design/buttons/Buttons.css';

import '../src/design/wrappers/PhaseWrappers.css';
import '../src/design/wrappers/LocationChooseWrappers.css';
import '../src/design/wrappers/HintWrappers.css';
import '../src/design/wrappers/PhotoWrappers.css';
import '../src/design/wrappers/MasterCardWrappers.css';
import '../src/design/wrappers/ReviewWrappers.css';
import '../src/design/wrappers/InputFieldWithErrorWrappers.css';

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
import HelpPage from './components/HelpPage/HelpPage';
import MasterProfile from './components/MasterProfile/MasterProfile';

function App(){

  const [topic, setTopic] = useState("");
  const [FIO, setFIO] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [need, setNeed] = useState("");
  const [problem, setProblem] = useState("");
  const [problemLocation, setProblemLocation] = useState("");
  const [address, setAddress] = useState("Поставте метку на карте");
  const [date, setDate] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [detailsText, setDetailsText] = useState("");
  const [detailsFiles, setDetailsFiles] = useState(null);

  return (
    <Fragment>
        <BrowserRouter>
        <contextCreatetopic.Provider value={{ topic, setTopic, FIO, setFIO, phoneNumber, setphoneNumber, need, setNeed,
                                              problem, setProblem, problemLocation, setProblemLocation, address, setAddress,
                                              date, setDate, paymentOption, setPaymentOption, detailsText, setDetailsText, detailsFiles, setDetailsFiles}}>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path='/SignInUp' element={<SignInUp />}/>
            <Route path='/SignInUpAsMaster' element={<SignInUpAsMaster />}/>
            <Route path='/Search' element={<ListOfTopics  />}/>
            <Route path='/UserProfile' element={<UserProfile  />}/>
            <Route path='/CreateTopic' element={<CreateTopic  />}/>
            <Route path='/:pev_page/MasterProfile' element={<MasterProfile />}/>
            <Route path='/HelpPAge' element={<HelpPage />}/>
          </Routes>
          </contextCreatetopic.Provider>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;