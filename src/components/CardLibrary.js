import * as creators from '../ducks/actionCreators'

export const CardLibrary = [
  {
    id: 1,
    name: "Attack",
    cost: 3,
    description: "Deals 10 dmg to a single target",
    needsTarget: true,
    actions: [
      creators.attackMonster({dmg: 10})
    ]
  },
  {
    id: 2,
    name: "Attack All",
    cost: 2,
    description: "Deals 6 dmg to all targets",
    needsTarget: false,
    actions: [
      creators.attackAllMonsters({dmg: 6})
    ]
  },
];
