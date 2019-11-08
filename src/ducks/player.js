const ACTION_PREPEND = 'salto-game/battle';
const ADD_CARD_TO_DECK = `${ACTION_PREPEND}/ADD_CARD_TO_DECK`;
const ADD_CARD_TO_DISCARD = `${ACTION_PREPEND}/ADD_CARD_TO_DISCARD`;
const ADD_CARD_TO_HAND = `${ACTION_PREPEND}/ADD_CARD_TO_HAND`;
const REMOVE_CARD_FROM_DECK = `${ACTION_PREPEND}/REMOVE_CARD_FROM_DECK`;
const REMOVE_CARD_FROM_DISCARD = `${ACTION_PREPEND}/REMOVE_CARD_FROM_DISCARD`;
const REMOVE_CARD_FROM_HAND = `${ACTION_PREPEND}/REMOVE_CARD_FROM_HAND`;
const DECREMENT_ACTIONS = `${ACTION_PREPEND}/DECREMENT_ACTIONS`;

const initialState = {
  hp: 100,
  deck: [],
  hand: [],
  discard: [],
  remainingActions: 12,
  maxActions: 12
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CARD_TO_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        deck: [...state.deck, id]
      };
    }

    case ADD_CARD_TO_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        discard: [...state.discard, id]
      };
    }

    case ADD_CARD_TO_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        hand: [...state.hand, id]
      };
    }

    case REMOVE_CARD_FROM_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        deck: state.deck.filter(card => card !== id)
      };
    }

    case REMOVE_CARD_FROM_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        hand: state.discard.filter(card => card !== id)
      };
    }

    case REMOVE_CARD_FROM_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        hand: state.hand.filter(card => card !== id)
      };
    }

    case DECREMENT_ACTIONS: {
      const { amount } = action.payload;
      return {
        ...state,
        remainingActions:
          state.remainingActions >= amount ? state.remainingActions - amount : 0
      };
    }

    default:
      return state;
  }
}

export const addCardToDeck = id => ({
  type: ADD_CARD_TO_DECK,
  payload: {
    id
  }
});

export const addCardToDiscard = id => ({
  type: ADD_CARD_TO_DISCARD,
  payload: {
    id
  }
});

export const addCardToHand = id => ({
  type: ADD_CARD_TO_HAND,
  payload: {
    id
  }
});

export const removeCardFromDeck = id => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: {
    id
  }
});

export const removeCardFromDiscard = id => ({
  type: REMOVE_CARD_FROM_DISCARD,
  payload: {
    id
  }
});

export const removeCardFromHand = id => ({
  type: REMOVE_CARD_FROM_HAND,
  payload: {
    id
  }
});

export const decrementPlayerActions = amount => ({
  type: DECREMENT_ACTIONS,
  payload: {
    amount
  }
});

export const getPlayerState = store => store.player;

export const getPlayerActions = store =>
  getPlayerState(store) ? getPlayerState(store).remainingActions : 0;