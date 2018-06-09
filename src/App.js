import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-bootstrap'
import FlippedCard from './FlippedCard';
import { Suits, Ranks, RankValues } from './CardConstants';

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
                player1_cards: deck.slice(0, 28),
                player1_discard: [],
                player2_cards: deck.slice(28),
                player2_discard: [],
                gameState: 'RUNNING'
            }
        });
    };

    /**
     * Shuffle array with Fisher-Yates shuffle. Done via mutation.
     *
     * @param array
     */
    shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    computeNextGameState = () => {
        console.log('computing next game state');
        if (this.state.gameState === 'INITIAL' || this.state.gameState === 'OVER') {
            console.log('starting game');
            this.setupGame();
            return;
        }
    };

    render() {
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
