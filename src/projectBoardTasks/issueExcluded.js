const isExcluded = require("../rules/isExcluded");

module.exports = ({podName, exclusionLabels}) => (exclusionLabels ? [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - Issue Triage] Excluded`,
    "actions": [
      {
        "name": "removeFromProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
          "isOrgProject": true
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
        isExcluded(exclusionLabels)
      ]
    }
  }
}] : []);
