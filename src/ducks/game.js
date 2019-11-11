const ACTION_PREPEND = "salto-game/battle";
const CREATE_CARD = `${ACTION_PREPEND}/CREATE_CARD`;
const ADD_CARD_TO_DECK = `${ACTION_PREPEND}/ADD_CARD_TO_DECK`;
const ADD_CARD_TO_BATTLE_DECK = `${ACTION_PREPEND}/ADD_CARD_TO_BATTLE_DECK`;
const ADD_CARD_TO_DISCARD = `${ACTION_PREPEND}/ADD_CARD_TO_DISCARD`;
const ADD_CARD_TO_HAND = `${ACTION_PREPEND}/ADD_CARD_TO_HAND`;
const REMOVE_CARD_FROM_BATTLE_DECK = `${ACTION_PREPEND}/REMOVE_CARD_FROM_BATTLE_DECK`;
const REMOVE_CARD_FROM_DECK = `${ACTION_PREPEND}/REMOVE_CARD_FROM_DECK`;
const REMOVE_CARD_FROM_DISCARD = `${ACTION_PREPEND}/REMOVE_CARD_FROM_DISCARD`;
const REMOVE_CARD_FROM_HAND = `${ACTION_PREPEND}/REMOVE_CARD_FROM_HAND`;
const DECREMENT_ACTIONS = `${ACTION_PREPEND}/DECREMENT_ACTIONS`;
const TOGGLE_CARD_SELECTION = `${ACTION_PREPEND}/TOGGLE_CARD_SELECTION`;
const TOGGLE_TARGET_SELECTION = `${ACTION_PREPEND}/TOGGLE_TARGET_SELECTION`;
const ADD_MONSTER = `${ACTION_PREPEND}/ADD_MONSTER`;
const ATTACK_MONSTER = `${ACTION_PREPEND}/ATTACK_MONSTER`;
const ATTACK_TARGETED_MONSTER = `${ACTION_PREPEND}/ATTACK_TARGETED_MONSTER`;
const SET_BATTLE_DECK = `${ACTION_PREPEND}/SET_BATTLE_DECK`;
const SET_DISCARD_DECK = `${ACTION_PREPEND}/SET_DISCARD_DECK`;
const SET_HAND_DECK = `${ACTION_PREPEND}/SET_HAND_DECK`;
const SET_BATTLE_HP = `${ACTION_PREPEND}/SET_BATTLE_HP`;
const SET_BATTLE_CURRENT_AP = `${ACTION_PREPEND}/SET_BATTLE_CURRENT_AP`;
const SET_BATTLE_MAX_AP = `${ACTION_PREPEND}/SET_BATTLE_MAX_AP`;
const SET_QUEUED_ACTIONS = `${ACTION_PREPEND}/SET_QUEUED_ACTIONS`;
const SET_SELECTED_TARGET = `${ACTION_PREPEND}/SET_SELECTED_TARGET`;

let nextMonsterUUID = 0;
let nextCardUUID = 0;

export const initialState = {
  player: {
    hp: 100,
    deck: [],
    maxAP: 9
  },
  cards: {
    allIds: [],
    byIds: {}
  },
  monsters: {
    allIds: [],
    byIds: {}
  },
  battle: {
    selectingCard: true,
    selectingTarget: false,
    selectedTarget: null,
    hp: 0,
    currentAP: 0,
    maxAP: 0,
    deck: [],
    hand: [],
    discard: [],
    queuedActions: []
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CARD_TO_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          deck: [...state.player.deck, { id: id, uuid: ++nextCardUUID }]
        }
      };
    }

    case ADD_CARD_TO_BATTLE_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: [...state.battle.deck, id]
        }
      };
    }

    case ADD_CARD_TO_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: [...state.battle.discard, id]
        }
      };
    }

    case ADD_CARD_TO_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: [...state.battle.hand, id]
        }
      };
    }

    case REMOVE_CARD_FROM_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          deck: state.player.deck.filter(card => card !== id)
        }
      };
    }

    case REMOVE_CARD_FROM_BATTLE_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: state.battle.deck.filter(card => card !== id)
        }
      };
    }

    case REMOVE_CARD_FROM_DISCARD: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: state.battle.discard.filter(card => card !== id)
        }
      };
    }

    case REMOVE_CARD_FROM_HAND: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: state.battle.hand.filter(card => card !== id)
        }
      };
    }

    case DECREMENT_ACTIONS: {
      const { amount } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          currentAP:
            state.battle.currentAP >= amount
              ? state.battle.currentAP - amount
              : 0
        }
      };
    }

    case ADD_MONSTER: {
      const { hp } = action.payload;
      const id = ++nextMonsterUUID;
      return {
        ...state,
        monsters: {
          allIds: [...state.monsters.allIds, id],
          byIds: {
            ...state.monsters.byIds,
            [id]: {
              hp
            }
          }
        }
      };
    }

    case SET_BATTLE_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: deck
        }
      };
    }

    case SET_HAND_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: deck
        }
      };
    }

    case SET_DISCARD_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: deck
        }
      };
    }

    case SET_BATTLE_HP: {
      const { hp } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hp: hp
        }
      };
    }

    case SET_QUEUED_ACTIONS: {
      const { actions } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          queuedActions: actions
        }
      };
    }

    case SET_SELECTED_TARGET: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          selectedTarget: id
        }
      };
    }

    case SET_BATTLE_CURRENT_AP: {
      const { ap } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          currentAP: ap
        }
      };
    }

    case SET_BATTLE_MAX_AP: {
      const { ap } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          maxAP: ap
        }
      };
    }

    case ATTACK_MONSTER: {
      const { id, dmg } = action.payload;
      return {
        ...state,
        monsters: {
          allIds: [...state.monsters.allIds],
          byIds: {
            ...state.monsters.byIds,
            [id]: {
              hp:
                dmg <= state.monsters.byIds[id].hp
                  ? state.monsters.byIds[id].hp - dmg
                  : 0
            }
          }
        }
      };
    }

    case ATTACK_TARGETED_MONSTER: {
      const { dmg } = action.payload;
      return {
        ...state,
        monsters: {
          allIds: [...state.monsters.allIds],
          byIds: {
            ...state.monsters.byIds,
            [state.battle.selectedTarget]: {
              hp:
                dmg <= state.monsters.byIds[state.battle.selectedTarget].hp
                  ? state.monsters.byIds[state.battle.selectedTarget].hp - dmg
                  : 0
            }
          }
        }
      };
    }

    case CREATE_CARD: {
      const { id, name, description, cost, actions } = action.payload;
      return {
        ...state,
        cards: {
          allIds: [...state.cards.allIds, id],
          byIds: {
            ...state.cards.byIds,
            [id]: {
              name,
              cost,
              description,
              actions
            }
          }
        }
      };
    }

    case TOGGLE_TARGET_SELECTION: {
      const { isEnabled } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          selectingCard: isEnabled ? false : state.battle.selectingCard,
          selectingTarget: isEnabled ? true : false
        }
      };
    }

    case TOGGLE_CARD_SELECTION: {
      const { isEnabled } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          selectingCard: isEnabled ? true : false,
          selectingTarget: isEnabled ? false : state.battle.selectingTarget
        }
      };
    }

    default:
      return state;
  }
}

