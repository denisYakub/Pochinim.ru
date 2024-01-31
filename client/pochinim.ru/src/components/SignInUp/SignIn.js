import { Fragment, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../SignInUp/Signin.css"

const SignIn = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onSubmit = async e => {
        /*e.preventDefault();
        try {
            const user = new User();
            
            user.logIn(login, password);
        } catch (error) {
            console.error(error);
        }*/
        navigate("/", {state:{email: login}})
    }
        
    return (<Fragment>
        <form className="LogIn_form" onSubmit={onSubmit}>
            <h1>
                Please Log In
            </h1>
        <h1> 
            <input type="text" value={login} onChange={e => setLogin(e.target.value)}>
                    
            </input>
        </h1>
        <h1> 
            <input type="text" value={password} onChange={e => setPassword(e.target.value)}>
                   
            </input>
        </h1>
        <h1> 
            <button>
                submit
            </button>
            <button onClick={() => {navigate("/regester")}}>
                registrate
            </button>
        </h1>
        </form>
    </Fragment>);
};

export default SignIn;