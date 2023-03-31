const isExcluded = require("../rules/isExcluded");

module.exports = ({podName, exclusionLabels}) => (exclusionLabels ? [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "taskName": `[Area Pod: ${podName} - PRs] Excluded`,
      "actions": [
        {
          "name": "moveToProjectColumn",
          "parameters": {
            "projectName": `Area Pod: ${podName} - PRs`,
            "columnName": "Done",
            "isOrgProject": true
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["pull_request"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isInProject",
            "parameters": {
              "projectName": `Area Pod: ${podName} - PRs`,
              "isOrgProject": true
            }
          },
          {
            "operator": "not",
            "operands": [
              {
                "name": "isInProjectColumn",
                "parameters": {
                  "projectName": `Area Pod: ${podName} - PRs`,
                  "columnName": "Done",
                  "isOrgProject": true
                }
              }
            ]
          },
          isExcluded(exclusionLabels)
        ]
      }
    }
  }
] : []);
