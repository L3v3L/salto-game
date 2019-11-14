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

export const getMonsters = store =>
  getMonsterList(store).map(id => getMonsterById(store, id));

// Cards
export const getCardsState = store => store.cards;

export const getCardList = store =>
  getCardsState(store) ? getCardsState(store).allIds : [];

export const getCardById = (store, id) =>
  getCardsState(store) ? { ...getCardsState(store).byIds[id], id } : {};

export const getCards = store =>
  getCardList(store).map(id => getCardById(store, id));


export const getHandState = store => 
  getBattleState(store) ? getBattleState(store).hand : [];

export const getActiveCard = store => 
  getHandState(store).find(card => card["isActive"])