import '../../css/general.css';
import '../../css/header.css';
import '../../css/kalender.css';
import Logo from '../Logo.jsx';
import Navigation from '../navigation/Navigation';
import Hamburger from '../navigation/Hamburger.jsx';
import Content from '../Content.jsx';
import Filter from '../navigation/Filter.jsx';
import KalenderContent from './KalenderContent.jsx'
import React from 'react';
import {renderCalendar} from '../../js/kalender';


export default class Kalender extends React.Component {

    componentDidMount() {
        renderCalendar();
    }

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
            <Content content = {<KalenderContent/>}/>
            
            </>
        );
    }
}