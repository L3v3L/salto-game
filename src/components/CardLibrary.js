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
    name: 'Block Single',
    cost: 3,
    description: 'Blocks 6 dmg from attacks of a single enemy',
    needsTarget: true,
    actions: [creators.addEffect({type: 'block', value: 1, duration: 1})],
    image: 'block.svg'
  },
  {
    id: 4,
    name: 'Block All',
    cost: 3,
    description: 'Blocks a total of 6 dmg from any attack',
    needsTarget: false,
    actions: [creators.addEffect({type: 'block', value: 1, duration: 1})],
    image: 'block.svg'
  }
];
