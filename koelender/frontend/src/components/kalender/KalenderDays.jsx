export function renderCalendar(infos, date, instance) {
    
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
        
        if(typeof(infos[(date.getMonth()-1)*31+(lastMonthDays-x+1)]) !== "undefined") {
            for(let j = 0; j<infos[(date.getMonth()-1)*31+(lastMonthDays-x+1)].length; j++)
            if (infos[(date.getMonth()-1)*31+(lastMonthDays-x+1)][j][0] === date.getFullYear()) {
                
                event.push(<div id = "event" onClick={()=>{instance.togglePopup(infos[(date.getMonth()-1)*31+(lastMonthDays-x+1)][j])}} >{infos[(date.getMonth()-1)*31+(lastMonthDays-x+1)][j][1]}</div>);
                
            }
            else {
                event = [];
            }
        }
        else {
            event = [];
        }
        if (x===-1) {
            x=6;
        }
        week.push( <td id="other_month" class="day">
                <div id="date" onClick={()=>instance.showDayPopup("y" + date.getFullYear() + "d" + (lastMonthDays-x+1) + "m" + (date.getMonth()-1))}>{lastMonthDays-x+1}</div>
                <div id="content" class = {"y" + date.getFullYear() + "d" + (lastMonthDays-x+1) + "m" + (date.getMonth()-1)}> {event} </div>
            </td>);
        event = [];
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
                
                event.push(<div id = "event" onClick={()=>{instance.togglePopup(infos[date.getMonth()*31+y][j])}} >{infos[date.getMonth()*31+y][j][1]}</div>);
                
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
                    <div id="date" onClick={()=>instance.showDayPopup("y" + date.getFullYear() + "d" + y + "m" + date.getMonth())}>{y}</div>
                    <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + date.getMonth()}> {event} </div>
                </td>);
        }
        else {
            week.push( <td class="day">
                    <div id="date" onClick={()=>instance.showDayPopup("y" + date.getFullYear() + "d" + y + "m" + date.getMonth())}>{y}</div>
                    <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + date.getMonth()}> {event} </div>
                </td>);
        }
        event = [];
        i++;
    }
    
    for(let y=1; !(i%7 === 1);y++) {

        if(typeof(infos[(date.getMonth()+1)*31+y]) !== "undefined") {
            for(let j = 0; j<infos[(date.getMonth()+1)*31+y].length; j++)
            if (infos[(date.getMonth()+1)*31+y][j][0] === date.getFullYear()) {
                
                event.push(<div id = "event" onClick={()=>{instance.togglePopup(infos[(date.getMonth()+1)*31+y][j])}} >{infos[(date.getMonth()+1)*31+y][j][1]}</div>);
                
            }
            else {
                event = [];
            }
        }
        else {
            event = [];
        }
        
        week.push( <td id="other_month" class="day">
                <div id="date" onClick={()=>instance.showDayPopup("y" + date.getFullYear() + "d" + y + "m" + (date.getMonth()+1))}>{y}</div>
                <div id="content" class = {"y" + date.getFullYear() + "d" + y + "m" + (date.getMonth()+1)}> {event} </div>
            </td>);
        event = [];
        i++;
    }
    days.push( <tr id = "oops">{week}</tr>);

    return([days,date]);

}

export function prevMonth(infos, date, instance){
    date.setMonth(date.getMonth()-1);
    return renderCalendar(infos, date, instance);
}

export function nextMonth(infos, date, instance){
    date.setMonth(date.getMonth()+1);
    return renderCalendar(infos, date, instance);
}
