import React from 'react';
import './LoggedInNavbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../../image/man (1).png';

const LoggedInNavbar=(props)=> {
    return (
        <div className="navbar-body">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <div className="navbar-left-content">
                            <img className="navbar-logo" src={logo} alt="person"/>
                            <h2 style={{"font-family": "'Dongle', sans-serif","fontSize":"4rem","marginTop":"65px"}}>Person Book</h2>
                        </div>
                    </div>
                    <div className="navbar-right">
                        <NavLink to='/' className={`navbar-link ${(isActive)=>isActive?'active':'inActive'}`}>Add Person</NavLink>
                        <NavLink to='/show-persons' className={`navbar-link ${(isActive)=>isActive?'active':'inActive'}`}>Show Person</NavLink>
                        <button   className="log-out-button" onClick={()=>{props.logOut()}}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoggedInNavbar
