import * as types from './actionTypes';

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
    case types.ADD_CARD_TO_DECK: {
      const { id } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          deck: [...state.player.deck, { id: id, uuid: ++nextCardUUID }]
        }
      };
    }

    case types.ADD_CARD_TO_BATTLE_DECK: {
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

    case types.ADD_CARD_TO_DISCARD: {
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

    case types.ADD_CARD_TO_HAND: {
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

    case types.REMOVE_CARD_FROM_DECK: {
      const { uuid } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          deck: state.player.deck.filter(card => card.uuid !== uuid)
        }
      };
    }

    case types.REMOVE_CARD_FROM_BATTLE_DECK: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: state.battle.deck.filter(card => card.uuid !== uuid)
        }
      };
    }

    case types.REMOVE_CARD_FROM_DISCARD: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: state.battle.discard.filter(card => card.uuid !== uuid)
        }
      };
    }

    case types.REMOVE_CARD_FROM_HAND: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: state.battle.hand.filter(card => card.uuid !== uuid)
        }
      };
    }

    case types.DECREMENT_ACTIONS: {
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

    case types.CREATE_MONSTER: {
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

    case types.ADD_MONSTER: {
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

    case types.SET_BATTLE_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          deck: deck
        }
      };
    }

    case types.SET_HAND_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hand: deck
        }
      };
    }

    case types.SET_MONSTER_MOVES: {
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

    case types.RESET_ALL_MONSTER_MOVES: {
      return {
        ...state,
        battle: {
          ...state.battle,
          monsterMoves: {}
        }
      };
    }

    case types.SET_DISCARD_DECK: {
      const { deck } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          discard: deck
        }
      };
    }

    case types.SET_BATTLE_HP: {
      const { hp } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          hp: hp
        }
      };
    }

    case types.SET_QUEUED_ACTIONS: {
      const { actions } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          queuedActions: actions
        }
      };
    }

    case types.SET_SELECTED_TARGET: {
      const { uuid } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          selectedTarget: uuid
        }
      };
    }

    case types.SET_BATTLE_CURRENT_AP: {
      const { ap } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          currentAP: ap
        }
      };
    }

    case types.SET_BATTLE_MAX_AP: {
      const { ap } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          maxAP: ap
        }
      };
    }

    case types.ATTACK_MONSTER: {
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

    case types.ATTACK_TARGETED_MONSTER: {
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

    case types.CREATE_CARD: {
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

    case types.ENABLE_TARGET_SELECTION: {
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

    case types.DISABLE_TARGET_SELECTION: {
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