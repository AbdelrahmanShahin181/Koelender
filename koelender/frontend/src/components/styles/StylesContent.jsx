import React from 'react';
import StyleButton from './StyleButton';

export default class StylesContent extends React.Component{
    

    render() {
        return(
            <div id = "style_buttons">
            <ul id='styleChange'>
                <li><h3>Styles</h3></li>
                <li>
                    <button onClick={()=>{
                        var stylePath= process.env.PUBLIC_URL + '/static/css/style_light.css';
                        this.props.updateStyleParent({stylePath});
                    }}>Light-Style</button>
                </li>
                <li>
                    <button onClick={()=>{
                        var stylePath= process.env.PUBLIC_URL + '/static/css/style_dark.css';
                        this.props.updateStyleParent({stylePath});
                    }}>Dark-Style</button>
                </li>
                <li>
                    <button onClick={()=>{
                        var stylePath= process.env.PUBLIC_URL + '/static/css/color_BO.css';
                        this.props.updateStyleParent({stylePath});
                    }}>BO-Style</button>
                </li>
            </ul>
            <ul id='colorChange'>
                <li><h3>Farben</h3></li>
                <StyleButton file = "blue" color = "blau" updateColorParent = {this.props.updateColorParent}/>
                <StyleButton file = "purple" color = "violett" updateColorParent = {this.props.updateColorParent}/>
                <StyleButton file = "green" color = "grün" updateColorParent = {this.props.updateColorParent}/>
                <StyleButton file = "turquois" color = "türkis" updateColorParent = {this.props.updateColorParent}/>
                <StyleButton file = "orange" color = "orange" updateColorParent = {this.props.updateColorParent}/>
                <StyleButton file = "red" color = "rot" updateColorParent = {this.props.updateColorParent}/>
            </ul>
            </div>
        );
    }
}