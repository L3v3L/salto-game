import * as creators from '../ducks/actionCreators';

export const CardLibrary = [
  {
    id: 1,
    name: 'Attack',
    cost: 3,
    description: 'Deals 10 dmg to a single target',
    needsTarget: true,
    actions: [creators.attackMonster({ dmg: 10 })],
    image: 'attack.svg'
  },
  {
    id: 2,
    name: 'Attack All',
    cost: 2,
    description: 'Deals 6 dmg to all targets',
    needsTarget: false,
    actions: [creators.attackAllMonsters({ dmg: 6 })],
    image: 'attack.svg'
  },
  {
    id: 3,
    name: 'Weaken',
    cost: 3,
    description: 'Decreases target\'s attack by 1 dmg',
    needsTarget: true,
    actions: [creators.addEffect({type: 'weaken', value: 1, duration: 1})],
    image: 'block.svg'
  },
  {
    id: 4,
    name: 'Shield',
    cost: 3,
    description: 'Absorbs 2 dmg',
    needsTarget: false,
    actions: [creators.addEffect({type: 'shield', value: 2, duration: 1})],
    image: 'block.svg'
  }
];
