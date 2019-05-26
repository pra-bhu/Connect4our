import React, { Component } from 'react'

export default class Header extends Component {
    
    render() {
        return (
            <div className ="Header">
                <h1 className="Heading">Connect 4our</h1>
                
                <a href = "https://en.wikipedia.org/wiki/Connect_Four#Gameplay" target = "_blank" rel="noopener noreferrer">
                <img className = "Help" src={"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-help-outline-512.png"} alt="Know the rules"/>
                </a>
            </div>

        );
    }
}