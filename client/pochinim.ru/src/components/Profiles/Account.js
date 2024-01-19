import React, { Component } from 'react';

export default class Account extends Component{

    #Login

    constructor(login){
        super(login);
        this.#Login = login;
        this.state = {
            js: []
        }
        this.#getAccount();
    }

    #getAccount = async () => {
        try {
            const response = await fetch(`http://localhost:4000/search/:${this.#Login}`);
            const jsonData = await response.json();

            
            const dt = Object.values(jsonData);
            this.setState({js: dt})

        } catch (error) {
            console.error(error);
        }
    };


    render(){
        const dataArr = this.state.js;
        return (<form>
            {<table>
                <thead>
                    <tr>
                        <th>
                            Account
                        </th>
                        <th>
                            Password
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataArr.map(el => (
                        <tr>
                            <td>{el.account_name}</td>
                            <td>{el.account_password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </form>);
    }
}  
