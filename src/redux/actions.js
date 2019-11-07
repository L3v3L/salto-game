import {
  ADD_MONSTER,
  ATTACK_MONSTER,
  CREATE_CARD,
  ADD_CARD_TO_DECK,
  ADD_CARD_TO_HAND
} from "./actionTypes";

let nextMonsterId = 0;

export const addMonster = hp => ({
  type: ADD_MONSTER,
  payload: {
    id: ++nextMonsterId,
    hp
  }
});

export const attackMonster = (id, dmg) => ({
  type: ATTACK_MONSTER,
  payload: {
    id,
    dmg
  }
});

export const createCard = (id, name, power, description, cost) => ({
  type: CREATE_CARD,
  payload: {
    id,
    name,
    power,
    description,
    cost
  }
});

export const addCardToDeck = id => ({
  type: ADD_CARD_TO_DECK,
  payload: {
    id
  }
});

export const addCardToHand = id => ({
  type: ADD_CARD_TO_HAND,
  payload: {
    id
  }
});
