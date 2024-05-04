import { Link, useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"
import { Fragment, useContext, useEffect, useState } from 'react';
import { contextLocation } from '../../contexts/contextLocation';

const Navbar = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(null)
    const [authMaster, setAuthMaster] = useState(null)
    const [search, setSearch] = useState("")

    const { locations, location, setLocation, cities, city, setCity } = useContext(contextLocation);
    
    useEffect(() => {
        async function getAuth() {
            if(localStorage.getItem('mail')){
                setAuth(localStorage.getItem('mail'));
            }else{
                setAuth(null);
            }

            if(localStorage.getItem('mail-master')){
                setAuthMaster(localStorage.getItem('mail-master'));
            }else{
                setAuthMaster(null);
            }
        }

        getAuth();
    })

    const selectMasterHandler = (val) =>{
        if(val == 1){

        }else if(val == 2){
            navigate('/SignUpAsMaster');
        }else if(val == 3){
            authMaster?navigate('/'):navigate('/SignInAsMaster');
        }
    };

    const selectLocationHandler = (val) =>{
        setLocation(locations[val]);
        setCity(cities[val]);
        console.log(city);
        console.log(location);
    };
    
    return (<Fragment>
        <nav className="page-wrapper">
        <div className="navigation-content">
            <div className="navigation-site-logo-cities">
                <a href='/' className='site-logo'>.</a>
                <select className='select-input' onChange={e => selectLocationHandler(e.target.value)}>
                    <option value={0}>Москва</option>
                    <option value={1}>Санкт-Петербург</option>
                </select>
            </div>
            <div className="navigation-orders-forum-masters-search-users">
                <Link className='link-as-text' to={`/MyOrders/${auth}`}>Мои заказы</Link>
                <Link className='link-as-text'>Форум</Link>
                <select className='select-input' onChange={e => selectMasterHandler(e.target.value)}>
                    <option value={1}>Специалистам</option>
                    <option value={2}>Регестрация</option>
                    <option value={3}>{authMaster?authMaster:'Вход'}</option>
                </select>
                <input className='input-small'></input>
                <div className='users'>
                    {auth? 
                        <Link className='link-blue' to={`/UserProfile/${auth}`}>{auth}</Link>
                    : 
                        <Link className='link-blue' to={'/SignInUp'}>Войти</Link>}
                </div>
            </div>
        </div>
        </nav>
    </Fragment>);
};

export default Navbar