import {Fragment, useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { contextCreatetopic } from './contexts/contextCreatetopic';
import { contextLocation } from './contexts/contextLocation';
import { contextOrder } from './contexts/contextOrder';

import SignInUp from './components/Pages/SignInUp/SignInUp';
import Navbar from './components/Navigation/NavigationBar';
import ListOfTopics from './components/Pages/SearchPage/SearchPageOfTopics';
import MainPage from './components/Pages/MainPage/MainpageList';
import Footer from './components/Footer/Footer';
import UserProfile from './components/Pages/UserProfile/UserProfile';
import CreateTopic from './components/Pages/CreateTopic/CreateTopic';
import SignUpAsMaster from './components/Pages/SignUpAsMaster/SignUpAsMaster';
import HelpPage from './components/Pages/HelpPage/HelpPage';
import MasterProfile from './components/Pages/MasterProfile/MasterProfile';
import MyOrders from './components/Pages/UserOrders/UserOrders';
import Order from './components/Pages/Order/Order';
import SignInAsMaster from './components/Pages/SignInAsMaster/SignInAsMaster';

import './components/UI-KIT/uiKit.css';
import Chats from './components/Pages/Chats/Chats';

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

  const [order, setOrder] = useState({});

  return (
    <Fragment>
        <BrowserRouter>
          <contextCreatetopic.Provider value={{ topic, setTopic, FIO, setFIO, phoneNumber, setphoneNumber, need, setNeed,
                                              problem, setProblem, problemLocation, setProblemLocation, address, setAddress,
                                              date, setDate, paymentOption, setPaymentOption, detailsText, setDetailsText, detailsFiles, setDetailsFiles,
                                              idLeftButtonsComps, setIdLeftButtonsComps}}>
          <contextLocation.Provider value={{locations, location, setLocation, cities, city, setCity}}>
          <contextOrder.Provider value={{order, setOrder}}>                                   
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage  />}/>
            <Route path='/SignInUp' element={<SignInUp />}/>
            <Route path='/SignUpAsMaster' element={<SignUpAsMaster />}/>
            <Route path='/SignInAsMaster' element={<SignInAsMaster />}/>
            <Route path='/Search' element={<ListOfTopics  />}/>
            <Route path='/UserProfile/:email' element={<UserProfile  />}/>
            <Route path='/CreateTopic/:email' element={<CreateTopic  />}/>
            <Route path='/:pev_page/MasterProfile/:id' element={<MasterProfile />}/>
            <Route path='/HelpPage' element={<HelpPage />}/>
            <Route path='/MyOrders/:email'>
              <Route index element={<MyOrders />} />
              <Route path='Order/:id'>
                <Route index element={<Order />} />
                <Route path='Chats/:with' element={<Chats />}/>
              </Route>
            </Route>
          </Routes>
          </contextOrder.Provider> 
          </contextLocation.Provider> 
          </contextCreatetopic.Provider>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;