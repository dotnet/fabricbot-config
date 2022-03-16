const isTriaged = require("../rules/isTriaged");

module.exports = (pod, areas, triagedLabels) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config":
  {
    "conditions":
    {
      "operator": "and",
      "operands":
      [
        {
          "name": "isInProject",
          "parameters": {
            "projectName": `Area Pod: ${pod} - Issue Triage`,
            "isOrgProject": true
          }
        },
        {
          "operator": "or",
          "operands": isTriaged(triagedLabels)
        }
      ]
    },
    "eventType": "issue",
    "eventNames":
    [
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${pod} - Issue Triage] Triaged`,
    "actions":
    [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${pod} - Issue Triage`,
          "columnName": "Triaged",
          "isOrgProject": true
        }
      },
      {
        "name": "removeLabel",
        "parameters": {
          "label": "untriaged"
        }
      }
    ]
  }
});
