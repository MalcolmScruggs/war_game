import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flipNext, startGame } from '../actions/actions';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'

class WarGame extends Component {

    render() {
        return(
        <div>
            <p>WarGame component</p>
            <Button onClick={this.props.startGame}>Start</Button>
        </div>
        )
    }

}

WarGame.propTypes = {
    startGame: PropTypes.func.isRequired
};

export default connect(
    ({hands, turnsLeftInWar, cardsInWar, won, wonLine, turnNumber}) => ({
        hands, turnsLeftInWar, cardsInWar, won, wonLine, turnNumber
    }),
    (dispatch) => {
        return {
            startGame() {
                dispatch(startGame());
            }
        }
    }
)(WarGame);