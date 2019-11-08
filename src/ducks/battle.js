const ACTION_PREPEND = 'salto-game/battle';
const TOGGLE_CARD_SELECTION = `${ACTION_PREPEND}/TOGGLE_CARD_SELECTION`;
const TOGGLE_TARGET_SELECTION = `${ACTION_PREPEND}/TOGGLE_TARGET_SELECTION`;

const initialState = {
  selectingCard: true,
  selectingTarget: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_TARGET_SELECTION: {
      const { isEnabled } = action.payload;
      return {
        ...state,
        selectingCard: isEnabled ? false : state.selectingCard,
        selectingTarget: isEnabled ? true : false
      };
    }

    case TOGGLE_CARD_SELECTION: {
      const { isEnabled } = action.payload;
      return {
        ...state,
        selectingCard: isEnabled ? true : false,
        selectingTarget: isEnabled ? false : state.selectingTarget
      };
    }

    default:
      return state;
  }
}

export const getBattleState = store => store.battle;