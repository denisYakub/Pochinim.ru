import {Fragment, useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { contextCreatetopic } from './contexts/contextCreatetopic';
import { contextLocation } from './contexts/contextLocation';

import '../src/design/buttons/Buttons.css';

import '../src/design/wrappers/PhaseWrappers.css';
import '../src/design/wrappers/LocationChooseWrappers.css';
import '../src/design/wrappers/HintWrappers.css';
import '../src/design/wrappers/PhotoWrappers.css';
import '../src/design/wrappers/MasterCardWrappers.css';
import '../src/design/wrappers/ReviewWrappers.css';
import '../src/design/wrappers/InputFieldWithErrorWrappers.css';
import '../src/design/wrappers/ProfileWrappers.css';
import '../src/design/wrappers/UserCardWrappers.css';
import '../src/design/wrappers/EditableBlocksWrappers.css';

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
import MyOrders from './components/UserOrders/UserOrders';
import Order from './Order/Order';

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
  const [idLeftButtonsComps, setIdLeftButtonsComps] = useState(2); 

  const locations = [[55.75, 37.57], [59.57, 30.19]]
  const [location, setLocation] = useState(locations[0]);
  const cities = ['Москва', 'Санкт-Петербург'];
  const [city, setCity] = useState(cities[0]);

  return (
    <Fragment>
        <BrowserRouter>
          <contextCreatetopic.Provider value={{ topic, setTopic, FIO, setFIO, phoneNumber, setphoneNumber, need, setNeed,
                                              problem, setProblem, problemLocation, setProblemLocation, address, setAddress,
                                              date, setDate, paymentOption, setPaymentOption, detailsText, setDetailsText, detailsFiles, setDetailsFiles,
                                              idLeftButtonsComps, setIdLeftButtonsComps}}>
          <contextLocation.Provider value={{locations, location, setLocation, cities, city, setCity}}>                                    
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path='/SignInUp' element={<SignInUp />}/>
            <Route path='/SignInUpAsMaster' element={<SignInUpAsMaster />}/>
            <Route path='/Search' element={<ListOfTopics  />}/>
            <Route path='/UserProfile/:email' element={<UserProfile  />}/>
            <Route path='/CreateTopic/:email' element={<CreateTopic  />}/>
            <Route path='/:pev_page/MasterProfile/:id' element={<MasterProfile />}/>
            <Route path='/HelpPage' element={<HelpPage />}/>
            <Route path='/MyOrders/:email' element={<MyOrders />}/>
            <Route path='/:pev_page/Order/:id' element={<Order />}/>
          </Routes>
          </contextLocation.Provider> 
          </contextCreatetopic.Provider>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;