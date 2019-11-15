import _ from "lodash";
import * as types from './actionTypes'
import * as actions from './actionCreators'
import * as selectors from './selectors'

export const buffAttack = store => next => action => {
  if (action.type === types.ATTACK_MONSTER) {
    action.payload.dmg = 10;
  }

  next(action);
};

export const endTurn = store => next => action => {
  if (action.type === types.ADD_BATTLE_TURN) {
    let state = store.getState();

    const maxCardsToDraw = 5;

    store.dispatch(actions.disableTargetSelection());

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

    store.dispatch(
      actions.setBattleDeck({ deckArray: newdeckArray, targetDeck: "deck" })
    );
    store.dispatch(
      actions.setBattleDeck({ deckArray: newHandArray, targetDeck: "hand" })
    );
    store.dispatch(
      actions.setBattleDeck({
        deckArray: newDiscardArray,
        targetDeck: "discard"
      })
    );

    store.dispatch(actions.setBattleCurrentAP(state.battle.maxAP));

    //run monster queue attacks
    state.battle.monsters.map(monster => {
      if (state.battle.monsterMoves[monster.uuid]) {
        state.battle.monsterMoves[monster.uuid].map(move => {
          switch (move.type) {
            case "attack":
              store.dispatch(actions.addToBattleHP(0 - move.value));
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

export const targetSelectionDisable = store => next => action => {
  if (action.type === types.SET_SELECTED_TARGET) {
    store.dispatch(actions.disableTargetSelection());
  }

  next(action);
}

export const playCardActivate = store => next => action => {
  if (action.type === types.PLAY_CARD) {
    const { id, uuid } = action.payload;
    const state = store.getState();
    const playedCardRef = selectors.getCardById(state, id);
    const activeCard = selectors.getActiveCard(state);

    if (!activeCard && playedCardRef.needsTarget) {
      store.dispatch(actions.enableTargetSelection());
      store.dispatch(actions.activateCardFromHand(uuid));
    }
  }

  next(action);
}

export const playCardExecute = store => next => action => {
  if (action.type === types.PLAY_CARD) {
    const { id, uuid, target } = action.payload;
    const state = store.getState();
    const activeCard = selectors.getActiveCard(state);
    const activeCardRef = activeCard ? selectors.getCardById(state, activeCard.id) : null;
    const playedCardRef = id ? selectors.getCardById(state, id) : null;

    const cardNeedsTargetAndHasTarget = activeCardRef && activeCardRef.needsTarget && target;
    const cardDoesntNeedTarget = playedCardRef && !playedCardRef.needsTarget;

    const card = playedCardRef || activeCardRef;
    const cardUuid = uuid || activeCard.uuid;

    if (cardNeedsTargetAndHasTarget || cardDoesntNeedTarget) {

      if (cardNeedsTargetAndHasTarget) {
        store.dispatch(actions.disableTargetSelection());
      }

      card.actions.map((action) => {
        if (action.type === types.ATTACK_MONSTER && cardNeedsTargetAndHasTarget) {
          action.payload.uuid = target;
        }

        return store.dispatch(action)
      });

      store.dispatch(actions.decrementPlayerActions(card.cost));
      
      store.dispatch(actions.removeCardFromBattleDeck({
        uuid: cardUuid,
        targetDeck: "hand"
      }));

      store.dispatch(actions.addCardToBattleDeck({
        uuid: cardUuid,
        targetDeck: "discard"
      }));

    }
  }

  next(action);
}
