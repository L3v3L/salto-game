import { ADD_MONSTER, ATTACK_MONSTER } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_MONSTER: {
      const { id, hp } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            hp
          }
        }
      };
    }
    case ATTACK_MONSTER: {
      const { id, dmg } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds],
        byIds: {
          ...state.byIds,
          [id]: {
            hp: dmg <= state.byIds[id].hp ? state.byIds[id].hp - dmg : 0
          }
        }
      };
    }
    default:
      return state;
  }
}
