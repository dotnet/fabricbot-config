module.exports = (triagedLabels) => ({
  "operator": "or",
  "operands": [
    {
      "name": "addedToMilestone",
      "parameters": {}
    },
    ...(triagedLabels ? triagedLabels.map(label => ({
      "name": "labelAdded",
      "parameters": { label }
    })) : []),
    {
      "name": "isAction",
      "parameters": { "action": "closed" }
    }
  ]
});
