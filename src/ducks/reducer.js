import * as types from './actionTypes';
import * as utils from './utils';
import _ from 'lodash';

let nextMonsterUUID = 0;
let nextCardUUID = 0;

const gameStates = {
  BATTLE: 'battle',
  REWARD: 'reward'
};

export const initialState = {
  gameState: gameStates.BATTLE,
  player: {
    hp: 100,
    deck: [],
    maxAP: 100,
    amountCardToDraw: 5
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
    amountCardToDraw: 0,
    cards: [],
    selectingCard: true,
    selectingTarget: false,
    hp: 0,
    currentAP: 0,
    maxAP: 0,
    queuedActions: [],
    monsters: [],
    monsterMoves: {},
    turn: 0
  }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_BATTLE: {
      let returnState = {
        ...state,
        battle: {
          ...state.battle,
          amountCardToDraw: state.player.amountCardToDraw,
          hp: state.player.hp,
          maxAP: state.player.maxAP,
          currentAP: state.player.maxAP,
          turn: 1,
          cards: _.cloneDeep(_.shuffle(state.player.deck))
        }
      };

      for (let i = 0; i < returnState.battle.cards.length; i++) {
        if (i < returnState.battle.amountCardToDraw) {
          returnState.battle.cards[i].deck = 'hand';
        } else {
          returnState.battle.cards[i].deck = 'deck';
        }
      }

      return returnState;
    }

    case types.SET_GAME_STATE: {
      const { targetState } = action.payload;
      return {
        ...state,
        gameState: targetState
      };
    }

    case types.SET_BATTLE_CARDS: {
      const { cards } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          cards: cards
        }
      };
    }

    case types.ADD_BATTLE_TURN: {
      const { value } = action.payload;
      return {
        ...state,
        battle: {
          ...state.battle,
          turn: state.battle.turn + value
        }
      };
    }
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

    case types.ADD_TO_BATTLE_HP: {
      const { value } = action.payload;

      let returnState = {
        ...state,
        battle: {
          ...state.battle,
          hp: Math.max(0, state.battle.hp + value)
        }
      };

      if (
        returnState.gameState === gameStates.BATTLE &&
        returnState.battle.hp <= 0
      ) {
        returnState.gameState = gameStates.REWARD;
      }

      return returnState;
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

      let returnState = {
        ...state,
        battle: {
          ...state.battle,
          monsters: state.battle.monsters.map(monster => {
            if (monster.uuid === uuid) {
              monster.hp = Math.max(0, monster.hp - dmg);
            }
            return monster;
          })
        }
      };

      if (
        returnState.gameState === gameStates.BATTLE &&
        !utils.isMonstersAlive(returnState)
      ) {
        returnState.gameState = gameStates.REWARD;
      }

      return returnState;
    }

    case types.ATTACK_ALL_MONSTERS: {
      const { dmg } = action.payload;

      let returnState = {
        ...state,
        battle: {
          ...state.battle,
          monsters: state.battle.monsters.map(monster => {
            monster.hp = Math.max(0, monster.hp - dmg);
            return monster;
          })
        }
      };

      if (
        returnState.gameState === gameStates.BATTLE &&
        !utils.isMonstersAlive(returnState)
      ) {
        returnState.gameState = gameStates.REWARD;
      }

      return returnState;
    }

    case types.CREATE_CARD: {
      const {
        id,
        name,
        description,
        cost,
        actions,
        needsTarget,
        image
      } = action.payload;
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
              actions,
              needsTarget,
              image
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
          selectingTarget: true
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

    case types.ACTIVATE_CARD: {
      const { uuid } = action.payload;

      return {
        ...state,
        battle: {
          ...state.battle,
          activeCard: uuid
        }
      };
    }

    case types.DEACTIVATE_CARD: {
      return {
        ...state,
        battle: {
          ...state.battle,
          activeCard: null
        }
      };
    }

    case types.MOVE_BATTLE_CARD_TO_DECK_BY_CARD: {
      const { cardArray, targetDeck } = action.payload;

      let uuidArray = cardArray.map(card => card.uuid);

      return {
        ...state,
        battle: {
          ...state.battle,
          cards: state.battle.cards.map(card => {
            if (uuidArray.includes(card.uuid)) {
              card.deck = targetDeck;
            }
            return card;
          })
        }
      };
    }

    case types.MOVE_BATTLE_CARD_TO_DECK_BY_UUID: {
      const { uuidArray, targetDeck } = action.payload;

      return {
        ...state,
        battle: {
          ...state.battle,
          cards: state.battle.cards.map(card => {
            if (uuidArray.includes(card.uuid)) {
              card.deck = targetDeck;
            }
            return card;
          })
        }
      };
    }

    default:
      return state;
  }
}
