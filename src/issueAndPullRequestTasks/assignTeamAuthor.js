module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isAction",
            "parameters": {
              "action": "opened"
            }
          },
          {
            "operator": "or",
            "operands": [
              {
                "name": "activitySenderHasPermissions",
                "parameters": {
                  "association": "OWNER",
                  "permissions": "admin"
                }
              },
              {
                "name": "activitySenderHasPermissions",
                "parameters": {
                  "association": "MEMBER",
                  "permissions": "write"
                }
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
      "taskName": "Assign Team PRs to author",
      "actions": [
        {
          "name": "assignToUser",
          "parameters": {
            "user": {
              "type": "prAuthor"
            }
          }
        }
      ]
    },
    "disabled": false
  }
];
