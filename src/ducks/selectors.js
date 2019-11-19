export const getAllState = store => store;

// Battle
export const getBattleState = store => store.battle;

export const getCurrentAP = store =>
  getBattleState(store) ? getBattleState(store).currentAP : 0;

export const getHP = store =>
  getBattleState(store) ? getBattleState(store).hp : 0;

export const getIsSelectingCard = store =>
  getBattleState(store) ? getBattleState(store).selectingCard : false;

export const getIsSelectingTarget = store =>
  getBattleState(store) ? getBattleState(store).selectingTarget : false;

export const getQueuedActions = store =>
  getBattleState(store) ? getBattleState(store).queuedActions : [];

// Monsters
export const getMonsterState = store => (store.monsters ? store.monsters : {});

export const getMonsterList = store =>
  getMonsterState(store) ? getMonsterState(store).allIds : [];

export const getMonsterById = (store, id) =>
  getMonsterState(store) ? { ...getMonsterState(store).byIds[id], id } : {};

export const getMonsterRefs = store =>
  getMonsterList(store).map(id => getMonsterById(store, id));

export const getMonstersAlive = store =>
  store.battle.monsters.filter(monster => monster.hp > 0);

// Cards
export const getCardsState = store => store.cards;

export const getCardList = store =>
  getCardsState(store) ? getCardsState(store).allIds : [];

export const getCardById = (store, id) =>
  getCardsState(store) ? { ...getCardsState(store).byIds[id], id } : {};

export const getCardRefs = store =>
  getCardList(store).map(id => getCardById(store, id));

export const getActiveCard = store => {
  const state = getBattleState(store);
  if (state && state.activeCard) {
    return getCardsByDeck(store, 'hand').find(card => {
      return card.uuid === state.activeCard;
    });
  }
};

export const getCardsByDeck = (store, deckName) => {
  const state = getBattleState(store);
  return state.cards.filter(card => card.deck === deckName);
};

export const getEffectSum = (store, uuid) => {
  const state = getBattleState(store);

  const effectSum = state.effects.map((effect) => {
    if (effect['uuid'] === uuid || effect['uuid'] === undefined) {
      if (Number.isNaN(effect['value'])) {
        return 0;
      } else {
        return effect['value'];
      }
    }
    return 0;
  }).reduce((a,b) => a+b, 0);

  return effectSum;
}