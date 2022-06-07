import React from 'react';
import { updateState } from '../landing/Structure';
import '../../css/uebersicht.css';
import fetchPruefungen from '../../js/fetch';

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

export default class KalenderContent extends React.Component{

    constructor() {
        super();
        this.state = {
            error:null,
            isLoaded:true,
            pruefungen: [],
            aktiveFilter: [],
            hiddenColumns: [],
            searchItem: '',
            fileDownloadUrl: "",
        };
        updateState = updateState.bind(this);
        /*React.useEffect(() => {
            childIcs.current = icsExport(this.pruefungenExport)
        },[])*/
    }

    sethiddenCol(cols) {
        window.localStorage.setItem('hiddenCols', JSON.stringify(cols));
        this.setState(cols);
    }

    componentDidMount() {
        fetchPruefungen(this)
        if(JSON.parse(window.localStorage.getItem('hiddenCols'))) {
            var cols = JSON.parse(window.localStorage.getItem('hiddenCols'));
            this.setState(cols);
        }
    }
    
    toIcsTime(date) {
        return(
        date.getFullYear().toString()+
        ((date.getMonth() + 1)<10? "0":"") +
        (date.getMonth()+1).toString()+
        (date.getDate()<10? "0":"") +
        date.getDate().toString()+
        "T"+
        (date.getHours()<10? "0":"") +
        date.getHours().toString()+
        (date.getMinutes()<10? "0":"") +
        date.getMinutes().toString()+
        "00")
    }

    exportIcs = (event) => {
        const blob = new Blob([event],{type: 'text/plain;charset=utf-8',})
        const fileDownloadUrl = URL.createObjectURL(blob);
        this.setState ({fileDownloadUrl: fileDownloadUrl}, 
        () => {
            this.dofileDownload.click(); 
            URL.revokeObjectURL(fileDownloadUrl);  // free up storage--no longer needed.
            this.setState({fileDownloadUrl: ""})
        })   
    }

    render() {

        const { error, isLoaded, pruefungen, hiddenColumns} = this.state;
        
        if(error) {return <div>Error: {error.message}</div>}
        else if(!isLoaded) {return <div>Loading...</div>}

        else {

            var pruefungenListe = [];
            var pruefungenHeader = [];
            var spaltenFilter = [];
            var pruefungenExport = 
                "BEGIN:VCALENDAR\nPRODID:koelender.de\nVERSION:2.0";

            if(pruefungen[0]){
                var pruefungenKeys = Object.keys(pruefungen[0]);
                let x = 0;

                for(let i = 1; i<pruefungenKeys.length; i++){
                    if (!hiddenColumns[i]){
                        pruefungenHeader.push(
                        <td style = {{textTransform: "capitalize"}} 
                            id = {pruefungenKeys[i]+'_col_head'}>
                                <b>{pruefungenKeys[i]}</b>
                        </td>);
                    }
                    spaltenFilter.push(
                    <li>
                        <input type="checkbox" 
                            className="show" 
                            id={pruefungenKeys[i]+"_col"} 
                            onChange={()=> {                                
                                if(!hiddenColumns[i] )
                                {   
                                    hiddenColumns[i] = true;
                                    this.sethiddenCol({hiddenColumns});
                                }

                                else
                                {
                                    hiddenColumns[i] = null;
                                    this.sethiddenCol({hiddenColumns});
                                }
                            }
                            } 
                            defaultChecked={!hiddenColumns[i]}/>
                        <label style = {{textTransform: "capitalize"}}>{pruefungenKeys[i]}</label>
                    </li>);
                    
                
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    var pruefungenInstance = [];
                    let pruefungenValues = Object.values(pruefungen[i]);
                    let filteredOut = false;
                    let containsSearch = false
            
                    for(let j = 1; j<pruefungenValues.length; j++){
                        
                        if(!hiddenColumns[j]) {
                            pruefungenInstance.push(<td className = {pruefungenKeys[j]+'_col'}>{pruefungenValues[j]}</td>);
                        }
                        
                        if(this.state.aktiveFilter[j]!==undefined&&this.state.aktiveFilter[j]!==null&&this.state.aktiveFilter[j]!==pruefungenValues[j]){
                            filteredOut = true;
                        }
                        if(pruefungenValues[j]==null){
                            pruefungenValues[j]="Abdo"
                        }
                        if(pruefungenValues[j].toString().toLowerCase().match(this.state.searchItem.toLocaleLowerCase())){
                            containsSearch = true;
                        }
                    }
                    
                    if(!filteredOut&&containsSearch) {

                        let datum = "";
                        if (pruefungen[i].datum.includes(".")) {
                            let tag =  pruefungen[i].datum.split(".")[0];
                            let monat =  pruefungen[i].datum.split(".")[1];
                            let jahr =  pruefungen[i].datum.split(".")[2];
                            datum = monat + "/" + tag + "/" + jahr;
                        }
                        else if (pruefungen[i].datum.includes("-")) {
                            datum =  pruefungen[i].datum.split(" ")[0];
                        }
                        else {
                            datum = pruefungen[i].datum;
                        }

                        console.log(datum);
                        
                        var pruefungStart = new Date(datum+" "+pruefungen[i].startzeit);
                        if(pruefungStart.getTime() === pruefungStart.getTime()){
                        var pruefungEnd = new Date(datum+" "+pruefungen[i].startzeit);
                        if(pruefungen[i].dauer.trim === ""){
                            pruefungEnd.setMinutes(pruefungEnd.getMinutes()+parseInt(pruefungen[i].dauer));
                        }
                        var timeStamp = new Date();
                        
                        
                        pruefungenExport = `${pruefungenExport}\
\nBEGIN:VEVENT\
\nUID:${pruefungen[i].id}@koelender.de\
\nLOCATION:${pruefungen[i].pruefungsform}\
\nSUMMARY:${pruefungen[i].name}\
\nDESCRIPTION:${pruefungen[i].name + 
"\\nStudiengang: " + pruefungen[i].studiengang + 
"\\nSemester: " + pruefungen[i].semester +
"\\nPrüfer: " + pruefungen[i].pruefer}\
\nDTSTART;VALUE=DATE-TIME:${this.toIcsTime(pruefungStart)}\
\nDTEND;VALUE=DATE-TIME:${this.toIcsTime(pruefungEnd)}\
\nDTSTAMP;VALUE=DATE-TIME:${this.toIcsTime(timeStamp)}\
\nEND:VEVENT`;
                        }
                        
                        if(x%2===1){
                            pruefungenListe.push(<tr className = 'second'>{pruefungenInstance}</tr>)
                        } else {
                            pruefungenListe.push(<tr>{pruefungenInstance}</tr>)
                        }
                        x++;
                    }
                }
                pruefungenExport = pruefungenExport+"\nEND:VCALENDAR";
                this.state.pruefungenExport = pruefungenExport;
                
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

                    <a style={{display: "none"}}
                        download="koelender.ics"
                        href={this.state.fileDownloadUrl}
                        ref={e=>this.dofileDownload = e}
                    >download it</a>

                    <button id = "export_btn" onClick={()=>this.exportIcs(pruefungenExport.replace(' ', '').replace("\\t", ""))}>Export</button>
                    
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
