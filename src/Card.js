import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>I am a card! Hear me roar my value is {this.props.value}</div>
        );
    }
}

export default Card;