export const CardLibrary = [
  {
    id: 1,
    name: "Attack",
    cost: 3,
    description: "attacks %value",
    actions: [
      {
        type: "attack",
        value: 3,
        target: true
      }
    ]
  },
  {
    id: 2,
    name: "Block",
    cost: 2,
    description: "blocks %value",
    actions: [
      {
        type: "block",
        value: 2
      }
    ]
  }
];
