import React from 'react';
import fetchPruefungen from '../../js/fetch.js'
//import { updateState } from '../landing/Structure.jsx';

export default class Filter extends React.Component {

    constructor() {
        super();
        this.state = {
            error:null,
            isLoaded:true,
            pruefungen: [],
            aktiveFilter: [],
            searchItem: ""
        };
    }

    componentDidMount() {
        fetchPruefungen(this);
        if(JSON.parse(window.localStorage.getItem('filter'))) {
            var searchItem = window.localStorage.getItem('searchItem');
            if (searchItem === null){
                searchItem = "";
            }
            var filter = JSON.parse(window.localStorage.getItem('filter'));
            for(let i = 0; i< filter.length; i++) {
                if (filter[i] === null) {
                    delete filter[i]
                }
            }
            this.state.searchItem = searchItem;
            this.state.aktiveFilter = filter;
            this.props.updateFilterParent(filter, searchItem);
        }
    }

    render() {

        const { error, isLoaded, pruefungen, aktiveFilter} = this.state;
        
        if(error) {return <div>Error: {error.message}</div>}
        else if(!isLoaded) {return <div>Loading...</div>}

        else {

            var pruefungenHeader = [];
            var pruefungenOptionen = [];

            if(pruefungen[0]){
                var pruefungenKeys = Object.keys(pruefungen[0]);

                for(let i = 1; i<pruefungenKeys.length; i++){
                    pruefungenOptionen[i] = [];
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    let pruefungenValues = Object.values(pruefungen[i]);
                    for(let j = 1; j<pruefungenValues.length; j++){
                        if (typeof(pruefungenValues[j]) === "undefined"|pruefungenValues[j] === null ) {
                            pruefungenValues[j] = "";
                            //console.log("Hallo1")
                        }
                        else if((!pruefungenOptionen[j].some(x => x.trim().toLowerCase() === pruefungenValues[j].trim().toLowerCase()))) {
                            pruefungenOptionen[j].push(
                                pruefungenValues[j].trim()
                            );
                        }
                    }
                }

                for(let i = 1; i<pruefungenOptionen.length; i++) {
                    pruefungenOptionen[i].sort();
                    for(let j = 0; j<pruefungenOptionen[i].length; j++){
                        if (pruefungenOptionen[i][j] === this.state.aktiveFilter[i]) {
                            pruefungenOptionen[i][j] = <option selected>{pruefungenOptionen[i][j]}</option>;
                        }
                        else {
                            pruefungenOptionen[i][j] = <option>{pruefungenOptionen[i][j]}</option>;
                        }
                    }
                    
                }

                for(let i = 1; i<pruefungenKeys.length; i++){
                    pruefungenHeader.push(
                    <li>
                        <select style = {{textTransform: "capitalize"}} 
                            id = {pruefungenKeys[i]+'_select'}
                            onChange={e => {
                                
                                aktiveFilter[i] = e.target.value;
                                if (e.target.value.match(/\.\.\./)) {
                                    delete aktiveFilter[i];
                                }
                                
                            }
                            }>
                                <option style = {{textTransform: "capitalize"}} /*selected*/>{pruefungenKeys[i]}...</option>
                                {pruefungenOptionen[i]}
                        </select>
                    </li>);
                }

            }

            return(
                <>
                <div id="sidebar" className="sidenav">
                <button className="filter_btn" onClick={()=>FilterScript()}>Filter {'\u003E'}</button>
                    <ul id="sidemenu">
                        <li><input id="search" type="text" name="search" placeholder="Suche..." defaultValue={this.state.searchItem}>
                            </input></li>
                        <li>
                            <h3 id="filterHeader">Filter</h3>
                        </li>

                        <li>
                            <button
                            onClick= {
                                ()=> {
                                for(let i = 1; i< pruefungenKeys.length; i++) {
                                    var dropdown = document.getElementById(pruefungenKeys[i]+'_select');
                                    dropdown.selectedIndex = 0;
                                    aktiveFilter[i] = null;
                                }}
                            }>Filter löschen</button>
                        </li>
                        
                        {pruefungenHeader}
                        {/*ToDo: Hier werden die Filteroptionen generiert*/}

                        <li>
                            <button 
                                id = "search_btn" 
                                type="button"
                                onClick={
                                    ()=>{var searchItem = document.querySelector('#search').value;
                                        window.localStorage.removeItem('searchItem');
                                        window.localStorage.setItem('searchItem', searchItem)
                                        window.localStorage.removeItem('filter');
                                        window.localStorage.setItem('filter', JSON.stringify(this.state.aktiveFilter));
                                        this.props.updateFilterParent(this.state.aktiveFilter, searchItem);
                                        //console.log(this.state.aktiveFilter);
                                    }
                                    
                                }>Filtern</button>
                        </li>
                    </ul>
                </div>
                </>
            );
        }
    }
}


function FilterScript() {
    const filter_btn = document.querySelector('.filter_btn');
    const filter_menu = document.querySelector('#sidebar');
    const outer_frame = document.querySelector('#outer_frame');
    const checkboxes = document.querySelector('#checkboxes');
    const columns_btn = document.querySelector('.hide_columns');

    filter_btn.classList.toggle('is-active');
    filter_menu.classList.toggle('is-active');
    outer_frame.classList.toggle('is-active');
    if(checkboxes !== null) {
        checkboxes.classList.toggle('menu-is-active');
        columns_btn.classList.toggle('menu-is-active');
    }

    filter_btn.childNodes[0].data = filter_btn.childNodes[0].data === "<" ? "Filter >" : "<";
    filter_btn.childNodes[1].data = "";
}