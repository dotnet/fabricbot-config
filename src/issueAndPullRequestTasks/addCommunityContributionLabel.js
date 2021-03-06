module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "taskName": "Label community PRs",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "community-contribution"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["pull_request"],
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
                      "permissions": "maintain"
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
      }
    }
  }
];
