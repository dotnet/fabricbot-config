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
            "operator": "and",
            "operands": [
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "activitySenderHasPermissions",
                    "parameters": {
                      "association": "OWNER",
                      "permissions": "admin"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "activitySenderHasPermissions",
                    "parameters": {
                      "association": "MEMBER",
                      "permissions": "write"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "github-actions[bot]"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "dotnet-maestro[bot]"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "dotnet-maestro-bot[bot]"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "dotnet-maestro-bot"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "dotnet-maestro"
                    }
                  }
                ]
              },
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isActivitySender",
                    "parameters": {
                      "user": "github-actions"
                    }
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
      "taskName": "Label community PRs",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "community-contribution"
          }
        }
      ]
    },
    "disabled": false
  }
];
