
import React from 'react';

export default class KalenderPopup extends React.Component {

    render() {
        return(
            <div className= "popup_outer">
                <div className= "popup_inner">
                    <button onClick={this.props.closePopup}>{'\u2715'}</button>
                    <h3>{this.props.infos[1]}</h3>
                    <div id = "popup_tableframe">
                        
                        
                        <table id = "popup_table">
                            <tbody>
                                <tr>
                                    <td id = "categories">{this.props.categories}</td>
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