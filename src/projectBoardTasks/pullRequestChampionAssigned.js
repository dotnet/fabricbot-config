module.exports = ({podName, podAreas, podMembers}) => podMembers.map(({name, user}) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - PRs] ${name} Assigned as Champion`,
    "actions": [
      {
        "name": "addToProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
          "columnName": `Champion: ${name}`,
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
          "name": "isOpen",
          "parameters": {}
        },
        {
          "operator": "or",
          "operands": [
            {
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
            {
              "operator": "and",
              "operands": [
                (Array.isArray(podAreas) && {
                  "operator": "or",
                  "operands": podAreas.map(label => ({
                    "name": "hasLabel",
                    "parameters": { label }
                  }))
                }),
                {
                  "operator": "not",
                  "operands": [
                    {
                      "name": "isInProject",
                      "parameters": {
                        "projectName": `Area Pod: ${podName} - PRs`,
                        "isOrgProject": true
                      }
                    }
                  ]
                },
                {
                  "name": "isActivitySender",
                  "parameters": { user },
                },
                {
                  "operator": "or",
                  "operands": [
                    {
                      "name": "isAction",
                      "parameters": {
                        "action": "opened"
                      }
                    },
                    {
                      "name": "isAction",
                      "parameters": {
                        "action": "reopened"
                      }
                    }
                  ]
                }
              ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label
            }
          ]
        }
      ]
    }
  }
}));
