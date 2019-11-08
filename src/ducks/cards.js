const ACTION_PREPEND = 'salto-game/battle';
const CREATE_CARD = `${ACTION_PREPEND}/CREATE_CARD`;

const initialState = {
  allIds: [],
  byIds: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CARD: {
      const { id, name, power, description, cost } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            name,
            power,
            cost,
            description
          }
        }
      };
    }

    default:
      return state;
  }
}

export const createCard = (id, name, power, description, cost) => ({
  type: CREATE_CARD,
  payload: {
    id,
    name,
    power,
    description,
    cost
  }
});

export const getCardState = store => store.cards;

export const getCardList = store =>
  getCardState(store) ? getCardState(store).allIds : [];

export const getCardById = (store, id) =>
  getCardState(store) ? { ...getCardState(store).byIds[id], id } : {};

export const getCards = store =>
  getCardList(store).map(id => getCardById(store, id));