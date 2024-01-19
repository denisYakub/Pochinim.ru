import { useNavigate } from 'react-router-dom'
import Account from "./Classes/Account";

const ListOfTopics = () => {

    const acc = new Account(localStorage.getItem('Denis'));

    const navigate = useNavigate();
    
    return (<form>Search Page
        </form>)
};

export default ListOfTopics;