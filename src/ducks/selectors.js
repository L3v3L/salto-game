import _ from 'lodash';
import { weightedRand } from './utils.js'

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

export const getMonstersAliveWithRefs = store => {
  let monstersAlive = getMonstersAlive(store);
  let monsterRefs = getMonsterRefs(store);

  if (monstersAlive && monsterRefs) {
    return monstersAlive.map((monster) => { return {
        ref: monsterRefs.find(
          monsterLib => monsterLib.id === monster.id
        ),
        ...monster
      };
    });
  } else {
    return [];
  }
}

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

export const getEffectState = (store) =>
  getBattleState(store) ? getBattleState(store).effects : [];

export const getEffect = (store, type, uuid) =>
  getEffectState(store) ? getEffectState(store).find((effect) => {
    return (effect.uuid === uuid || effect.uuid === undefined) && 
      (effect.type !== undefined && effect.type === type)
  }) : {};

export const getEffectValue = (store, type, uuid) => 
  getEffect(store, type, uuid) ? getEffect(store, type, uuid).value : 0;

export const getRandomCard = (store) => {
  let shuffledCardRefs = getCardRefs(store) ? _.shuffle(getCardRefs(store)) : [];
  const getRandRarity = weightedRand({1:0.7, 2:0.2, 3:0.1});
  const rarity = getRandRarity();
  return shuffledCardRefs.find(card => parseInt(card.rarity) === parseInt(rarity));
}

export const getRandomCards = (store) => {
  return [getRandomCard(store), getRandomCard(store), getRandomCard(store)];
}