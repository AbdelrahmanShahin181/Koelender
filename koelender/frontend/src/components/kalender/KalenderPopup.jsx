
import React from 'react';

export default class KalenderPopup extends React.Component {

    render() {
        return(
            <div className= "popup_outer">
                <div className= "popup_inner">
                    <button onClick={this.props.closePopup}>X</button>
                    <h3>{this.props.name}</h3>
                    
                    <table id = "popup_table">
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id = "categories">{this.props.categories}</td>
                            </tr>
                            <tr>
                                <td id = "categorycontent"><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td><td>a</td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}