import React from 'react';

export default class Navigation extends React.Component{
    render() {
    return(
        <ul id = {this.props.type + "menu"}>
            <div id = {this.props.type+"_myLinks"}>
                <li><a href="/kalender">Kalender</a></li>
                <li><a href="/uebersicht">Übersicht</a></li>
                <li><a href="/styles">Styles</a></li>
            </div>
            <div id={this.props.type + "_login"}>
                <li><input type="text" name="search" placeholder="Username..."/></li>
                <li><input  type="password" name="search" placeholder="Passwort..."/></li>
                <li><button  type="button" onClick={
                    ()=>window.location.href = '/admin'
                }>Login</button></li>
            </div>
        </ul>
    );}
}
