const date = new Date();

export function renderCalendar() {

    console.log("function renderCalendar started");

    const month = date.getMonth();
    const monthDays = document.querySelector("#days");
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



    for(let x=firstDayIndex-1; x!==0; x--) {
        if (x===-1) {
            x=6;
        }
        if (i===1) {
            days.push( '<tr>');
        }
        else if (i%7 === 1) {
            days.push( '</tr><tr>');
        }
        days.push( `<td id="other_month" class="day"><div id="date">${lastMonthDays-x+1}</div><div id="content" class = "y${date.getFullYear()} d${lastMonthDays-x+1} m${date.getMonth()-1}">  </div></td>`);
        i++;
    }

    for(let y=1; y<=lastDay;y++) {
        if (i===1) {
            days.push( '<tr>');
        }
        else if (i%7 === 1) {
            days.push( '</tr><tr>');
        }
        if(y===new Date().getDate() && date.getMonth()===new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            days.push( `<td id="today" class="day"><div id="date">${y}</div><div id="content" class = "y${date.getFullYear()} d${y} m${date.getMonth()}">  </div></td>`);
        }
        else {
            days.push( `<td class="day"><div id="date">${y}</div><div id="content" class = "y${date.getFullYear()} d${y} m${date.getMonth()}">  </div></td>`);
        }
        i++;
    }

    for(let y=1; !(i%7 === 1);y++) {
        
        days.push( `<td id="other_month" class="day"><div id="date">${y}</div><div id="content" class = "y${date.getFullYear()} d${y} m${date.getMonth()+1}" >  </div></td>`);
        i++;
    }
    days.push( '</tr>');

    return(days);
    //monthDays.innerHTML = days;

}


export function prevMonth(){
    date.setMonth(date.getMonth()-1);
    renderCalendar();
}

export function nextMonth(){
    date.setMonth(date.getMonth()+1);
    renderCalendar();
}
