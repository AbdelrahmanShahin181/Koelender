import '../../css/general.css';
import '../../css/header.css';
import '../../css/landing.css';
import Logo from '../Logo.jsx';
import Filter from '../navigation/Filter'
import Navigation from '../navigation/Navigation.jsx';
import Hamburger from '../navigation/Hamburger.jsx';
import Content from '../Content.jsx';
import React from 'react';


export function updateState(aktiveFilter, searchItem){
    this.setState({aktiveFilter, searchItem});
    //console.log(typeof(renderCalendar));
    //var calendar = this.renderCalendar(this.state.pruefungenInfos, this.state.date)[0]
    //this.setState({calendar});
}

export default class Structure extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            aktiveFilter: [], 
            searchItem: '',
            stylePath: process.env.PUBLIC_URL + '/static/css/color.css'
        }
        this.updateFilter = this.updateFilter
        
    }

    updateFilter = (aktiveFilter, searchItem) => {
        this.setState({aktiveFilter, searchItem}); 
        //console.log(this.state.searchItem);
        this.updateStateChild(aktiveFilter, searchItem)
    }
    updateStateChild(aktiveFilter, searchItem) {updateState(aktiveFilter, searchItem)}

    render() {
        var filter = <></>;
        if(this.props.filter) {
            filter = <Filter updateFilterParent = {this.updateFilter}/>;
        }
        

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
            
            {filter}
            <Content content = {this.props.content}/>
            
            </>
        )
    }
}

