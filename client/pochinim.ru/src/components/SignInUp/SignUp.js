import { Fragment, useContext, useState } from "react";
import React from "react";
import {observer} from "mobx-react-lite"
import fetchRegistrate from "./SignUpFuncions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();

        if(fetchRegistrate(login, email, password)){
            navigate("/");
        }
        
    }
    return (<Fragment>
        <form className="LogIn_form" onSubmit={onSubmit}>
            <h1>
                Please registrate
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
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}>
                    
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

export default observer(SignUp);