//SETS
export const addCardToDeck = id => ({
  type: ADD_CARD_TO_DECK,
  payload: {
    id
  }
});

export const addCardToBattleDeck = id => ({
  type: ADD_CARD_TO_BATTLE_DECK,
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

export const removeCardFromBattleDeck = id => ({
  type: REMOVE_CARD_FROM_BATTLE_DECK,
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

export const createCard = ({ id, name, description, cost, actions }) => ({
  type: CREATE_CARD,
  payload: {
    id,
    name,
    description,
    cost,
    actions
  }
});

export const addMonster = hp => ({
  type: ADD_MONSTER,
  payload: {
    hp
  }
});

export const attackMonster = (dmg) => ({
  type: ATTACK_TARGETED_MONSTER,
  payload: {
    dmg
  }
});

export const attackMonsterById = (id, dmg) => ({
  type: ATTACK_MONSTER,
  payload: {
    id,
    dmg
  }
});

export const setBattleDeck = deck => ({
  type: SET_BATTLE_DECK,
  payload: { deck }
});

export const setDiscardDeck = deck => ({
  type: SET_DISCARD_DECK,
  payload: { deck }
});

export const setHandDeck = deck => ({
  type: SET_HAND_DECK,
  payload: { deck }
});

export const setBattleHP = hp => ({
  type: SET_BATTLE_HP,
  payload: { hp }
});

export const setBattleCurrentAP = ap => ({
  type: SET_BATTLE_CURRENT_AP,
  payload: { ap }
});

export const setBattleMaxAP = ap => ({
  type: SET_BATTLE_MAX_AP,
  payload: { ap }
});

export const setQueuedActions = actions => ({
  type: SET_QUEUED_ACTIONS,
  payload: { actions }
});

export const setSelectedTarget = id => ({
  type: SET_SELECTED_TARGET,
  payload: { id }
});

export const toggleTargetSelection = isEnabled => ({
  type: TOGGLE_TARGET_SELECTION,
  payload: { isEnabled }
});

//GETS
export const getAllState = store => store;

export const getCurrentAP = store =>
  getAllState(store) ? getAllState(store).battle.currentAP : 0;

export const getIsSelectingCard = store =>
  getAllState(store) ? getAllState(store).battle.selectingCard : false;

export const getIsSelectingTarget = store =>
  getAllState(store) ? getAllState(store).battle.selectingTarget : false;

export const getQueuedActions = store =>
  getAllState(store) ? getAllState(store).battle.queuecActions : [];

export const getCardState = store => store.cards;

export const getCardList = store =>
  getCardState(store) ? getCardState(store).allIds : [];

export const getCardById = (store, id) =>
  getCardState(store) ? { ...getCardState(store).byIds[id], id } : {};

export const getCards = store =>
  getCardList(store).map(id => getCardById(store, id));

export const getMonsterState = store => (store.monsters ? store.monsters : {});

export const getMonsterList = store =>
  getMonsterState(store) ? getMonsterState(store).allIds : [];

export const getMonsterById = (store, id) =>
  getMonsterState(store) ? { ...getMonsterState(store).byIds[id], id } : {};

export const getMonsters = store =>
  getMonsterList(store).map(id => getMonsterById(store, id));
