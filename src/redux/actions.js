import {
  ADD_CARD_TO_DECK,
  ADD_CARD_TO_DISCARD,
  ADD_CARD_TO_HAND,
  ADD_MONSTER,
  ATTACK_MONSTER,
  CREATE_CARD,
  REMOVE_CARD_FROM_DECK,
  REMOVE_CARD_FROM_DISCARD,
  REMOVE_CARD_FROM_HAND,
  DECREMENT_ACTIONS
} from "./actionTypes";

let nextMonsterId = 0;

export const addMonster = hp => ({
  type: ADD_MONSTER,
  payload: {
    id: ++nextMonsterId,
    hp
  }
});

export const attackMonster = (id, dmg, cost) => ({
  type: ATTACK_MONSTER,
  payload: {
    id,
    dmg,
    cost
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

export const addCardToDiscard = id => ({
  type: ADD_CARD_TO_DISCARD,
  payload: {
    id
  }
});

export const removeCardFromHand = id => ({
  type: REMOVE_CARD_FROM_HAND,
  payload: {
    id
  }
});

export const removeCardFromDeck = id => ({
  type: REMOVE_CARD_FROM_DECK,
  payload: {
    id
  }
});

export const removeCardFromDiscard = id => ({
  type: REMOVE_CARD_FROM_DISCARD,
  payload: {
    id
  }
});

export const decrementPlayerActions = amount => ({
  type: DECREMENT_ACTIONS,
  payload: {
    amount
  }
});

