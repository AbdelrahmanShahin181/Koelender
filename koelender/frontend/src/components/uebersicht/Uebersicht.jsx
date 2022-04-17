import '../../css/general.css';
import '../../css/header.css';
import '../../css/uebersicht.css';
import Logo from '../Logo.jsx';
import Navigation from '../navigation/Navigation.jsx';
import Hamburger from '../navigation/Hamburger.jsx';
import Content from '../Content.jsx';
import Filter from '../navigation/Filter.jsx';
import UebersichtContent from './UebersichtContent.jsx'
import React from 'react';



export default class Uebersicht extends React.Component {
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
            <Filter/>

            

            <Content content = {<UebersichtContent/>}/>
            
            </>
        )
    }
}

