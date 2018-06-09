import { shuffleAndDealCards, computeHandOutcome } from '../logic/warLogic.js';

import * as _ from 'lodash';

export const initialState = {
    hands: shuffleAndDealCards(),
    turnsLeftInWar: 0,
    cardsInWar: [],
    won: undefined,
    wonLine: undefined,
    turnNumber: 0,
};

const NUMBER_TURNS_IN_WAR = 4;

export const warReducer = (state, action) => {
    switch (action.type) {
        case 'FLIP_NEXT':
            const newState = _.cloneDeep(state);

            handleMoveFromDiscard(newState);

            let handOutcome = computeHandOutcome(newState.hands, newState.turnsLeftInWar);
            if (handOutcome === 'P1_VICTORY' || handOutcome === 'P2_VICTORY') { //todo better victory state (w/ helper)
                newState.won = handOutcome;
                newState.wonLine = handOutcome;
            }
            handleHand(newState, handOutcome);

            return newState;
        case 'START_GAME':
            return initialState;
        default:
            return state;
    }
};

export const handleMoveFromDiscard = (newState) => {
    if (newState.hands.p1Cards.length === 0) {
        let discard = newState.hands.p1Discard;
        newState.hands.p1Cards = discard.splice(0, discard.length);
    }

    if (newState.hands.p2Cards.length === 0) {
        let discard = newState.hands.p2Discard;
        newState.hands.p2Cards = discard.splice(0, discard.length);
    }
};

export const handleHand = (newState, handOutcome) => {
    let p1Card = newState.hands.p1Cards.shift();
    let p2Card = newState.hands.p2Cards.shift();
    let cardsWon = [p1Card, p2Card];
    switch (handOutcome) {
        case 'P1_WINS_HAND':
            cardsWon.concat(newState.cardsInWar);
            newState.hands.p1Discard = cardsWon.concat(newState.hands.p1Discard);
            return newState;
        case 'P2_WINS_HAND':
            cardsWon.concat(newState.cardsInWar);
            newState.hands.p2Discard = cardsWon.concat(newState.hands.p2Discard);
            return newState;
        case 'WAR_IN_PROGRESS':
            newState.cardsInWar.concat(cardsWon);
            newState.turnsLeftInWar === 0 ? newState.turnsLeftInWar = NUMBER_TURNS_IN_WAR : newState.turnsLeftInWar--;
            return newState;
        default:
            return newState; //todo error throwing?
    }
};