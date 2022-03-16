module.exports = ({podName, champions}) => champions.map((user) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "conditions": {
      "operator": "and",
      "operands": [
        {
          "name": "isInProjectColumn",
          "parameters": {
            "projectName": `Area Pod: ${podName} - PRs`,
            "columnName": "Needs Champion",
            "isOrgProject": true
          }
        },
        {
          "name": "isAction",
          "parameters": {
            "action": "assigned"
          }
        },
        {
          "name": "isAssignedToUser",
          "parameters": { user }
        }
      ]
    },
    "eventType": "pull_request",
    "eventNames": [
      "pull_request",
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${podName} - PRs] Champion Assigned`,
    "actions": [
      {
        "name": "moveToProjectColumn",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
          "columnName": user,
          "isOrgProject": true
        }
      }
    ]
  }
}));
