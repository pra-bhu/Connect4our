import React, { Component } from 'react'

export default class GameStatus extends Component {

    render() {
        return (
            <div className = "GameStatus">
                <div className = {this.props.gameStatus.includes("wins")?
                    (this.props.gameStatus.includes("Player 1 wins") ? "FlipCoin flip-right ColorPlayer1" : "FlipCoin flip-left ColorPlayer2")
                    : (this.props.flipCoin === "left"? "FlipCoin flip-left ColorPlayer2" : "FlipCoin flip-right ColorPlayer1")}></div>

                <div className = "Status">
                    <strong>{this.props.gameStatus}</strong>
                </div>
                
            </div>
        );
    }
}

