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
    image: 'block.svg',
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
    image: 'attack.svg',
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
    image: 'attack_all.svg',
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
    image: 'weaken.svg'
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
    description: 'Decreases all monsters\' attack by 25%',
    needsTarget: false,
    rarity: 2,
    type: 'effect',
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
  },
  {
    id: 39,
    name: 'Meteor',
    cost: 1,
    description: 'Deals 2 dmg, four times, burned',
    needsTarget: true,
    rarity: 2,
    type: 'attack',
    destination: 'burned',
    actions: [
      creators.attackMonster({ dmg: 2 }),
      creators.attackMonster({ dmg: 2 }),
      creators.attackMonster({ dmg: 2 }),
      creators.attackMonster({ dmg: 2 })
    ],
    image: '39.svg'
  },
  {
    id: 52,
    name: 'Axe',
    cost: 3,
    description: 'Deals 32 dmg',
    needsTarget: true,
    rarity: 3,
    type: 'attack',
    actions: [creators.attackMonster({ dmg: 32 })],
    image: '52.svg'
  }
];
