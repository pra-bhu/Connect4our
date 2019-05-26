import React, { Component } from 'react'

export default class Reset extends Component {
    
    render() {
        return (
            <div >
                <button className = "Reset" onClick = {()=> this.props.handleReset()}><strong>RESET</strong></button>
            </div>
        );
    }
}