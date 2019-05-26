import React, { Component } from 'react';

import "./style/game.css";
import CoinSpot from './CoinSpot';
import GameStatus from "./GameStatus";
import Reset from "./Reset";
import { placeDisc , checkWinner } from "../core/core";
import { INITIAL_STATE , PLAYER1_COLOR, PLAYER2_COLOR, PLAYER1_STATUS, PLAYER2_STATUS} from "../constants/constants";
import { List } from "immutable";
import Header from './Header';

export default class GameBoard extends Component{
    
    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.checkWinner = this.checkWinner.bind(this);

        const initialstate = List(INITIAL_STATE.map((curr, rowId) => {
            return curr.map((innerElement, columnId)=> <CoinSpot 
                                                        key = {[rowId, columnId]} 
                                                        id = {[rowId , columnId]} 
                                                        class = {innerElement} 
                                                        handleClick = {this.handleClick}
                                                        checkWinner = {this.checkWinner}
                                                        reset = {false}/>)
        }));

        this.state = {
            gridState : initialstate,
            clickedColumnIndex : 0,
            currentColor : PLAYER1_COLOR,
            flipCoin : "right",
            gameStatus : PLAYER1_STATUS,
            result : ""
        }
    }
    
    render(){
        const gameStatus = this.state.result === "" ? this.state.gameStatus : this.state.result;
        return(
            <div className = {this.state.result === "" ?"MainSection" : "MainSection GameOver"}>
                <Header />
                <GameStatus 
                    flipCoin={this.state.flipCoin} 
                    gameStatus = {gameStatus} />
                <div className = "GameBoard"> 
                    {this.state.gridState}
                </div>
                <Reset handleReset = {this.handleReset}/>
            </div>
        )
    }

    handleClick(clickedColumnIndex,clickedClassName){
        const canClick = this.state.result==="" ; 
        const rowIndex = placeDisc(clickedColumnIndex, this.state.gridState);
        if(canClick){
            if(rowIndex > -1){
            this.setState(prevState => ({
                        gridState : prevState.gridState.setIn([rowIndex , clickedColumnIndex], 
                                                        <CoinSpot 
                                                            key = {[rowIndex , clickedColumnIndex]} 
                                                            id = {[rowIndex , clickedColumnIndex]} 
                                                            class = {prevState.currentColor} 
                                                            handleClick = {this.handleClick} 
                                                            checkWinner = {this.checkWinner}
                                                            reset = {false}/>),
                        currentColor : prevState.currentColor === PLAYER1_COLOR ? PLAYER2_COLOR : PLAYER1_COLOR,
                        gameStatus : prevState.gameStatus === PLAYER1_STATUS ? PLAYER2_STATUS : PLAYER1_STATUS,
                        flipCoin : prevState.flipCoin === "right" ?"left" : "right",
                        

                    })
                );
                
            }
        }
        
        
        
    }

    //Check if there's a winner by passing the current position
    checkWinner(currentDiscPosition){
        const message = checkWinner(currentDiscPosition, this.state.gridState);

        if(message[1] !== "gameOn"){
            
                const winnerStatus = 
                message[1] === "drawn" 
                ? "Game is Drawn!!!" :
                    (message[0] === PLAYER1_COLOR ? 
                    "Player 1 wins "+ message[1] :
                    "Player 2 wins "+ message[1]);
                this.setState(prevState => ({
                    result: winnerStatus}));
        }
    }

    //Reset the entire state of the GameBoard Component

    handleReset(){
        this.setState(
            {
            gridState : List(INITIAL_STATE.map((curr, rowId) => {
                return curr.map((innerElement, columnId)=> <CoinSpot 
                                                            key = {[rowId, columnId]} 
                                                            id = {[rowId , columnId]} 
                                                            class = {innerElement} 
                                                            handleClick = {this.handleClick}
                                                            checkWinner = {this.checkWinner}
                                                            reset = {true} />)
            })),
            clickedColumnIndex : 0,
            currentColor : PLAYER1_COLOR,
            currentDiscPosition : [],
            flipCoin : "right",
            gameStatus : PLAYER1_STATUS,
            result : ""
            }
        );
    }


}