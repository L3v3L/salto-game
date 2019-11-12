import * as types from './actionTypes'

export const buffAttack = store => next => action => {
  if (action.type === types.ATTACK_TARGETED_MONSTER) {
    action.payload.dmg = 50;
  }

  next(action);
}