
import React from 'react';
import { updateState } from '../landing/Structure';
import KalenderPopup from './KalenderPopup';
import '../../css/kalender.css';




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
            date: "",
            infos:[]
        };
        updateState = updateState.bind(this);
        //updateState = () => {updateState(); renderCalendar(this.state.pruefungenInfos, this.state.date)}
    }








    renderCalendar(infos, date) {

        //console.log("function renderCalendar started");
        //console.log(typeof(infos));
        //console.log(infos[1]);
    
        const month = date.getMonth();
        const lastDay = new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
    
        date.setDate(1);
        const firstDayIndex = date.getDay();
        const lastMonthDays = new Date(date.getFullYear(), date.getMonth(),0).getDate();
    
        const months = [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"
        ];
    
        document.querySelector("#cur_month").innerHTML 
        = months[month];
    
        document.querySelector("#cur_year").innerHTML 
        = "<p>" + date.getFullYear() + "</p>";
    
        let days = [];
    
        let i = 1;
        let week = [];
        let event = [];
    
    
        for(let x=firstDayIndex-1; x!==0; x--) {
            
            if (x===-1) {
                x=6;
            }
            week.push( <td id="other_month" class="day">
                    <div id="date">{lastMonthDays-x+1}</div>
                    <div id="content" class = {"y" + date.getFullYear() + "d" + lastMonthDays-x+1 + "m" + date.getMonth()-1}>  </div>
                </td>);
            i++;
        }
    
        
    
        for(let y=1; y<=lastDay;y++) {
            
            
            if (i%7 === 1) {
                days.push(<tr>{week}</tr>);
                week = [];
            }
            if(typeof(infos[date.getMonth()*31+y]) !== "undefined") {
                for(let j = 0; j<infos[date.getMonth()*31+y].length; j++)
                if (infos[date.getMonth()*31+y][j][0] === date.getFullYear()) {
                    
                    event.push(<div onClick={()=>{this.togglePopup(infos[date.getMonth()*31+y][j])}} >{infos[date.getMonth()*31+y][j][1]}</div>);
                    
                }
                else {
                    event = [];
                }
            }
            else {
                event = [];
            }
            if(y===new Date().getDate() && date.getMonth()===new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                
                week.push( <td id="today" class="day">
                        <div id="date">{y}</div>
                        <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + date.getMonth()}> {event} </div>
                    </td>);
            }
            else {
                week.push( <td class="day">
                        <div id="date">{y}</div>
                        <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + date.getMonth()}> {event} </div>
                    </td>);
            }
            event = [];
            i++;
        }
        
        for(let y=1; !(i%7 === 1);y++) {
            
            week.push( <td id="other_month" class="day">
                    <div id="date">{y}</div>
                    <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + date.getMonth()+1}>  </div>
                </td>);
            i++;
        }
        days.push( <tr id = "oops">{week}</tr>);
    
        //console.log(typeof(days));
        return([days, date]);
        
        //monthDays.innerHTML = days;
    
    }
    
    prevMonth(infos, date){
        //console.log(date.getMonth());
        date.setMonth(date.getMonth()-1);
        return this.renderCalendar(infos, date);
    }
    
    nextMonth(infos, date){
        date.setMonth(date.getMonth()+1);
        return this.renderCalendar(infos, date);
    }
    





    

    togglePopup(infos) {
        this.setState({
            infos: infos,
            showPopup: !this.state.showPopup
        });
    }

    componentDidMount() {
        //console.log(typeof(this.state.pruefungenInfos));
        //console.log(this.state.pruefungenInfos[0]);
        if (this.state.date === "") { this.state.date = new Date();}
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
                    
                    calendar: this.renderCalendar(this.state.pruefungenInfos, this.state.date)[0]
                    
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
        updateState(this.state.aktiveFilter, this.state.searchItem);
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
                            id = {pruefungenKeys[i]+'_col_head'}>
                                <b>{pruefungenKeys[i]}</b>
                        </td>);
                    
                                    
                }

                for(let i = 0; i<pruefungen.length; i++) {
                    
                    let pruefungenValues = Object.values(pruefungen[i]);
                    let filteredOut = false;
                    let containsSearch = false

                    

                    if (!(pruefungenValues[5] == null)) {

                        let pruefungDatum = pruefungenValues[5].split('-');
                        pruefungDatum[1] = parseInt(pruefungDatum[1]);
                        if (typeof pruefungDatum[2] === 'string') {
                            pruefungDatum[2] = parseInt(pruefungDatum[2].split(' ')[0]);
                        }
                        
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
                        pruefungenInfos1[0] = "test";
                        if(!filteredOut&&containsSearch) {
                            let tag = (pruefungDatum[1]-1)*31 + pruefungDatum[2];
                            if (typeof(pruefungenInfos1[tag]) === "undefined") {
                                pruefungenInfos1[tag] = [];
                            }
                            let pruefungenInstance = [];
                            for (let j = 1; j<pruefungenValues.length; j++){
                                pruefungenInstance.push(<td>{pruefungenValues[j]}</td>);
                            }
                            console.log(pruefungenInstance);
                            let included = false;
                            let includedAt = -1;
                            for(let k = 0; k<pruefungenInfos1[tag].length; k++){
                                if(pruefungenInfos1[tag][k][1] === pruefungenValues[3]) {
                                    included = true;
                                    includedAt = k;
                                }
                            }

                            if (!included){
                                pruefungenInfos1[tag].push([parseInt(pruefungDatum[0]), pruefungenValues[3], [<tr><td id = "categorycontent">{pruefungenInstance}</td></tr>]]);
                            }
                            else {
                                pruefungenInfos1[tag][includedAt][2].push(<tr><td id = "categorycontent">{pruefungenInstance}</td></tr>);
                            }
                            console.log(pruefungenInfos1[tag]);
                        }
                    }   
                }
            }  
            
            //console.log(pruefungenInfos1[0]);
            this.state.pruefungenInfos = pruefungenInfos1;
        }

        

    
        return(
            <>
            <table id = "month">
                <tbody>
                    <tr>
                        <td className="prev" onClick={()=>{
                            this.state.calendar = this.prevMonth(this.state.pruefungenInfos, this.state.date)[0]; 
                            updateState(this.state.aktiveFilter, this.state.searchItem);
                            
                            }}>
                        {'\u276E'}
                        </td>
                        
                        <td id = "cur_month">
                            A
                        </td>
                        
                        <td className="next" onClick={()=>{
                            this.state.calendar = this.nextMonth(this.state.pruefungenInfos, this.state.date)[0]; 
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
