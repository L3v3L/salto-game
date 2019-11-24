import * as creators from '../ducks/actionCreators';

export const CardLibrary = [
  {
    id: 2,
    name: 'Shield',
    cost: 1,
    description: 'Absorbs 5 dmg',
    needsTarget: false,
    rarity: 0,
    type: 'effect',
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
    image: '2.svg'
  },
  {
    id: 3,
    name: 'Attack',
    cost: 1,
    description: 'Deals 6 dmg to a single target',
    needsTarget: true,
    rarity: 0,
    type: 'attack',
    actions: [creators.attackMonster({ dmg: 6 })],
    image: '3.svg'
  },
  {
    id: 8,
    name: 'Attack All',
    cost: 2,
    description: 'Deals 8 dmg to all targets',
    needsTarget: false,
    rarity: 1,
    type: 'attack',
    actions: [creators.attackAllMonsters({ dmg: 8 })],
    image: '8.svg'
  },
  {
    id: 9,
    name: 'Weaken',
    cost: 2,
    description: 'Deals 12 dmg and 2 Weaken',
    needsTarget: true,
    rarity: 1,
    type: 'attack',
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
    image: '9.svg'
  },
  {
    id: 14,
    name: 'Shield Bash',
    cost: 1,
    description: 'Deals 5 dmg, absorbs 5 dmg',
    needsTarget: true,
    rarity: 1,
    type: 'attack',
    actions: [
      creators.addEffect({
        name: 'shield',
        type: 'shield',
        value: 5,
        percentileValue: false,
        stackValue: true,
        duration: 0,
        stackDuration: false,
        needsTarget: false
      }),
      creators.attackMonster({ dmg: 5 })
    ],
    image: '14.svg'
  },
  {
    id: 21,
    name: 'Doubletack',
    cost: 1,
    description: 'Deals 5 dmg, twice',
    needsTarget: true,
    rarity: 1,
    type: 'attack',
    actions: [
      creators.attackMonster({ dmg: 5 }),
      creators.attackMonster({ dmg: 5 })
    ],
    image: '21.svg'
  },
  {
    id: 37,
    name: 'Weaken All',
    cost: 0,
    description: "Decreases all monster's attack by 25%",
    needsTarget: false,
    rarity: 2,
    type: 'effect',
    destination: 'burned',
    actions: [
      creators.addEffect({
        name: 'weaken',
        type: 'weaken',
        value: -0.25,
        percentileValue: true,
        stackValue: false,
        duration: 1,
        stackDuration: true,
        needsTarget: false
      })
    ],
    image: '37.svg'
  }
];
