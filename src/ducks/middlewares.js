import * as types from "./actionTypes";
import * as actions from "./actionCreators";
import * as selectors from "../ducks/selectors";
import _ from "lodash";

export const buffAttack = store => next => action => {
  if (action.type === types.ATTACK_TARGETED_MONSTER) {
    action.payload.dmg = 50;
  }

  next(action);
};

export const endTurn = store => next => action => {
  if (action.type === types.ADD_BATTLE_TURN) {
    let state = store.getState();

    const maxCardsToDraw = 5;

    let newDiscardArray = state.battle.discard;
    let newHandArray = state.battle.hand;
    let newdeckArray = state.battle.deck;

    let amountCardsToDraw = Math.min(
      newDiscardArray.length + newdeckArray.length,
      maxCardsToDraw
    );

    newDiscardArray = newDiscardArray.concat(newHandArray);
    newHandArray = [];

    while (amountCardsToDraw) {
      if (!newdeckArray.length) {
        newdeckArray = newDiscardArray;
        newDiscardArray = [];
        newdeckArray = _.shuffle(newdeckArray);
      }
      newHandArray.push(newdeckArray.pop());
      amountCardsToDraw--;
    }

    store.dispatch(actions.setBattleDeck(newdeckArray, "deck"));
    store.dispatch(actions.setBattleDeck(newHandArray, "hand"));
    store.dispatch(actions.setBattleDeck(newDiscardArray, "discard"));

    store.dispatch(actions.setBattleCurrentAP(state.battle.maxAP));

    //run monster queue attacks
    state.battle.monsters.map(monster => {
      if (state.battle.monsterMoves[monster.uuid]) {
        state.battle.monsterMoves[monster.uuid].map(move => {
          switch (move.type) {
            case "attack":
              store.dispatch(actions.setBattleHP(state.battle.hp - move.value));
              break;
            case "block":
              console.log("block " + move.value);
              break;
            default:
              break;
          }
          return null;
        });
      }
      return null;
    });

    store.dispatch(actions.resetMonsterMoves());

    state.battle.monsters.map(monster => {
      let monsterRef = selectors
        .getMonsters(state)
        .find(monsterLib => monsterLib.id === monster.id);
      store.dispatch(
        actions.setMonsterMoves(
          monster.uuid,
          monsterRef.moves[Math.floor(Math.random() * monsterRef.moves.length)]
        )
      );
      return null;
    });
  }

  next(action);
};
