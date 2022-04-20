import '../../css/general.css';
import '../../css/header.css';
import '../../css/uebersicht.css';
import Logo from '../Logo.jsx';
import Navigation from '../navigation/Navigation.jsx';
import Hamburger from '../navigation/Hamburger.jsx';
import Content from '../Content.jsx';
import Filter from '../navigation/Filter.jsx';
import UebersichtContent, {hideShowTable} from './UebersichtContent.jsx'
import React from 'react';


export function updateState(aktiveFilter, searchItem){
    this.setState({aktiveFilter, searchItem})
}

export default class Uebersicht extends React.Component {
    constructor(props) {
        super(props)
        this.state = {aktiveFilter: [], searchItem: ''}
        this.updateFilter = this.updateFilter

    }

    componentDidMount() {
        //hideShowTable();
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
            <Content content = {<UebersichtContent/>}/>
            </>
        )
    }
}

