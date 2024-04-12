import { useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"
import { Fragment, useEffect, useState } from 'react';
import USERController from '../../controllers/USER-controller';

const Navbar = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(null)
    const [search, setSearch] = useState("")

    async function name() {
        if(await USERController.checkForAccess()){
            setAuth(localStorage.getItem('mail'));
        }
    }
    
    useEffect( () => {
        name();
    }, [navigate])

    const submitSearch = e => {
        e.preventDefault()
        navigate('/Search', {replace: true, state:{search}})
    }

    const selectHandler = (val) =>{
        if(val == 2){
            navigate('/SignInUpAsMaster');
        }
    };

    return (<Fragment>
        <nav className="nav">
        <div className="inner-nav">
            <div className="rightPartOfNav">
                <a href='/' className='siteLogo'>.</a>
                <select>
                    <option>Санкт-Петербург</option>
                    <option>Москва</option>
                </select>
            </div>
            <div className="leftPartOfNav">
                <a href='/'>Мои заказы</a>
                <a href='/'>Форум </a>
                <select onChange={e => selectHandler(e.target.value)}>
                    <option value={1}>Специалистам</option>
                    <option value={2}>Регестрация</option>
                </select>
                <form onSubmit={submitSearch}>
                    <input className='navInput' onChange={e => setSearch(e.target.value)}></input>
                </form>
                <div className='acc'>
                    {auth? <a href='/UserProfile'>{auth}</a> : <a href='/SignInUp'>Войти</a>}
                </div>
            </div>
        </div>
        </nav>
    </Fragment>);
};

export default Navbar