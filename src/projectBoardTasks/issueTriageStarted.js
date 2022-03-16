module.exports = ({podName, users}) => users.map((user) => ({
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
        }
      ]
    },
    "eventType": "issue",
    "eventNames": [
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${podName} - Issue Triage] Triage Started`,
    "actions": [
      {
        "name": "moveToProjectColumn",
        "parameters": {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
          "columnName": `Triage: ${user}`,
          "isOrgProject": true
        }
      }
    ]
  }
}));
