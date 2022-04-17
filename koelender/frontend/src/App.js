
import './css/general.css';
import './css/header.css';
import './css/landing.css';
import Logo from './components/Logo.jsx';
import Navigation from './components/Navigation.jsx';
import Hamburger from './components/Hamburger.jsx';
import Content from './components/Content.jsx';
import {appendScript} from './components/Script';
import { Component } from 'react';

function App() {
  
  return (
    <div><title>Kölender</title>
            <div id="topbar" class="topnav">

                <a href="/">
                   <Logo name="logo"/>
                </a>

                <Navigation type="top"/>

                <Hamburger/>

            </div>
            <div id="mobilebar" class="sidenav">
                <Navigation type="mob"/>
            </div>
            <Content content = {<div><h2 id="welcome">Willkommen beim</h2> <Logo name="bigPic"/></div>}/>
                    
            <script src="./js/hamburger.js"></script></div>
  );
  
}

export default App;
