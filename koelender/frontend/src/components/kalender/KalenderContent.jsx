
import React from 'react';
import { updateState } from '../landing/Structure';
import {renderCalendar, prevMonth, nextMonth} from './KalenderDays'
import KalenderPopup from './KalenderPopup';
import '../../css/kalender.css';
import fetchPruefungen from '../../js/fetch';

export default class KalenderContent extends React.Component{

    constructor() {
        super();
        this.state = {
            error:null,
            isLoaded:true,
            pruefungen: [],
            aktiveFilter: [],
            pruefungPopup: false,
            searchItem: '',
            pruefungenInfos: [],
            calendar: [],
            date: new Date(),
            infos:[]
        };
        updateState = updateState.bind(this);
    }

    setState(state) {
        super.setState(state);
        var calendar = renderCalendar(this.state.pruefungenInfos, this.state.date, this);
        this.state.calendar = calendar[0];
        this.state.date = calendar[1];
    }
    
    togglePopup(infos) {
        this.setState({
            infos: infos,
            showPopup: !this.state.showPopup
        });
    }

    componentDidMount() {
        fetchPruefungen(this);
    }

    render() {


        const { error, isLoaded, pruefungen} = this.state;
        
        if(error) {return <div>Error: {error.message}</div>}
        else if(!isLoaded) {return <div>Loading...</div>}

        else {

            var pruefungenHeader = [];
            var pruefungenInfos1 = [];

            

            if(pruefungen[0]){
                var pruefungenKeys = Object.keys(pruefungen[0]);

                for(let i = 1; i<pruefungenKeys.length; i++){
                    
                        pruefungenHeader.push(
                        <td style = {{textTransform: "capitalize"}} 
                            id = {pruefungenKeys[i]+'_col_head'}
                            className = "popup_cell">
                                <b>{pruefungenKeys[i]}</b>
                        </td>);                  
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    
                    let pruefungenValues = Object.values(pruefungen[i]);
                    let filteredOut = false;
                    let containsSearch = false

                    if (typeof(pruefungen[i].datum)!=='undefined'&&
                        !(pruefungen[i].datum == null)) {

                        let pruefungDatum = new Date(pruefungen[i].datum);
                        
                        for(let j = 1; j<pruefungenValues.length; j++){
                                                
                            if(typeof(this.state.aktiveFilter[j])!="undefined"&&this.state.aktiveFilter[j]!=pruefungenValues[j]){
                                filteredOut = true;
                            }
                            if(pruefungenValues[j]==null){
                                pruefungenValues[j]=""
                            }
                            if(pruefungenValues[j].toString().toLowerCase().match(this.state.searchItem.toLocaleLowerCase())){
                                containsSearch = true;
                            }
                        }
                        
                        if(!filteredOut&&containsSearch) {
                            let tag = (pruefungDatum.getMonth())*31 + pruefungDatum.getDate();
                            if (typeof(pruefungenInfos1[tag]) === "undefined") {
                                pruefungenInfos1[tag] = [];
                            }
                            let pruefungenInstance = [];
                            for (let j = 1; j<pruefungenKeys.length; j++){
                                //console.log(typeof(pruefungenValues[j]));
                                if (pruefungenValues[j]==='') {
                                    pruefungenInstance.push(<td className="popup_cell">NA</td>);
                                }
                                else {
                                    pruefungenInstance.push(<td className="popup_cell">{pruefungenValues[j]}</td>);
                                }
                            }
                      
                            let included = false;
                            let includedAt = -1;
                            for(let k = 0; k<pruefungenInfos1[tag].length; k++){
                                if(pruefungenInfos1[tag][k][1] === pruefungen[i].name) {
                                    included = true;
                                    includedAt = k;
                                }
                            }

                            if (!included){
                                pruefungenInfos1[tag].push([parseInt(pruefungDatum.getFullYear()), pruefungen[i].name, [<tr><td id = "categorycontent">{pruefungenInstance}</td></tr>]]);
                                var calendar = renderCalendar(this.state.pruefungenInfos, this.state.date, this);
                                this.state.calendar = calendar[0];
                                this.state.date = calendar[1];
                            }
                            else {
                                pruefungenInfos1[tag][includedAt][2].push(<tr><td id = "categorycontent">{pruefungenInstance}</td></tr>);
                            }
                           
                        }
                    }   
                }
            }  
            
            if(typeof(this.state.pruefungenInfos[0]) === 'undefined') {
                this.state.pruefungenInfos = pruefungenInfos1;
                this.state.pruefungenInfos[0] = true;
            }
            else if(this.state.pruefungenInfos[0]){
                this.state.pruefungenInfos = pruefungenInfos1;
                this.setState();
                this.state.pruefungenInfos[0] = false;
            }
            else{
                this.state.pruefungenInfos = pruefungenInfos1;
            }
            
        }
    
        return(
            <>
            <table id = "month">
                <tbody>
                    <tr>
                        <td className="prev" onClick={()=>{
                            this.state.calendar = prevMonth(this.state.pruefungenInfos, this.state.date, this)[0]; 
                            updateState(this.state.aktiveFilter, this.state.searchItem);
                            }}>
                        {'\u276E'}
                        </td>
                        
                        <td id = "cur_month">
                            A
                        </td>
                        
                        <td className="next" onClick={()=>{
                            this.state.calendar = nextMonth(this.state.pruefungenInfos, this.state.date, this)[0]; 
                            updateState(this.state.aktiveFilter, this.state.searchItem);
                            }}>
                            {'\u276F'}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td id = "cur_year">
                            <p>2022</p>
                        </td>
                        <td></td>
                        
                    </tr>
                </tbody>
            </table>
            <table id = "calendar_table">
                <thead>
                    <tr>
                        <th>Mo</th>
                        <th>Di</th>
                        <th>Mi</th>
                        <th>Do</th>
                        <th>Fr</th>
                        <th>Sa</th>
                        <th>So</th>
                    </tr>
                </thead>
                <tbody id = "days">
                    {this.state.calendar}
                    {/*Hier wird der Kalender generiert*/}
                    {/*ToDo: Füllen der content divs mit Terminen*/}
                </tbody>

            </table>

            {this.state.showPopup ? 
            <KalenderPopup
                categories={pruefungenHeader}
                infos={this.state.infos}
                closePopup={this.togglePopup.bind(this)}
            />
            : null
            }

            </>
        );
    }
}
