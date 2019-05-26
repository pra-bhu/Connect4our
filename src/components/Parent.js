import React, { Component } from 'react';

import GameBoard from "./GameBoard";



export default class Parent extends Component {


    render(){
        return(
            <div className = "Parent">
                
                <hr/>
                <GameBoard />
                
            </div>
        );
    }

}
