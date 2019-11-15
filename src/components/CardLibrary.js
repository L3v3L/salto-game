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
    name: "Block",
    cost: 2,
    description: "blocks %value",
    needsTarget: true,
    actions: [
      creators.attackMonster({dmg: -10})
    ]
  }
];
