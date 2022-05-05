//const date = new Date();

export function renderCalendar(infos, date) {

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
                
                event.push(<div onClick=/*{this.togglePopup.bind(this)}*/ {() => {console.log("test")}}>{infos[date.getMonth()*31+y][j][1]}</div>);
                
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


export function prevMonth(infos, date){
    //console.log(date.getMonth());
    date.setMonth(date.getMonth()-1);
    return renderCalendar(infos, date);
}

export function nextMonth(infos, date){
    date.setMonth(date.getMonth()+1);
    return renderCalendar(infos, date);
}
