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

export function updateState(aktiveFilter, searchItem){
    this.setState({aktiveFilter, searchItem});
    var calendar = this.renderCalendar(this.state.pruefungenInfos, this.state.date)[0]
    this.setState({calendar});
    this.setState({aktiveFilter, searchItem});
    var calendar = this.renderCalendar(this.state.pruefungenInfos, this.state.date)[0]
    this.setState({calendar});
    //this.renderCalendar(this.state.pruefungenInfos, this.state.date);
    
}

export default class Kalender extends React.Component {

    constructor(props) {
        super(props)
        this.state = {aktiveFilter: [], searchItem: ''}
        this.updateFilter = this.updateFilter

    }

    componentDidMount() {
        renderCalendar();
    }

    updateFilter = (aktiveFilter, searchItem) => {
        this.setState({aktiveFilter, searchItem}); 
        //console.log(this.state.searchItem);
        this.updateStateChild(aktiveFilter, searchItem)
    }
    updateStateChild(aktiveFilter, searchItem) {updateState(aktiveFilter, searchItem)}

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
            <Filter updateFilterParent = {this.updateFilter}/>
            <Content content = {<KalenderContent/>}/>
            
            </>
        );
    }
}