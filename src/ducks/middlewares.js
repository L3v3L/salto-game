import _ from 'lodash';
import * as types from './actionTypes';
import * as actions from './actionCreators';
import * as selectors from './selectors';

export const applyShield = store => next => action => {
  if (action.type === types.ADD_TO_BATTLE_HP) {
    const { value } = action.payload;
    let state = store.getState();

    const absorbed = selectors.getEffectSum(state, 'shield');

    const diff = value < 0 ? Math.min(0, value+absorbed) : value;

    action.payload.value = diff;
  }

  next(action);
}

export const endTurn = store => next => action => {
  if (action.type === types.ADD_BATTLE_TURN) {
    let state = store.getState();

    const activeCard = selectors.getActiveCard(state);

    if (activeCard && activeCard.uuid) {
      store.dispatch(actions.deactivateCardFromHand(activeCard.uuid));
    }

    store.dispatch(actions.disableTargetSelection());

    let newDiscardArray = selectors.getCardsByDeck(state, 'discard');
    let newHandArray = selectors.getCardsByDeck(state, 'hand');
    let newdeckArray = selectors.getCardsByDeck(state, 'deck');

    let amountCardsToDraw = Math.min(
      newDiscardArray.length + newdeckArray.length,
      state.battle.amountCardToDraw
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
      actions.moveCardByCard({ cardArray: newdeckArray, targetDeck: 'deck' })
    );
    store.dispatch(
      actions.moveCardByCard({ cardArray: newHandArray, targetDeck: 'hand' })
    );
    store.dispatch(
      actions.moveCardByCard({
        cardArray: newDiscardArray,
        targetDeck: 'discard'
      })
    );

    store.dispatch(actions.setBattleCurrentAP(state.battle.maxAP));


    //run monster queue attacks
    state.battle.monsters.map(monster => {
      if (state.battle.monsterMoves[monster.uuid]) {
        state.battle.monsterMoves[monster.uuid].map(move => {
          switch (move.type) {
            case 'attack':
              const weakness = selectors.getEffectSum(state, 'weaken', monster.uuid);

              console.log('Monsters attacked a total of ' + move.value + 'dmg ');
              console.log('You blocked a total of ' + weakness + 'dmg');
              console.log('Received ' + Math.min(0 - move.value + weakness, 0) + 'dmg');

              store.dispatch(actions.addToBattleHP(Math.min(0 - move.value + weakness, 0)));
              break;
            case 'block':
              console.log('block ' + move.value);
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
        .getMonsterRefs(state)
        .find(monsterLib => monsterLib.id === monster.id);
      store.dispatch(
        actions.setMonsterMoves(
          monster.uuid,
          monsterRef.moves[Math.floor(Math.random() * monsterRef.moves.length)]
        )
      );
      return null;
    });

    store.dispatch(actions.tickEffects());
  }

  next(action);
};

export const targetSelectionDisable = store => next => action => {
  if (action.type === types.SET_SELECTED_TARGET) {
    store.dispatch(actions.disableTargetSelection());
  }

  next(action);
};

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
};

export const playCardExecute = store => next => action => {
  if (action.type === types.PLAY_CARD) {
    const { id, uuid, target } = action.payload;
    const state = store.getState();
    const activeCard = selectors.getActiveCard(state);
    const activeCardRef = activeCard
      ? selectors.getCardById(state, activeCard.id)
      : null;
    const playedCardRef = id ? selectors.getCardById(state, id) : null;

    const cardNeedsTargetAndHasTarget =
      activeCardRef && activeCardRef.needsTarget && target;
    const cardDoesntNeedTarget = playedCardRef && !playedCardRef.needsTarget;

    const card = playedCardRef || activeCardRef;
    const cardUuid = uuid || activeCard.uuid;

    if (cardNeedsTargetAndHasTarget || cardDoesntNeedTarget) {
      if (cardNeedsTargetAndHasTarget) {
        store.dispatch(actions.disableTargetSelection());
      }

      card.actions.map(action => {
        if (
          (action.type === types.ADD_EFFECT || action.type === types.ATTACK_MONSTER) &&
          cardNeedsTargetAndHasTarget
        ) {
          action.payload.uuid = target;
        }

        return store.dispatch(action);
      });

      store.dispatch(actions.decrementPlayerActions(card.cost));

      store.dispatch(
        actions.moveCardByUUID({
          uuidArray: [cardUuid],
          targetDeck: 'discard'
        })
      );

      if (activeCard && activeCard.uuid) {
        store.dispatch(actions.deactivateCardFromHand(activeCard.uuid));
      }
    }
  }

  next(action);
};