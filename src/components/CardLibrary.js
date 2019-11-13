import * as creators from '../ducks/actionCreators'

export const CardLibrary = [
  {
    id: 1,
    name: "Attack",
    cost: 3,
    description: "attacks %value",
    needsTarget: true,
    target: null,
    actions: [
      creators.attackMonster({dmg: 3})
    ]
  },
  {
    id: 2,
    name: "Block",
    cost: 2,
    description: "blocks %value",
    needsTarget: true,
    target: null,
    actions: [
      creators.attackMonster({dmg: 3})
    ]
  }
];
