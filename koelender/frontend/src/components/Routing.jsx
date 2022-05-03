import React from 'react';
import Structure from './landing/Structure';
import KalenderContent from './kalender/KalenderContent';
import UebersichtContent from './uebersicht/UebersichtContent';
import Logo from './Logo';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

export default class Routing extends React.Component {
    constructor() {
        super();
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            stylePath: process.env.PUBLIC_URL + '/static/css/color.css'
        }
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
        super.setState(state);
    }

    render() {
        return(
            <>
            <link rel="stylesheet" type="text/css" href={this.state.stylePath} />
            <BrowserRouter>
                <Routes>
                    
                    <Route path = '/' element = {
                        <Structure 
                        filter = {false} 
                        content = {
                        <><h2 id="welcome">Willkommen beim</h2> <Logo name="bigPic"/></>
                        }/>
                    } exact/>
                    <Route path = '/kalender' element = {
                        <Structure 
                        filter = {true} 
                        content = {<KalenderContent/>}/>
                    } exact/>
                    <Route path = '/uebersicht' element = {
                        <Structure 
                        filter = {true} 
                        content = {<UebersichtContent/>}/>
                    } exact/>
                    
                </Routes>
            </BrowserRouter>
            <button id='colorChange' onClick={()=>{
                var stylePath= process.env.PUBLIC_URL + '/static/css/color_BO.css';
                if(this.state.stylePath === process.env.PUBLIC_URL + '/static/css/color_BO.css') {
                    stylePath= process.env.PUBLIC_URL + '/static/css/color.css';
                }
                this.setState({stylePath});
            }}>BO-Style</button>
            </>
        )
    }
}