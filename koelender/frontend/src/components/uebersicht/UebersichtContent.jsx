import React from 'react';
import { updateState } from './Uebersicht';

function SpaltenScript() {
    const columns_btn = document.querySelector('.hide_columns');
    const checkboxes = document.querySelector('#checkboxes');
    const outer_frame = document.querySelector('#outer_frame');

    columns_btn.classList.toggle('is-active');
    checkboxes.classList.toggle('is-active');
    outer_frame.classList.toggle('spalten-is-active');

    columns_btn.firstChild.data = columns_btn.firstChild.data === "<" ? "Spalten >" : "<";
    columns_btn.childNodes[1].data = "";
}

export function hideShowTable(col_name)
{
    //console.log(col_name);
    var checkbox_val=document.getElementById(col_name).className;
    //console.log(checkbox_val);
    if(checkbox_val==="show")
    {
        let all_col=document.getElementsByClassName(col_name);
        for(let i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="none";
        }
        document.getElementById(col_name+"_head").style.display="none";
        document.getElementById(col_name).setAttribute("class", "hide");
    }

    else
    {
        let all_col=document.getElementsByClassName(col_name);
        for(let i=0;i<all_col.length;i++)
        {
            all_col[i].style.display="table-cell";
        }
        document.getElementById(col_name+"_head").style.display="table-cell";
        document.getElementById(col_name).setAttribute("class", "show");
    }
}


export default class KalenderContent extends React.Component{

    constructor() {
        super();
        this.state = {
            error:null,
            isLoaded:true,
            pruefungen: [],
            aktiveFilter: [],
            searchItem: ''
        };
        updateState = updateState.bind(this);
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
        );
        //hideShowTable();
    }
    

    

    render() {

        const { error, isLoaded, pruefungen} = this.state;
        
        if(error) {return <div>Error: {error.message}</div>}
        else if(!isLoaded) {return <div>Loading...</div>}

        else {

            
            
            var pruefungenListe = [];
            var pruefungenHeader = [];
            var spaltenFilter = [];

            if(pruefungen[0]){
                var pruefungenKeys = Object.keys(pruefungen[0]);
                let x = 0;

                for(let i = 1; i<pruefungenKeys.length; i++){
                    pruefungenHeader.push(
                    <td style = {{textTransform: "capitalize"}} 
                        id = {pruefungenKeys[i]+'_col_head'}>
                            <b>{pruefungenKeys[i]}</b>
                    </td>);
                    spaltenFilter.push(
                    <li>
                        <input type="checkbox" 
                            className="show" 
                            id={pruefungenKeys[i]+"_col"} 
                            onChange={()=>hideShowTable(pruefungenKeys[i]+"_col")} 
                            defaultChecked='true'/>
                        <label style = {{textTransform: "capitalize"}}>{pruefungenKeys[i]}</label>
                    </li>);
                
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    var pruefungenInstance = [];
                    let pruefungenValues = Object.values(pruefungen[i]);
                    let filteredOut = false;
                    let containsSearch = false
            
                    for(let j = 1; j<pruefungenValues.length; j++){
                        
                        pruefungenInstance.push(<td className = {pruefungenKeys[j]+'_col'}>{pruefungenValues[j]}</td>);
                        
                        if(this.state.aktiveFilter[j]!==undefined&&this.state.aktiveFilter[j]!=pruefungenValues[j]){
                            filteredOut = true;
                            //console.log(this.state.aktiveFilter[j]);
                            //console.log(pruefungenValues[j]);
                        }
                        if(pruefungenValues[j]==null){
                            pruefungenValues[j]="Abdo"
                        }
                        if(pruefungenValues[j].toString().toLowerCase().match(this.state.searchItem.toLocaleLowerCase())){
                            containsSearch = true;
                            /*console.log(containsSearch);
                            console.log(this.state.searchItem)
                            console.log(pruefungenValues[j].toString())*/
                        }
                    }
                    
                    if(!filteredOut&&containsSearch) {
                        if(x%2===1){
                            pruefungenListe.push(<tr className = 'second'>{pruefungenInstance}</tr>)
                        } else {
                            pruefungenListe.push(<tr>{pruefungenInstance}</tr>)
                        }
                        x++;
                    }
                }
                
            }  
            
            

            return(
                <>
                <button className="hide_columns" onClick={()=>SpaltenScript()}>Spalte {'\u003E'}</button>
                <div id="checkboxes" className = "sidenav">
                    <ul>
                        <li>
                            <h3 id="spaltenHeader">Spalten</h3>
                        </li>
                        {spaltenFilter}
                        {/*Hier werden die Spaltenfilter generiert*/}
                    </ul>
                </div>

                <div id = "ov_content">
                    <h3 id = "header_overview">Übersicht</h3>

                    <table id = "overview_table">
                        <thead>
                            <tr>
                                {pruefungenHeader}
                                {/*ToDo: Hier werden die Spaltennamen generiert*/}
                            </tr>
                        </thead>
                        <tbody>
                            {/*<tr>{this.state.aktiveFilter}</tr>}
                            {<tr>{this.state.searchItem}</tr>*/}
                            {pruefungenListe}
                            {/*rows*/}
                        </tbody>

                    </table>
                </div>  
                </>
            );
        }
    }
}
