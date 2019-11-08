const ACTION_PREPEND = 'salto-game/battle';
const ADD = `${ACTION_PREPEND}/ADD`;
const ATTACK = `${ACTION_PREPEND}/ATTACK`;

const initialState = {
  allIds: [],
  byIds: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD: {
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
    case ATTACK: {
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

let nextMonsterId = 0;

export const addMonster = hp => ({
  type: ADD,
  payload: {
    id: ++nextMonsterId,
    hp
  }
});

export const attackMonster = (id, dmg, cost) => ({
  type: ATTACK,
  payload: {
    id,
    dmg,
    cost
  }
});

export const getMonsterState = store => store.monsters;

export const getMonsterList = store =>
  getMonsterState(store) ? getMonsterState(store).allIds : [];

export const getMonsterById = (store, id) =>
  getMonsterState(store) ? { ...getMonsterState(store).byIds[id], id } : {};

export const getMonsters = store =>
  getMonsterList(store).map(id => getMonsterById(store, id));