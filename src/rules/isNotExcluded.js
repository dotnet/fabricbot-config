module.exports = (exclusionLabels) => (exclusionLabels ? {
  "operator": "and",
  "operands": exclusionLabels.map(label => ({
      "operator": "not",
      "operands": [
        {
          "name": "hasLabel",
          "parameters": { label }
        }
      ]
    }))
} : null);
