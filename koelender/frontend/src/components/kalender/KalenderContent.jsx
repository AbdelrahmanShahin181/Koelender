
import React from 'react';
import {prevMonth, nextMonth, renderCalendar} from '../../js/kalender';


export default class KalenderContent extends React.Component{

    render() {
    
        return(
            <>
            <table id = "month">
                <tbody>
                    <tr>
                        <td className="prev" onClick={()=>prevMonth()}>
                        {'\u276E'}
                        </td>
                        
                        <td id = "cur_month">
                            A
                        </td>
                        
                        <td className="next" onClick={()=>nextMonth()}>
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
                    {/*Hier wird der Kalender generiert*/}
                    {/*ToDo: Füllen der content divs mit Terminen*/}
                </tbody>

            </table>
            </>
        );
    }
}
