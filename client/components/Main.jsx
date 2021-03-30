import React from 'react';
import Axios from 'axios';
import {
    BrowserRouter,
    Switch,
    Route,
    DefaultRoute
} from "react-router-dom";
import Footer from './Footer.jsx';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import routes from './routes';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.instance = Axios.create({
            baseURL: 'http://localhost:8080',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    routeWithSubRoutes(route) {
        return (
            <Route path={route.path} render={props => (<route.component {...props} routes={route.routes} />)} />
        );
    }

    routeSidebar(route) {
        return (
            <Route path={route.path} render={props => (<Sidebar {...props} routes={route.routes} />)} />
        ); 
    }

    render() {
        return (
            <BrowserRouter>
                <div id="wrapper">
                    <Switch>
                        {routes.map((route, k) => <this.routeSidebar key={k} {...route} />)}
                    </Switch>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <div className="container-fluid">
                                <Switch>
                                    {routes.map((route, k) => <this.routeWithSubRoutes key={k} {...route} />)}
                                </Switch>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
