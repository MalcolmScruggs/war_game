import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import FlippedCard from './FlippedCard';
import { Suits, Ranks, RankValues } from './cards/CardConstants';
import { initialState } from './reducers/warReducer.js';

const GAME_STATES = ['INITIAL', 'RUNNING', 'OVER'];

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gameState: 'INITIAL',
            player1_cards: [],
            player1_discard: [],
            player2_cards: [],
            player2_discard: []
        }
    }

    /**
     * Create, shuffle, and distribute deck
     */
    setupGame = () => {
        let deck = [];
        Suits.forEach( (suit) => {
            Ranks.forEach( (rank) => {
                deck.push({
                    suit: suit,
                    rank: rank
                })
            })
        });
        this.shuffleArray(deck);

        this.setState(() => {
            return {
                player1_cards: deck.slice(0, 26),
                player1_discard: [],
                player2_cards: deck.slice(26),
                player2_discard: [],
                gameState: 'RUNNING'
            }
        });
    };

    render() {
        console.log(initialState);
        if (this.state.gameState === 'INITIAL' || this.state.gameState === 'OVER') {
            return this.renderInitialGameState();
        } else {
            return this.renderRunningGameState();
        }
    }

    renderInitialGameState = () => {
        return (
            <Button onClick={this.computeNextGameState}>Start new game</Button>
        )
    };

    renderRunningGameState = () => {
        let player1TopCard = this.state.player1_cards[0];
        let player2TopCard = this.state.player2_cards[0];
        return (
            <div>
                <div>player 1 top card</div>
                <FlippedCard suit={player1TopCard.suit} rank={player1TopCard.rank} />
                <p>player 2 top card</p>
                <FlippedCard suit={player2TopCard.suit} rank={player2TopCard.rank} />

                <Button onClick={this.computeNextGameState}>Next Move</Button>
            </div>
        )
    }
}

export default App;
