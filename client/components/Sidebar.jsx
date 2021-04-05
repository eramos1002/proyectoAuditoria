import React from 'react';
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        console.log('Sidebar:' + JSON.stringify(this.props));
    }
    
    checkRoute(pattern) {
        const regex = new RegExp(pattern);
        return regex.test(this.props.location.pathname);
    }

    render() {
        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>

                <hr className="sidebar-divider my-0"/>

                <li className={`nav-item ${this.checkRoute('^/$') ? 'active' : ''}`}>
                    <a className="nav-link" href="#">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">Cruds</div>

                <li className={`nav-item ${this.checkRoute('^/users') ? 'active' : ''}`}>
                    <a className={`nav-link ${this.checkRoute('^/users') ? '' : 'collapsed'}`} href="#" data-toggle="collapse" data-target="#collapseUsers" 
                        aria-expanded="true" aria-controls="collapseUsers">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Users</span>
                    </a>
                    <div id="collapseUsers" className={`collapse ${this.checkRoute('^/users') ? 'show' : ''}`}
                         aria-labelledby="headingUsers" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Actions:</h6>
                            <Link className={`collapse-item ${this.checkRoute('^/users/list') ? 'active' : ''}`} to="/users/list">List</Link>
                            <Link className={`collapse-item ${this.checkRoute('^/users/add') ? 'active' : ''}`} to="/users/add">Add</Link>
                        </div>
                    </div>
                </li>

                <li className={`nav-item ${this.checkRoute('^/buildings') ? 'active' : ''}`}>
                    <a className={`nav-link ${this.checkRoute('^/buildings') ? '' : 'collapsed'}`} href="#" data-toggle="collapse"
                       data-target="#collapseBuildings" aria-expanded="true" aria-controls="collapseBuildings">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Buildings</span>
                    </a>
                    <div id="collapseBuildings" className={`collapse ${this.checkRoute('^/buildings') ? 'show' : ''}`} 
                         aria-labelledby="headingBuildings" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Buildings:</h6>
                            <Link className={`collapse-item ${this.checkRoute('^/buildings/list') ? 'active' : ''}`} to="/buildings/list">List</Link>
                            <Link className={`collapse-item ${this.checkRoute('^/buildings/add') ? 'active' : ''}`} to="/buildings/add">Add</Link>
                        </div>
                    </div>
                </li>

                <hr className="sidebar-divider d-none d-md-block"/>

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        );
    }
}
