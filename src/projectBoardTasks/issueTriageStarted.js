const isNotTriaged = require("../rules/isNotTriaged");

module.exports = ({podName, podMembers, triagedLabels}) => podMembers.flatMap(({name, user}) => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isInProjectColumn",
            "parameters": {
              "projectName": `Area Pod: ${podName} - Issue Triage`,
              "isOrgProject": true,
              "columnName": "Needs Triage"
            }
          },
          {
            "name": "isActivitySender",
            "parameters": { user }
          },
          ...isNotTriaged(triagedLabels)
        ]
      },
      "eventType": "issue",
      "eventNames": [
        "issues"
      ],
      "taskName": `[Area Pod: ${podName} - Issue Triage] ${name} Updated Issue`,
      "actions": [
        {
          "name": "moveToProjectColumn",
          "parameters": {
            "projectName": `Area Pod: ${podName} - Issue Triage`,
            "columnName": `Triage: ${name}`,
            "isOrgProject": true
          }
        }
      ]
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isInProjectColumn",
            "parameters": {
              "projectName": `Area Pod: ${podName} - Issue Triage`,
              "isOrgProject": true,
              "columnName": "Needs Triage"
            }
          },
          {
            "name": "isActivitySender",
            "parameters": { user }
          },
          ...isNotTriaged(triagedLabels)
        ]
      },
      "eventType": "issue",
      "eventNames": [
        "issue_comment"
      ],
      "taskName": `[Area Pod: ${podName} - Issue Triage] ${name} Commented`,
      "actions": [
        {
          "name": "moveToProjectColumn",
          "parameters": {
            "projectName": `Area Pod: ${podName} - Issue Triage`,
            "columnName": `Triage: ${name}`,
            "isOrgProject": true
          }
        }
      ]
    }
  }
]);
