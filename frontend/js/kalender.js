const date = new Date();

const renderCalendar = () => {

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

    document.querySelector("#month #cur_month").innerHTML 
    = months[month];

    document.querySelector("#month #cur_year").innerHTML 
    = "<p>" + date.getFullYear() + "</p>";

    let days = "";

    let i = 1;

    for(let x=firstDayIndex-1; x!=0; x--) {
        if (x==-1) {
            x=6;
        }
        if (i==1) {
            days += '<tr>';
        }
        else if (i%7 == 1) {
            days += '</tr><tr>';
        }
        days += `<td id="other_month" class="day"><div id="date">${lastMonthDays-x+1}</div><div id="content"></div></td>`;
        i++;
    }

    for(let y=1; y<=lastDay;y++) {
        if (i==1) {
            days += '<tr>';
        }
        else if (i%7 == 1) {
            days += '</tr><tr>';
        }
        if(y===new Date().getDate() && date.getMonth()===new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
            days += `<td id="today" class="day"><div id="date">${y}</div><div id="content"></div></td>`;
        }
        else {
            days += `<td class="day"><div id="date">${y}</div><div id="content"></div></td>`;
        }
        i++;
    }

    for(let y=1; !(i%7 == 1);y++) {
        
        days += `<td id="other_month" class="day"><div id="date">${y}</div><div id="content"></div></td>`;
        i++;
    }
    days += '</tr>';

    monthDays.innerHTML = days;

}



document.querySelector(".prev").addEventListener("click", ()=>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
})

document.querySelector(".next").addEventListener("click", ()=>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
})

renderCalendar();