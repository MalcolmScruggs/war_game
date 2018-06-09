import {Suits, Ranks, RankValues } from '../cards/CardConstants';

export const shuffleAndDealCards = () => {
    let deck = [];
    Suits.forEach((suit) => {
        Ranks.forEach((rank) => {
            deck.push({
                suit: suit,
                rank: rank
            })
        })
    });

    shuffleArray(deck);

    return {
        p1Cards: deck.slice(0, 26),
        p1Discard: [],
        p2Cards: deck.slice(26),
        p2Discard: []
    }
};

/**
 * Shuffle array with Fisher-Yates shuffle. Done via mutation.
 *
 * @param array
 */
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const HandOutcomes = ['P1_WINS_HAND', 'P2_WINS_HAND', 'WAR_IN_PROGRESS', 'P1_VICTORY', 'P2_VICTORY'];

/**
 * Compute the result of comparing the top cards for each top of deck.
 *
 * Assumes that each player has already had discards moved to their hands. (This allows to
 * assume that if hand is empty they have lost)
 *
 * @param hands
 * @param turnsLeftInWar
 * @returns {string}
 */
export const computeHandOutcome = (hands, turnsLeftInWar) => {
    if (hands.p1Cards.length === 0) { //todo verify end game is correct (especially in war)
        return 'P1_VICTORY';
    } else if (hands.p2Cards.length === 0) {
        return 'P2_VICTORY';
    }

    if (turnsLeftInWar > 0) {
        return 'WAR_IN_PROGRESS';
    }

    let p1Card = hands.p1Cards[0];
    let p2Card = hands.p2Cards[0];
    if (RankValues[p1Card.rank] === RankValues[p2Card.rank]) {
        return 'WAR_IN_PROGRESS';
    } else if (RankValues[p1Card] > RankValues[p2Card]) {
        return 'P1_WINS_HAND';
    } else {
        return 'P2_WINS_HAND';
    }
};