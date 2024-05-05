import {Fragment, useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { contextCreatetopic } from './contexts/contextCreatetopic';
import { contextLocation } from './contexts/contextLocation';
import { contextOrder } from './contexts/contextOrder';
import { contextChats } from './contexts/contextChats';

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
import TOPIC from './Classes/Topic-class';

function App(){

  const locations = [[55.75, 37.57], [59.57, 30.19]]
  const [location, setLocation] = useState(locations[0]);
  const cities = ['Москва', 'Санкт-Петербург'];
  const [city, setCity] = useState(cities[0]);

  const [order, setOrder] = useState({});
  const [chats, setChats] = useState([]);
  const [companionInfo, setCompanionInfo] = useState({});
  
  return (
    <Fragment>
        <BrowserRouter>
          <contextCreatetopic.Provider value={TOPIC}>
          <contextLocation.Provider value={{locations, location, setLocation, cities, city, setCity}}>
          <contextOrder.Provider value={{order, setOrder}}>    
          <contextChats.Provider value={{chats, setChats, companionInfo, setCompanionInfo}}>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage  />}/>
              <Route path='/SignInUp' element={<SignInUp />}/>
              <Route path='/SignUpAsMaster' element={<SignUpAsMaster />}/>
              <Route path='/SignInAsMaster' element={<SignInAsMaster />}/>
              <Route path='/Search' element={<ListOfTopics  />}/>
              <Route path='/UserProfile/:email' element={<UserProfile  />}/>
              <Route path='/CreateTopic/:email'>
                <Route index element={<CreateTopic  />} />
                <Route path='Chats/:with/:id' element={<Chats />}/>
              </Route>
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
          </contextChats.Provider>                              
          </contextOrder.Provider> 
          </contextLocation.Provider> 
          </contextCreatetopic.Provider>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;