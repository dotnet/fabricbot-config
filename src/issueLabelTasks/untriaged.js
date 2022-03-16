const isNotTriaged = require("../rules/isNotTriaged");

module.exports = (triagedLabels) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config": {
    "taskName": "Add untriaged label to new issues",
    "conditions": {
      "operator": "and",
      "operands": [
        {
          "name": "isAction",
          "parameters": {
            "action": "opened"
          }
        },
        ...isNotTriaged(triagedLabels)
      ]
    },
    "actions": [
      {
        "name": "addLabel",
        "parameters": {
          "label": "untriaged"
        }
      }
    ],
    "eventType": "issue",
    "eventNames": [
      "issues",
      "project_card"
    ]
  }
});
