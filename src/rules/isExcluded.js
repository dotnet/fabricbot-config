module.exports = (exclusionLabels) => (exclusionLabels ? {
  "operator": "or",
  "operands": exclusionLabels.map(label => ({
      "name": "hasLabel",
      "parameters": { label }
    }))
} : null);
