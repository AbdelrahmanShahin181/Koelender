import React from 'react';

export default class Filter extends React.Component {

    constructor() {
        super();
        this.state = {
            error:null,
            isLoaded:true,
            pruefungen: [],
            aktiveFilter: [],
        };
    }

    

    componentDidMount() {
        fetch("http://localhost:8000/api/liste/",{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pruefungen: result,
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    

    render() {

        const { error, isLoaded, pruefungen, aktiveFilter} = this.state;
        
        if(error) {return <div>Error: {error.message}</div>}
        else if(!isLoaded) {return <div>Loading...</div>}

        else {

            var pruefungenHeader = [];
            var pruefungenOptionen = [];
            //var aktiveFilter = [];

            if(pruefungen[0]){
                var pruefungenKeys = Object.keys(pruefungen[0]);

                for(let i = 1; i<pruefungenKeys.length; i++){
                    pruefungenOptionen[i] = new Array();
                    //pruefungenOptionen[i].push(<option>Kein Filter</option>)
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    let pruefungenValues = Object.values(pruefungen[i]);
                    //console.log(pruefungenValues);
                    for(let j = 1; j<pruefungenValues.length; j++){
                        //console.log(pruefungenOptionen[j].includes(pruefungenValues[j]));
                        if(!pruefungenOptionen[j].includes(pruefungenValues[j])) {
                            pruefungenOptionen[j].push(
                                pruefungenValues[j]
                            );
                        }
                    }
                }
                //console.log(pruefungenOptionen);
                //console.log(pruefungenOptionen.length);
                for(let i = 1; i<pruefungenOptionen.length; i++) {
                    //console.log(pruefungenOptionen[i]);
                    pruefungenOptionen[i].sort();
                    for(let j = 0; j<pruefungenOptionen[i].length; j++){
                        pruefungenOptionen[i][j] = <option>{pruefungenOptionen[i][j]}</option>;
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
                                    //this.prop("selectedIndex", 0);
                                    //console.log(this);
                                }
                                //console.log(aktiveFilter);
                                //this.props.updateFilterParent(aktiveFilter);
                                
                            }
                            }>
                                <option style = {{textTransform: "capitalize"}} selected>{pruefungenKeys[i]}...</option>
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
                        <li><input id="search" type="text" name="search" placeholder="Suche..."/></li>
                        <li>
                            <h3 id="filterHeader">Filter</h3>
                        </li>
                        
                        {pruefungenHeader}
                        {/*ToDo: Hier werden die Filteroptionen generiert*/}

                        <li>
                            <button 
                                id = "search_btn" 
                                type="button"
                                onClick={
                                    ()=>{var searchItem = document.querySelector('#search').value;
                                        this.props.updateFilterParent(aktiveFilter, searchItem);
                                        //console.log(document.querySelector('#search').value);
                                        //console.log(aktiveFilter);
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