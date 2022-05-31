import React from 'react';
import Structure from './landing/Structure';
import KalenderContent from './kalender/KalenderContent';
import UebersichtContent from './uebersicht/UebersichtContent';
import StylesContent from './styles/StylesContent';
import Logo from './Logo';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

export default class Routing extends React.Component {

    constructor() {
        super();
        //console.log(JSON.parse(window.localStorage.getItem('state')));
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            colorPath: process.env.PUBLIC_URL + '/static/css/color_blue.css',
            stylePath: process.env.PUBLIC_URL + '/static/css/style_light.css'
        }
        window.localStorage.setItem('state', JSON.stringify(this.state));
    }

    setState(color, style) {
        super.setState(color, style);
    }

    updateStyle = (style) => {
        var old = JSON.parse(window.localStorage.getItem('state'));
        old.stylePath = style.stylePath
        window.localStorage.setItem('state', JSON.stringify(old));
        this.setState(style); 
    }

    updateColor = (color) => {
        var old = JSON.parse(window.localStorage.getItem('state'));
        old.colorPath = color.colorPath
        window.localStorage.setItem('state', JSON.stringify(old));
        this.setState(color); 
    }

    render() {
        return(
            <>
            <link rel="stylesheet" type="text/css" href={this.state.colorPath} />
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
                    <Route path = '/styles' element = {
                        <Structure 
                        filter = {false} 
                        content = {<StylesContent 
                            updateStyleParent = {this.updateStyle}
                            updateColorParent = {this.updateColor}/>}/>
                    } exact/>
                    
                </Routes>
            </BrowserRouter>
            
            </>
        )
    }
}