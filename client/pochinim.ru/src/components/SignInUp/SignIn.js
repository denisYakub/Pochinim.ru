import { Fragment, useState } from "react";
import React from "react";
import Register from "./SignUp";
import axios from "axios";

const SignIn = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = {"account_name": login, "account_password": password}
            const response = await fetch("http://localhost:4000/createAccount",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            localStorage.setItem('account', login);
            window.location = "/"
        } catch (error) {
            console.error(error);
        }
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
        </h1>
        </form>
    </Fragment>);
};

export default SignIn;