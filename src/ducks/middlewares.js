import _ from 'lodash';
import * as types from './actionTypes';
import * as actions from './actionCreators';
import * as selectors from './selectors';

export const endTurn = (store) => (next) => (action) => {
  if (action.type === types.ADD_BATTLE_TURN) {
    const state = store.getState();

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
      state.battle.amountCardToDraw,
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
      amountCardsToDraw -= 1;
    }

    store.dispatch(
      actions.moveCardByCard({ cardArray: newdeckArray, targetDeck: 'deck' }),
    );
    store.dispatch(
      actions.moveCardByCard({ cardArray: newHandArray, targetDeck: 'hand' }),
    );
    store.dispatch(
      actions.moveCardByCard({
        cardArray: newDiscardArray,
        targetDeck: 'discard',
      }),
    );

    store.dispatch(actions.setBattleCurrentAP(state.battle.maxAP));

    // run monster queue attacks
    let shield = selectors.getEffectValue(state, 'shield');

    state.battle.monsters.map((monster) => {
      if (state.battle.monsterMoves[monster.uuid]) {
        state.battle.monsterMoves[monster.uuid].map((move) => {
          switch (move.type) {
          case 'attack':
            const effect = selectors.getEffect(state, 'weaken', monster.uuid);

            const baseAttack = Math.min(0 - move.value);
            let finalAttack = baseAttack;

            if (effect) {
              finalAttack = effect.percentileValue
                ? Math.round(baseAttack + (baseAttack * effect.value))
                : baseAttack + effect.value;
            }

            if (shield) {
              if (finalAttack < 0) {
                const diff = Math.abs(finalAttack) - shield;

                if (diff >= 0) {
                  finalAttack = Math.min(finalAttack + shield, 0);
                  // Shield exhausted
                  shield = 0;
                } else {
                  finalAttack = 0;
                  // Remaining shield
                  shield = Math.abs(diff);
                }
              }
            } else {
              finalAttack = Math.min(0, finalAttack);
            }

            store.dispatch(actions.addToBattleHP(finalAttack));

            break;

          case 'block':
            console.log(`block ${move.value}`);
            break;

          default:
            break;
          }
          return null;
        });
      }
      return null;
    });

    if (shield !== selectors.getEffectValue(state, 'shield')) {
      store.dispatch(actions.updateEffectValue(state, 'shield', shield));
    }

    store.dispatch(actions.resetMonsterMoves());

    state.battle.monsters.map((monster) => {
      const monsterRef = selectors
        .getMonsterRefs(state)
        .find((monsterLib) => monsterLib.id === monster.id);
      store.dispatch(
        actions.setMonsterMoves(
          monster.uuid,
          monsterRef.moves[Math.floor(Math.random() * monsterRef.moves.length)],
        ),
      );
      return null;
    });

    store.dispatch(actions.tickEffects());
  }

  next(action);
};

export const targetSelectionDisable = (store) => (next) => (action) => {
  if (action.type === types.SET_SELECTED_TARGET) {
    store.dispatch(actions.disableTargetSelection());
  }

  next(action);
};

export const playCardActivate = (store) => (next) => (action) => {
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

export const playCardExecute = (store) => (next) => (action) => {
  if (action.type === types.PLAY_CARD) {
    const { id, uuid, target } = action.payload;
    const state = store.getState();
    const activeCard = selectors.getActiveCard(state);
    const activeCardRef = activeCard
      ? selectors.getCardById(state, activeCard.id)
      : null;
    const playedCardRef = id ? selectors.getCardById(state, id) : null;

    const cardNeedsTargetAndHasTarget = activeCardRef && activeCardRef.needsTarget && target;
    const cardDoesntNeedTarget = playedCardRef && !playedCardRef.needsTarget;

    const card = playedCardRef || activeCardRef;
    const cardUuid = uuid || activeCard.uuid;

    if (cardNeedsTargetAndHasTarget || cardDoesntNeedTarget) {
      if (cardNeedsTargetAndHasTarget) {
        store.dispatch(actions.disableTargetSelection());
      }

      card.actions.map((cardAction) => {
        const cardActionNeedsTarget = cardAction.payload.needsTarget;
        if (
          (cardAction.type === types.ADD_EFFECT || cardAction.type === types.ATTACK_MONSTER)
          && cardNeedsTargetAndHasTarget && cardActionNeedsTarget
        ) {
          cardAction.payload.uuid = target;
        }

        return store.dispatch(cardAction);
      });

      store.dispatch(actions.decrementPlayerActions(card.cost));

      store.dispatch(
        actions.moveCardByUUID({
          uuidArray: [cardUuid],
          targetDeck: card.destination,
        }),
      );

      if (activeCard && activeCard.uuid) {
        store.dispatch(actions.deactivateCardFromHand(activeCard.uuid));
      }
    }
  }

  next(action);
};
