
import { 
    CREATE_CARD
} from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {

    case CREATE_CARD: {
      const { id, name, power } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
            ...state.byIds,
            [id]: {
                name,
                power
            }
        }
      };
    }

    default:
      return state;
  }
}
