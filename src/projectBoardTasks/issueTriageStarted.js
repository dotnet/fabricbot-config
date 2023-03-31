const isNotTriaged = require("../rules/isNotTriaged");

module.exports = ({podName, podMembers, triagedLabels}) => podMembers
  // The `autoTriage` property is optional and defaults to true
  // If explicitly set to false, the pod member does not want to
  // be automatically assigned as the triager when they update issues
  .filter(member => member.autoTriage !== false)
  .flatMap(({name, user}) => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
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
      ],
      "eventType": "issue",
      "eventNames": ["issues"],
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
          isNotTriaged(triagedLabels)
        ]
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
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
      ],
      "eventType": "issue",
      "eventNames": ["issue_comment"],
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
          isNotTriaged(triagedLabels)
        ]
      }
    }
  }
]);
