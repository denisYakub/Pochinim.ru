import { Link, useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"
import { Fragment, useContext, useEffect, useState } from 'react';
import { contextWebsite } from '../../contexts/contextWebsite';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css'
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';

const Navbar = () => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState(null);
    const [authMaster, setAuthMaster] = useState(null);

    const WEBSITE = useContext(contextWebsite);
    const [cities, setCities] = useState(WEBSITE.cities);
    
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
            navigate(`/SearchOrdersForMasters/${localStorage.getItem('mail-master')}`);
        }
    };

    const selectLocationHandler = (value) =>{
        localStorage.setItem('city', value)
        WEBSITE.setUserLocation();
        setCities(WEBSITE.cities);
    };
    
    return (<Fragment>
        <nav className="page-wrapper">
        <div className="navigation-content">
            <div className="navigation-site-logo-cities">
                <a href='/' className='site-logo'>.</a>
                <Select options={cities}
                    placeholder={WEBSITE.currentCity}
                    onChange={e => selectLocationHandler(e.value)}
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderRadius: '100px',
                            border: '1px solid var(--color-secondary-grey-dies)',
                            background: 'var(--color-secondary-grey-dies)'
                        }),
                    }}>
                </Select>
            </div>
            <div className="navigation-orders-forum-masters-search-users">
                <Link className='link-as-text' to={`/MyOrders/${auth}`}>Мои заказы</Link>
                <Link className='link-as-text'>Форум</Link>
                <Select options={[{value: 1, label: 'Специалистам'}, {value: 2, label: 'Регестрация'}, {value: 3, label: 'Выбрать заказ'}]}
                    placeholder='Специалистам'
                    onChange={e => selectMasterHandler(e.value)}
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderRadius: '100px',
                            border: '1px solid var(--color-secondary-grey-dies)',
                            background: 'var(--color-secondary-grey-dies)',
                        }),
                        option: (base, state) => ({
                            ...base,
                            //backgroundColor: state.isSelected ? "hotpink" : "white",
                        })
                    }}>
                </Select>
                <input className='input-small'></input>
                <div className='users'>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle 
                            style={{
                                border: '1px solid var(--color-secondary-grey-dies)',
                                background: 'var(--color-secondary-grey-dies)',
                                borderRadius: '50px',
                                color: '#1C1C1C',
                            }}>
                            {auth?auth:'Войти'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {auth?<Dropdown.Item href={`/UserProfile/${auth}`} 
                                style={{marginTop: '5px'}}>
                                {auth}
                            </Dropdown.Item>
                            :<Dropdown.Item href={`/SignInUp`} 
                                style={{marginTop: '5px'}}>
                                    Войти
                            </Dropdown.Item>}
                            <Dropdown.Item href='' 
                                style={{marginTop: '5px'}}>
                                Профиль и настройки
                            </Dropdown.Item>
                            <Dropdown.Item href='' 
                                style={{marginTop: '5px'}}>
                                Помощь
                            </Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            {authMaster?<Button href={`/MasterProfile/${authMaster}`}
                            style={{
                                display: 'flex',
                                margin: '10px 20px',
                                border: '1px solid #EBF0FF',
                                background: '#EBF0FF',
                                borderRadius: '50px',
                                color: '#1C1C1C'
                            }}>
                                {authMaster}
                            </Button>
                            :<Button href='/SignInAsMaster' 
                            style={{
                                display: 'flex',
                                margin: '10px 20px',
                                border: '1px solid #EBF0FF',
                                background: '#EBF0FF',
                                borderRadius: '50px',
                                color: '#1C1C1C'
                            }}>
                                Войти как специалист
                            </Button>}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
        </nav>
    </Fragment>);
};

export default Navbar