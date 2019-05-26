import React, { Component } from 'react'

export default class GameStatus extends Component {

    render() {
        return (
            <div className = "GameStatus">
                <div className = {this.props.flipCoin === "left"? "FlipCoin flip-left ColorPlayer2" : "FlipCoin flip-right ColorPlayer1"}></div>

                <div className = "Status">
                    <strong>{this.props.gameStatus}</strong>
                </div>
                
            </div>
        );
    }
}

