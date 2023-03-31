module.exports = (triagedLabels) => ({
  "operator": "and",
  "operands": [
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
    ...(triagedLabels ? triagedLabels.map(label => ({
      operator: "not",
      operands: [
        {
          name: "hasLabel",
          parameters: { label }
        }
      ]
    })) : [])
  ]
});
