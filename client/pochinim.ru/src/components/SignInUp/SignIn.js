import { Fragment, useState } from "react";
import React from "react";

const SignIn = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        try {
            
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

export default SignIn;