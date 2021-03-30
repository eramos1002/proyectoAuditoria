import React from 'react';
import Axios from 'axios';
import Cookies from '../tools/cookies';
import Main from './Main.jsx';
import Login from './Login.jsx';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jwt: 1,
            jwtInfo: null
        };

        this.instance = Axios.create({
            baseURL: 'http://localhost:8080',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    logIn(jwt) {
        Cookies.setCookie('jwt', jwt, 1);
        this.setState({
            jwt, jwtInfo: parseJwt(jwt)
        });
    }

    logOut() {

    }

    render() {
        return this.state.jwt ? <Main></Main> : <Login></Login>
    }
}
