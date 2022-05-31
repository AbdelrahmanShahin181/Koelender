import React from 'react';

export default class StyleButton extends React.Component{
    

    render() {
        return(
            <li>
                <button onClick={()=>{
                    var colorPath = 
                    process.env.PUBLIC_URL + '/static/css/color_'+this.props.file+'.css';
                    this.props.updateColorParent({colorPath});
                }}>{this.props.color}</button>
            </li>
        )
    }
}