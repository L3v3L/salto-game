export function isMonstersAlive(state) {
  return state.battle.monsters.filter((monster) => monster.hp > 0).length;
}

export function weightedRand(spec) {
  const table = Object.entries(spec).map(([key, value]) => {
    const a = [];
    for (let i = 0; i < value * 100; i++) {
      a.push(key);
    }
    return a;
  }).flat(1);

  return () => table[Math.floor(Math.random() * table.length)];
}
