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
const ENABLE_TARGET_SELECTION = `${ACTION_PREPEND}/ENABLE_TARGET_SELECTION`;
const DISABLE_TARGET_SELECTION = `${ACTION_PREPEND}/DISABLE_TARGET_SELECTION`;
const CREATE_MONSTER = `${ACTION_PREPEND}/CREATE_MONSTER`;
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
const SET_MONSTER_MOVES = `${ACTION_PREPEND}/SET_MONSTER_MOVES`;
const RESET_ALL_MONSTER_MOVES = `${ACTION_PREPEND}/RESET_ALL_MONSTER_MOVES`;
let nextMonsterUUID = 0;
let nextCardUUID = 0;

export const initialState = {
  player: {
    hp: 100,
    deck: [],
    maxAP: 100
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
    queuedActions: [],
    monsters: [],
    monsterMoves: {}
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
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: [
            ...state.battle.deck,
            state.player.deck.find(card => card.uuid === uuid)
          ]
        }
      };
    }

    case ADD_CARD_TO_DISCARD: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: [
            ...state.battle.discard,
            state.player.deck.find(card => card.uuid === uuid)
          ]
        }
      };
    }

    case ADD_CARD_TO_HAND: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: [
            ...state.battle.hand,
            state.battle.deck.find(card => card.uuid === uuid)
          ]
        }
      };
    }

    case REMOVE_CARD_FROM_DECK: {
      const { uuid } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          deck: state.player.deck.filter(card => card.uuid !== uuid)
        }
      };
    }

    case REMOVE_CARD_FROM_BATTLE_DECK: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: state.battle.deck.filter(card => card.uuid !== uuid)
        }
      };
    }

    case REMOVE_CARD_FROM_DISCARD: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: state.battle.discard.filter(card => card.uuid !== uuid)
        }
      };
    }

    case REMOVE_CARD_FROM_HAND: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: state.battle.hand.filter(card => card.uuid !== uuid)
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

    case CREATE_MONSTER: {
      const { id, name, hp, moves } = action.payload;
      return {
        ...state,
        monsters: {
          allIds: [...state.monsters.allIds, id],
          byIds: {
            ...state.monsters.byIds,
            [id]: {
              name,
              hp,
              moves
            }
          }
        }
      };
    }

    case ADD_MONSTER: {
      const { id } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          monsters: [
            ...state.battle.monsters,
            { id: id, uuid: ++nextMonsterUUID, hp: state.monsters.byIds[id].hp }
          ]
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

    case SET_MONSTER_MOVES: {
      const { uuid, move } = action.payload;

      return {
        ...state,
        battle: {
          ...state.battle,
          monsterMoves: {
            ...state.battle.monsterMoves,
            [uuid]: move
          }
        }
      };
    }

    case RESET_ALL_MONSTER_MOVES: {
      return {
        ...state,
        battle: {
          ...state.battle,
          monsterMoves: {}
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
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          selectedTarget: uuid
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
      const { uuid, dmg } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          monsters: state.battle.monsters.map(monster => {
            if (monster.uuid === uuid) {
              monster.hp = dmg <= monster.hp ? monster.hp - dmg : 0;
            }
            return monster;
          })
        }
      };
    }

    case ATTACK_TARGETED_MONSTER: {
      const { dmg } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          monsters: state.battle.monsters.map(monster => {
            if (monster.uuid === state.battle.selectedTarget) {
              monster.hp = dmg <= monster.hp ? monster.hp - dmg : 0;
            }
            return monster;
          })
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

    case ENABLE_TARGET_SELECTION: {
      return {
        ...state,
        battle: {
          ...state.battle,
          selectingCard: false,
          selectingTarget: true,
          selectedTarget: undefined
        }
      };
    }

    case DISABLE_TARGET_SELECTION: {
      return {
        ...state,
        battle: {
          ...state.battle,
          selectingCard: true,
          selectingTarget: false
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

export const addCardToBattleDeck = uuid => ({
  type: ADD_CARD_TO_BATTLE_DECK,
  payload: {
    uuid
  }
});

export const addCardToDiscard = uuid => ({
  type: ADD_CARD_TO_DISCARD,
  payload: {
    uuid
  }
});

export const addCardToHand = uuid => ({
  type: ADD_CARD_TO_HAND,
  payload: {
    uuid
  }
});

export const removeCardFromDeck = uuid => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: {
    uuid
  }
});

export const removeCardFromBattleDeck = uuid => ({
  type: REMOVE_CARD_FROM_BATTLE_DECK,
  payload: {
    uuid
  }
});

export const removeCardFromDiscard = uuid => ({
  type: REMOVE_CARD_FROM_DISCARD,
  payload: {
    uuid
  }
});

export const removeCardFromHand = uuid => ({
  type: REMOVE_CARD_FROM_HAND,
  payload: {
    uuid
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

export const createMonster = ({ id, name, hp, moves }) => ({
  type: CREATE_MONSTER,
  payload: {
    id,
    name,
    hp,
    moves
  }
});

export const addMonster = id => ({
  type: ADD_MONSTER,
  payload: {
    id
  }
});

export const attackMonster = dmg => ({
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

export const setSelectedTarget = uuid => ({
  type: SET_SELECTED_TARGET,
  payload: { uuid }
});

export const enableTargetSelection = () => ({
  type: ENABLE_TARGET_SELECTION,
  payload: {}
});

export const disableTargetSelection = () => ({
  type: DISABLE_TARGET_SELECTION,
  payload: {}
});

export const setMonsterMoves = (uuid, move) => ({
  type: SET_MONSTER_MOVES,
  payload: { uuid, move }
});

export const resetMonsterMoves = () => ({
  type: RESET_ALL_MONSTER_MOVES,
  payload: {}
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

export const buffAttack = store => next => action => {
  if (action.type === ATTACK_TARGETED_MONSTER) {
    action.payload.dmg = 50;
  }

  next(action);
}