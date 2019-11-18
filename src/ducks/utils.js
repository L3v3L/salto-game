export function isMonstersAlive(state) {
  return state.battle.monsters.filter(monster => monster.hp > 0).length;
}
