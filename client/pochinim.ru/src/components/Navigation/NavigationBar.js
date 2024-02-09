import { useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"
import { useEffect, useState } from 'react';
import checkForAuth from '../../services/navigation-services';

const Navbar = () => {

    const navigate = useNavigate();
    const [auth, setAuth] = useState(null)

    async function name() {
        setAuth( await checkForAuth());
    }
    
    useEffect(() => {
        name();
    }, [])

    return (<form>
        <nav className="nav">
        <div className="inner-nav">
            <div className="rightPartOfNav">
                <a href='/' className='siteLogo'>починим.ру</a>
                <select>
                    <option>Санкт-Петербург</option>
                    <option>Москва</option>
                </select>
            </div>
            <div className="leftPartOfNav">
                <a href='/'>Мои заказы</a>
                <a href='/'>Форум </a>
                <select>
                    <option>Специалистам</option>
                    <option>чз</option>
                </select>
                <input className='navInput' onClick={()=> navigate("/search")}></input>
                <div className='acc'>
                    {auth? <a href='/'>{auth}</a> : <button onClick={()=> navigate("/login")}>Войти</button>}
                </div>
            </div>
        </div>
        </nav>
    </form>);
};

export default Navbar