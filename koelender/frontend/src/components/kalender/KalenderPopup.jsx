
import React from 'react';

export default class KalenderPopup extends React.Component {

    componentDidMount(){
        var tbl = document.querySelector('#popup_table');

        var tbody = tbl.childNodes[0];
        var oldWidth = tbody.childNodes[0].childNodes.length;
        console.log("width: "+oldWidth);
        var oldHeight = tbody.childNodes.length;
        console.log("height: "+oldHeight);
        var newWidth = oldHeight;
        var newHeight = oldWidth;       

        var newTbody = document.createElement("tbody");
        for(var y=0; y<newHeight; y++)
        {
            //console.log(tbody.childNodes[0].childNodes[y]);
            var newRow = document.createElement("tr");
            for(var x=0; x<newWidth; x++)
            {
                if(typeof(tbody.childNodes[x].childNodes[0]) === 'object') {
                    newRow.appendChild(tbody.childNodes[x].childNodes[0])
                }
                //console.log(y);
            }
            newTbody.appendChild(newRow);
        }

        tbl.removeChild(tbl.childNodes[0]);
        tbl.appendChild(newTbody);
    }

    render() {
        return(
            <div className= "popup_outer" onClick={this.props.closePopup}>
                <div className= "popup_inner">
                    <button onClick={this.props.closePopup}>{'\u2715'}</button>
                    <h3>{this.props.infos[1]}</h3>
                    <div id = "popup_tableframe">
                        
                        
                        <table id = "popup_table">
                            <tbody>
                                <tr>
                                    {/*<td id = "categories">*/}{this.props.categories}{/*</td>*/}
                                </tr>
                                
                                    {this.props.infos[2]}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}