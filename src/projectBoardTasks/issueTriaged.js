const isTriaged = require("../rules/isTriaged");

module.exports = ({podName, triagedLabels}) => [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - Issue Triage] Triaged`,
    "actions": [
      {
        "name": "addToProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
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
    ],
    "eventType": "issue",
    "eventNames": ["issues"],
    "conditions": {
      "operator": "and",
      "operands": [
        {
          "name": "isInProject",
          "parameters": {
            "projectName": `Area Pod: ${podName} - Issue Triage`,
            "isOrgProject": true
          }
        },
        isTriaged(triagedLabels)
      ]
    }
  }
}];
