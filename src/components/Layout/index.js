import React from 'react';
import {NavLink} from "react-router-dom";
import "./style.css"
import logo from "./logo.png"


const Layout = ({children}) => {
    return (
        <main className="main">
            <aside className="aside">
                <img src={logo} alt="Medical" className="logo"/>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to='/works'><i className='bx bxs-dashboard'/>Задачи и работы</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/projects'><i className='bx bxs-dashboard'/>Проекты</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/calendar'><i className='bx bxs-dashboard'/>Каленьдарь</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/possibilities'><i className='bx bxs-dashboard'/>Возможности</NavLink>
                    </li>
                </ul>
            </aside>
            <div className="content">
                <div>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Layout;