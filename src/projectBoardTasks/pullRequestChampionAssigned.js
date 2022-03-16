module.exports = ({podName, users}) => users.map((user) => ({
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
          "operator": "or",
          "operands": [
            {
              "operator": "and",
              "operands": [
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
            {
              "operator": "and",
              "operands": [
                {
                  "name": "isAction",
                  "parameters": {
                    "action": "opened"
                  }
                },
                {
                  "name": "isActivitySender",
                  "parameters": { user }
                }
              ]
            }
          ]
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
          "columnName": `Champion: ${user}`,
          "isOrgProject": true
        }
      }
    ]
  }
}));
