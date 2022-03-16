module.exports = (triagedLabels) => [
  {
    name: "isOpen",
    parameters: {}
  },
  {
    operator: "not",
    operands: [
      {
        name: "isInMilestone",
        parameters: {}
      }
    ]
  },
  ...triagedLabels.map(label => ({
    operator: "not",
    operands: [
      {
        name: "hasLabel",
        parameters: { label }
      }
    ]
  }))
];
