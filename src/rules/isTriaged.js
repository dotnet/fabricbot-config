module.exports = (triagedLabels) => ([
  {
    name: "addedToMilestone",
    parameters: {}
  },
  ...triagedLabels.map(label => ({
    name: "labelAdded",
    parameters: { label }
  })),
  {
    name: "isAction",
    parameters: { action: "closed" }
  }
]);
