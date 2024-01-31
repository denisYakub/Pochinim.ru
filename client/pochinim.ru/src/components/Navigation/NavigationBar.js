import { useNavigate } from 'react-router-dom'
import "../Navigation/Navigation.css"

const Navbar = () => {

    const navigate = useNavigate();
    

    return (<form>
        <nav className="nav">
        <a href='/'>My app</a>
        <h1>
            <input></input>
            <button onClick={()=> navigate("/search")}>search</button>
        </h1>
        <ul className="ul">
            <li>
                <button onClick={()=> navigate("/login")}>SignIn/SignUp</button>
            </li>
        </ul>
    </nav>
    </form>);
};

export default Navbar