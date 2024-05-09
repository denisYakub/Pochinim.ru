import React, { Fragment } from "react";
import './ErrorHandler.css';
import { Link } from "react-router-dom";
class ErrorHandler extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error){
        return { hasError: true, message: error.message };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render(){
        if(this.state.hasError){
            return(<div className="page-wrapper">
                <div className="error-handler-content">
                    <h1>{'4{}4'}</h1>
                    <div>
                        <p>Что-то пошло не так...</p>
                        <Link className="link-blue" to={'/'}>Попробуйте перезагрузить страницу</Link>
                    </div>
                    <p>{this.state.message}</p>
                </div>
            </div>);
        }
        return this.props.children;
    }
}

export default ErrorHandler;