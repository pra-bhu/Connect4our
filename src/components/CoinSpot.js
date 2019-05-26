import React, { Component } from 'react';


import "./style/game.css"

export default class CoinSpot extends Component{
    render(){
        return(
        <div 
        className = {this.props.class} 
        id = {this.props.id} 
        onClick = {() => this.props.handleClick(this.props.id[1], this.props.class)}>
        </div>
        );
    }

    componentDidUpdate(prevProps){
        if(!this.props.reset){
        if(this.props.class !== prevProps.class){
            this.props.checkWinner(this.props.id);
        }}
    }
}
