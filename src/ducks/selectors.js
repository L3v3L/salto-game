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