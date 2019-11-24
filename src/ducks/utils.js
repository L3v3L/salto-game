export function isMonstersAlive(state) {
  return state.battle.monsters.filter(monster => monster.hp > 0).length;
}

export function weightedRand(spec) {
  var i,
    j,
    table = [];
  for (i in spec) {
    for (j = 0; j < spec[i] * 10; j++) {
      table.push(i);
    }
  }
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  };
}
