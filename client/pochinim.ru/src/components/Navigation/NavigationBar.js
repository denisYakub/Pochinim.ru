import { useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"
import { Fragment, useContext, useEffect, useState } from 'react';
import USERController from '../../controllers/USER-controller';
import { contextLocation } from '../../contexts/contextLocation';

const Navbar = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(null)
    const [search, setSearch] = useState("")

    const { locations, location, setLocation, cities, city, setCity } = useContext(contextLocation);
    
    async function getAuth() {
        if(await USERController.checkForAccess()){
            setAuth(localStorage.getItem('mail'));
        }else{
            setAuth(null);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getAuth();
        }, 10);

    },[navigate])

    const submitSearch = e => {
        e.preventDefault()
        navigate('/Search', {replace: true, state:{search}})
    }

    const selectMasterHandler = (val) =>{
        if(val == 1){

        }else if(val == 2){
            navigate('/SignInUpAsMaster');
        }
    };

    const selectLocationHandler = (val) =>{
        setLocation(locations[val]);
        setCity(cities[val]);
        console.log(city);
        console.log(location);
    };
    
    return (<Fragment>
        <nav className="nav">
        <div className="inner-nav">
            <div className="rightPartOfNav">
                <a href='/' className='siteLogo'>.</a>
                <select onChange={e => selectLocationHandler(e.target.value)}>
                    <option value={0}>Москва</option>
                    <option value={1}>Санкт-Петербург</option>
                </select>
            </div>
            <div className="leftPartOfNav">
                <a href={`/MyOrders/${auth}`}>Мои заказы</a>
                <a href='/'>Форум </a>
                <select onChange={e => selectMasterHandler(e.target.value)}>
                    <option value={1}>Специалистам</option>
                    <option value={2}>Регестрация</option>
                </select>
                <form onSubmit={submitSearch}>
                    <input className='navInput' onChange={e => setSearch(e.target.value)}></input>
                </form>
                <div className='acc'>
                    {auth? <a href={`/UserProfile/${auth}`}>{auth}</a> : <a href='/SignInUp'>Войти</a>}
                </div>
            </div>
        </div>
        </nav>
    </Fragment>);
};

export default Navbar