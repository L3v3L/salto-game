import { ADD_MONSTER, ATTACK_MONSTER } from "./actionTypes";

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
