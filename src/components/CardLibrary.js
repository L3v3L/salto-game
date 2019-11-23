import * as creators from '../ducks/actionCreators';

export const CardLibrary = [
  {
    id: 2,
    name: 'Shield',
    cost: 1,
    description: 'Absorbs 5 dmg',
    needsTarget: false,
    actions: [
      creators.addEffect({
        name: 'shield',
        type: 'shield',
        value: 5,
        percentileValue: false,
        stackValue: true,
        duration: 0,
        stackDuration: false
      })
    ],
    image: 'block.svg'
  },
  {
    id: 3,
    name: 'Attack',
    cost: 1,
    description: 'Deals 6 dmg to a single target',
    needsTarget: true,
    actions: [creators.attackMonster({ dmg: 6 })],
    image: 'attack.svg'
  },
  {
    id: 8,
    name: 'Attack All',
    cost: 2,
    description: 'Deals 8 dmg to all targets',
    needsTarget: false,
    actions: [creators.attackAllMonsters({ dmg: 8 })],
    image: 'attack_all.svg'
  },
  {
    id: 9,
    name: 'Weaken',
    cost: 2,
    description: 'Deals 12 dmg and 2 Weaken',
    needsTarget: true,
    actions: [
      creators.attackMonster({ dmg: 12 }),
      creators.addEffect({
        name: 'weaken',
        type: 'weaken',
        value: -0.25,
        percentileValue: true,
        stackValue: false,
        duration: 2,
        stackDuration: true
      })
    ],
    image: 'weaken.svg'
  }
];
