import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Suits, Ranks } from '../cards/CardConstants'

class FlippedCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let style = {
            // backgroundColor: "red",
            ...this.props.style
        };

        return(
            <div style={style}>{this.props.rank} of {this.props.suit}</div>
        );
    }
}

FlippedCard.propTypes = {
    rank: PropTypes.oneOf(Ranks),
    suit: PropTypes.oneOf(Suits)
};

export default FlippedCard;