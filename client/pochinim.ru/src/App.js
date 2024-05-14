import {Fragment, useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { contextCreatetopic } from './contexts/contextCreatetopic';
import { contextWebsite } from './contexts/contextWebsite';
import { contextOrder } from './contexts/contextOrder';
import { contextChats } from './contexts/contextChats';
import { contextMaster } from './contexts/contextMaster';
import { contextUser } from './contexts/contextUser';

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
import CHATS from './Classes/Chats-class';
import WEBSITE from './Classes/WebSite-class';
import DocumentVerification from './components/Pages/DocumentsVerification/DocumentVerification';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import USER from './Classes/User-class';
import MASTER from './Classes/Master-class';
import MasterOrdersSearch from './components/Pages/MasterOrders/MasterOrdersSearch';
import NewOrderForMaster from './components/Pages/MasterOrders/NewOrderForMaster';

function App(){

  const [order, setOrder] = useState({});

  useEffect(() => {
    WEBSITE.setUserLocation();
  },[])
  
  return (
      <Fragment>
        <BrowserRouter>
          <contextCreatetopic.Provider value={TOPIC}>
          <contextWebsite.Provider value={WEBSITE}>
          <contextOrder.Provider value={{order, setOrder}}>    
          <contextChats.Provider value={CHATS}>
          <contextUser.Provider value={USER}>
          <contextMaster.Provider value={MASTER}>
            <Navbar />
            <ErrorHandler> 
              <Routes>
                <Route path="/" element={<MainPage  />}/>
                <Route path='/SignInUp' element={<SignInUp />}/>
                <Route path='/SignUpAsMaster' element={<SignUpAsMaster />}/>
                <Route path='/SignInAsMaster' element={<SignInAsMaster />}/>
                <Route path='/Search' element={<ListOfTopics  />}/>

                <Route path='/UserProfile/:email'>
                  <Route index element={<UserProfile />}/>
                  <Route path='documentVerification/:document' element={<DocumentVerification />}/>
                </Route>

                <Route path='/MasterProfile/:email'>
                  <Route index element={<MasterProfile />}/>
                  <Route path='documentVerification/:document' element={<DocumentVerification />}/>
                </Route>

                <Route path='/CreateTopic/:email'>
                  <Route index element={<CreateTopic  />} />
                  <Route path='Chats/:with' element={<Chats />}/>
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

                <Route path='/SearchOrdersForMasters'>
                  <Route index element={<MasterOrdersSearch />}></Route>
                  <Route path='NewOrder/:id_order' element={<NewOrderForMaster />}></Route>
                </Route>
                
              </Routes>
            </ErrorHandler>
          </contextMaster.Provider>
          </contextUser.Provider>
          </contextChats.Provider>                              
          </contextOrder.Provider> 
          </contextWebsite.Provider> 
          </contextCreatetopic.Provider>
          <Footer />
        </BrowserRouter>
      </Fragment>);
}

export default App;