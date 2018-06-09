import React, { Component } from 'react';
import './App.css';
import Card from "./Card";

const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

class App extends Component {

    constructor(props) {
        super(props);

        let deck = this.setupDeck();
        this.state = {
            deck: deck
        }
    }

    /**
     * Create, shuffle, and distribute deck
     */
    setupDeck = () => {
        let deck = [];
        suits.forEach( (suit) => {
            values.forEach( (value) => {
                deck.push({
                    suit: suit,
                    value: value
                         })
            })
        });
        this.shuffleArray(deck);
        return {
            player1_cards: deck.slice(0, 28),
            player2_cards: deck.slice(28)

        }
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

    render() {
        return (
            <div>Hello this is my React app
                <Card value={12}/>
            </div>
        );
    }
}

export default App;
