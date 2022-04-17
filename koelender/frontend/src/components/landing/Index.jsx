import '../../css/general.css';
import '../../css/header.css';
import '../../css/landing.css';
import Logo from '../Logo.jsx';
import Navigation from '../navigation/Navigation.jsx';
import Hamburger from '../navigation/Hamburger.jsx';
import Content from '../Content.jsx';
import React from 'react'


export default class Index extends React.Component {

    render() {
        return (    
        
            <>
            <div id="topbar" className="topnav">

                <a href="/">
                   <Logo name="logo"/>
                </a>

                <Navigation type="top"/>

                <Hamburger/>

            </div>
            <div id="mobilebar" className="sidenav">
                <Navigation type="mob"/>
            </div>
            <Content content = {<><h2 id="welcome">Willkommen beim</h2> <Logo name="bigPic"/></>}/>
            
            </>
        );
    }
}