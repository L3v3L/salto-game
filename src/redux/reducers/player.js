import { 
    ADD_CARD_TO_DECK,
    ADD_CARD_TO_HAND,
    ADD_CARD_TO_DISCARD,
    REMOVE_CARD_FROM_DECK,
    REMOVE_CARD_FROM_HAND,
    REMOVE_CARD_FROM_DISCARD,
    DECREMENT_ACTIONS,
} from "../actionTypes";

const initialState = {
      hp: 100,
      deck: [],
      hand: [],
      discard: [],
      remainingActions: 12,
      maxActions: 12,
};

export default function(state = initialState, action) {
  switch (action.type) {
    //TODO: Refactor these reducers

    case ADD_CARD_TO_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        deck: [
            ...state.deck,
            id
        ]
      };
    }

    case REMOVE_CARD_FROM_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        deck: state.deck.filter((card) => card !== id),
      };
    }

    case ADD_CARD_TO_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        hand: [
            ...state.hand,
            id
        ]
      };
    }

    case REMOVE_CARD_FROM_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        hand: state.hand.filter((card) => card !== id),
      };
    }

    case ADD_CARD_TO_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        discard: [
            ...state.discard,
            id
        ]
      };
    }

    case REMOVE_CARD_FROM_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        hand: state.discard.filter((card) => card !== id),
      };
    }
    
    case DECREMENT_ACTIONS: {
      const { amount } = action.payload;
      return {
        ...state,
        remainingActions: state.remainingActions >= amount ? state.remainingActions - amount : 0
      };
    }

    default:
      return state;
  }
}
