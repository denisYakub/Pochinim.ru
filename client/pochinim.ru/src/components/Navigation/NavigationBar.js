import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    

    return (<form>
        <nav className="nav">
        <button onClick={() => navigate("/")}>My app</button>
        <h1>
            <input></input>
            <button onClick={()=> navigate("/search")}>search</button>
            </h1>
        <ul className="ul">
            <li>
                <button onClick={()=> navigate("/login")}>login</button>
            </li>
            <li>
                <button onClick={()=> navigate("/regester")}>regester</button>
            </li>
        </ul>
    </nav>
    </form>);
};

export default Navbar