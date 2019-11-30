import _ from 'lodash';
import * as types from './actionTypes';
import * as utils from './utils';

let nextMonsterUUID = 0;
let nextCardUUID = 0;

const gameStates = {
  BATTLE: 'battle',
  REWARD: 'reward',
};

export const initialState = {
  gameState: gameStates.BATTLE,
  player: {
    maxHp: 100,
    deck: [],
    maxAP: 100,
    amountCardToDraw: 5,
  },
  cards: {
    allIds: [],
    byIds: {},
  },
  monsters: {
    allIds: [],
    byIds: {},
  },
  battle: {
    amountCardToDraw: 0,
    cards: [],
    selectingCard: true,
    selectingTarget: false,
    maxHp: 1,
    hp: 1,
    currentAP: 1,
    maxAP: 1,
    monsters: [],
    turn: 0,
    effects: [],
  },
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case types.ADD_EFFECT_TO_MONSTER: {
    const { effect, targetMonster } = action.payload;

    return {
      ...state,
      battle: {
        ...state.battle,
        monsters: state.battle.monsters.map((monster) => {
          if (monster.uuid === targetMonster.uuid) {
            monster.effects.push(effect);
          }
          return monster;
        }),
      },
    };
  }

  case types.RESET_MONSTER_EFFECTS: {
    return {
      ...state,
      battle: {
        ...state.battle,
        monsters: state.battle.monsters.map((monster) => {
          monster.effects = monster.effects.map((effect) => {
            effect.duration -= 1;
            return effect;
          }).filter((effect) => effect.duration > 0);

          return monster;
        }),
      },
    };
  }


  case types.RESET_BATTLE: {
    const returnState = {
      ...state,
      battle: {
        ...state.battle,
        monsters: [],
        amountCardToDraw: state.player.amountCardToDraw,
        maxHp: state.player.maxHp,
        hp: state.player.maxHp,
        maxAP: state.player.maxAP,
        currentAP: state.player.maxAP,
        turn: 1,
        cards: _.cloneDeep(_.shuffle(state.player.deck)),
      },
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
      gameState: targetState,
    };
  }

  case types.SET_BATTLE_CARDS: {
    const { cards } = action.payload;
    return {
      ...state,
      battle: {
        ...state.battle,
        cards,
      },
    };
  }

  case types.ADD_BATTLE_TURN: {
    const { value } = action.payload;
    return {
      ...state,
      battle: {
        ...state.battle,
        turn: state.battle.turn + value,
      },
    };
  }
  case types.ADD_CARD_TO_DECK: {
    const { id } = action.payload;
    nextCardUUID += 1;
    return {
      ...state,
      player: {
        ...state.player,
        deck: [...state.player.deck, { id, uuid: nextCardUUID }],
      },
    };
  }

  case types.REMOVE_CARD_FROM_DECK: {
    const { uuid } = action.payload;
    return {
      ...state,
      player: {
        ...state.player,
        deck: state.player.deck.filter((card) => card.uuid !== uuid),
      },
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
              : 0,
      },
    };
  }

  case types.CREATE_MONSTER: {
    const {
      id, name, hp, moves,
    } = action.payload;
    return {
      ...state,
      monsters: {
        allIds: [...state.monsters.allIds, id],
        byIds: {
          ...state.monsters.byIds,
          [id]: {
            name,
            hp,
            moves,
          },
        },
      },
    };
  }

  case types.ADD_MONSTER: {
    const { id } = action.payload;
    nextMonsterUUID += 1;
    return {
      ...state,
      battle: {
        ...state.battle,
        monsters: [
          ...state.battle.monsters,
          {
            id, uuid: nextMonsterUUID, hp: state.monsters.byIds[id].hp, moves: [], effects: [],
          },
        ],
      },
    };
  }

  case types.SET_MONSTER_MOVES: {
    const { uuid, move } = action.payload;

    const monsters = state.battle.monsters.map((monster) => {
      if (monster.uuid === uuid) {
        monster.moves = move;
      }
      return monster;
    });

    return {
      ...state,
      battle: {
        ...state.battle,
        monsters,
      },
    };
  }

  case types.RESET_ALL_MONSTER_MOVES: {
    const monsters = state.battle.monsters.map((monster) => {
      monster.moves = [];
      return monster;
    });

    return {
      ...state,
      battle: {
        ...state.battle,
        monsters,
      },
    };
  }

  case types.ADD_TO_BATTLE_HP: {
    const { value } = action.payload;

    const returnState = {
      ...state,
      battle: {
        ...state.battle,
        hp: Math.max(0, state.battle.hp + value),
      },
    };

    if (
      returnState.gameState === gameStates.BATTLE
        && returnState.battle.hp <= 0
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
        queuedActions: actions,
      },
    };
  }

  case types.SET_BATTLE_CURRENT_AP: {
    const { ap } = action.payload;
    return {
      ...state,
      battle: {
        ...state.battle,
        currentAP: ap,
      },
    };
  }

  case types.SET_BATTLE_MAX_AP: {
    const { ap } = action.payload;
    return {
      ...state,
      battle: {
        ...state.battle,
        maxAP: ap,
      },
    };
  }

  case types.ATTACK_MONSTER: {
    const { uuid, dmg } = action.payload;

    const returnState = {
      ...state,
      battle: {
        ...state.battle,
        monsters: state.battle.monsters.map((monster) => {
          if (monster.uuid === uuid) {
            let tempDmg = dmg;
            monster.effects = monster.effects.map((effect) => {
              if (effect.type === 'block') {
                const tempShield = Math.max(0, effect.value - tempDmg);
                tempDmg = Math.max(0, tempDmg - effect.value);
                effect.value = tempShield;
              }
              return effect;
            });

            monster.hp = Math.max(0, monster.hp - tempDmg);
          }
          return monster;
        }),
      },
    };

    if (
      returnState.gameState === gameStates.BATTLE
        && !utils.isMonstersAlive(returnState)
    ) {
      returnState.gameState = gameStates.REWARD;
    }

    return returnState;
  }

  case types.ATTACK_ALL_MONSTERS: {
    const { dmg } = action.payload;

    const returnState = {
      ...state,
      battle: {
        ...state.battle,
        monsters: state.battle.monsters.map((monster) => {
          let tempDmg = dmg;
          monster.effects = monster.effects.map((effect) => {
            if (effect.type === 'block') {
              const tempShield = Math.max(0, effect.value - tempDmg);
              tempDmg = Math.max(0, tempDmg - effect.value);
              effect.value = tempShield;
            }
            return effect;
          });
          monster.hp = Math.max(0, monster.hp - tempDmg);
          return monster;
        }),
      },
    };

    if (
      returnState.gameState === gameStates.BATTLE
        && !utils.isMonstersAlive(returnState)
    ) {
      returnState.gameState = gameStates.REWARD;
    }

    return returnState;
  }

  case types.UPDATE_EFFECT_VALUE: {
    const { type, value } = action.payload;

    const newEffects = state.battle.effects.map((effect) => {
      if (effect.type === type) {
        effect.value = value;
      }
      return { ...effect };
    });

    return {
      ...state,
      battle: {
        ...state.battle,
        effects: newEffects,
      },
    };
  }

  case types.ADD_EFFECT: {
    const {
      name,
      type,
      value,
      stackValue,
      percentileValue,
      duration,
      stackDuration,
      needsTarget,
      uuid,
    } = action.payload;

    let validatedValue = value;
    if (percentileValue) {
      validatedValue = _.clamp(value, -1, 1);
    }

    const existingEffect = state.battle.effects.find(
      (effect) => (effect.uuid === undefined && effect.type === type)
          || (effect.uuid !== undefined
            && effect.type === type
            && effect.uuid === uuid),
    );

    let newEffects = [];

    if (existingEffect) {
      if (stackValue) {
        const newValue = existingEffect.value + validatedValue;
        existingEffect.value = percentileValue
          ? _.clamp(newValue, -1, 1)
          : newValue;
      }

      if (stackDuration) {
        existingEffect.duration += duration;
      }

      newEffects = [
        ...state.battle.effects.map((effect) => {
          if (effect.type === type && effect.uuid === uuid) {
            return { ...existingEffect };
          }
          return effect;
        }),
      ];
    } else {
      newEffects = [
        ...state.battle.effects,
        {
          name,
          type,
          value: validatedValue,
          stackValue,
          percentileValue,
          duration,
          stackDuration,
          needsTarget,
          uuid,
        },
      ];
    }

    return {
      ...state,
      battle: {
        ...state.battle,
        effects: newEffects,
      },
    };
  }

  case types.TICK_EFFECTS: {
    const changedEffects = state.battle.effects
      .map((effect) => {
        if (effect.duration === 0) {
          return null;
        }

        if (effect.duration === -1) {
          return effect;
        }

        effect.duration -= 1;

        if (effect.duration > 0) {
          return effect;
        }

        return null;
      })
      .filter((effect) => effect);

    return {
      ...state,
      battle: {
        ...state.battle,
        effects: [...changedEffects],
      },
    };
  }

  case types.CREATE_CARD: {
    const {
      id,
      name,
      description,
      cost,
      actions,
      needsTarget,
      destination,
      rarity,
      image,
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
            destination: destination || 'discard',
            rarity,
            image,
          },
        },
      },
    };
  }

  case types.ENABLE_TARGET_SELECTION: {
    return {
      ...state,
      battle: {
        ...state.battle,
        selectingCard: false,
        selectingTarget: true,
      },
    };
  }

  case types.DISABLE_TARGET_SELECTION: {
    return {
      ...state,
      battle: {
        ...state.battle,
        selectingCard: true,
        selectingTarget: false,
      },
    };
  }

  case types.ACTIVATE_CARD: {
    const { uuid } = action.payload;

    return {
      ...state,
      battle: {
        ...state.battle,
        activeCard: uuid,
      },
    };
  }

  case types.DEACTIVATE_CARD: {
    return {
      ...state,
      battle: {
        ...state.battle,
        activeCard: null,
      },
    };
  }

  case types.MOVE_BATTLE_CARD_TO_DECK_BY_CARD: {
    const { cardArray, targetDeck } = action.payload;

    const uuidArray = cardArray.map((card) => card.uuid);

    return {
      ...state,
      battle: {
        ...state.battle,
        cards: state.battle.cards.map((card) => {
          if (uuidArray.includes(card.uuid)) {
            card.deck = targetDeck;
          }
          return card;
        }),
      },
    };
  }

  case types.MOVE_BATTLE_CARD_TO_DECK_BY_UUID: {
    const { uuidArray, targetDeck } = action.payload;

    return {
      ...state,
      battle: {
        ...state.battle,
        cards: state.battle.cards.map((card) => {
          if (uuidArray.includes(card.uuid)) {
            card.deck = targetDeck;
          }
          return card;
        }),
      },
    };
  }

  default:
    return state;
  }
}
