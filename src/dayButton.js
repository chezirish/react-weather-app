import React, { Component } from 'react';
import './dayButton.css';

class DayButton extends Component {
    render(){
        
        return (
            <div className="dayBtn">
                <h3>{this.props.day}</h3>
                <p>{this.props.date}</p>
            </div>
        );
    }
}

export default DayButton;