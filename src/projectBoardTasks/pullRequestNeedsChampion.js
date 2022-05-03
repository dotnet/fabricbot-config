module.exports = ({podName, podAreas, podMembers}) => [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - PRs] Needs Champion`,
    "actions": [
      {
        "name": "removeFromProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
          "isOrgProject": true
        }
      },
      {
        "name": "addToProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
          "columnName": "Needs Champion",
          "isOrgProject": true
        }
      }
    ],
    "eventType": "pull_request",
    "eventNames": ["pull_request"],
    "conditions": {
      "operator": "and",
      "operands": [
        // The PR is open
        {
          "name": "isOpen",
          "parameters": {}
        },
        // And it has one of the pod's area labels
        (Array.isArray(podAreas) && {
          "operator": "or",
          "operands": podAreas.map(label => ({
            "name": "hasLabel",
            "parameters": { label }
          }))
        }),
        {
          "operator": "and",
          // And it's not assigned to any of the pod members
          "operands": [
            {
              "operator": "and",
              "operands": podMembers.map(({user}) => ({
                "operator": "not",
                "operands": [
                  {
                    "name": "isAssignedToUser",
                    "parameters": { user }
                  }
                ]
              }))
            },
            // (It belongs to this pod, and it's not yet assigned to a pod member, and...)
            {
              "operator": "or",
              "operands": [
                // The PR was either not being opened right now (in which case it wouldn't have an assignee yet)
                {
                  "operator": "not",
                  "operands": [
                    {
                      "name": "isAction",
                      "parameters": {
                        "action": "opened"
                      }
                    }
                  ]
                },
                // Or (it was just opened), and it was not opened by any of the pod members
                {
                  "operator": "and",
                  "operands": podMembers.map(({user}) => ({
                    "operator": "not",
                    "operands": [
                      {
                        "name": "isActivitySender",
                        "parameters": { user }
                      }
                    ]
                  }))
                }
              ]
            }
          ]
        },
        // (The PR belongs to the pod, it's not yet assigned to a pod member, nor was it just opened by a pod member, and...)
        {
          "operator": "or",
          "operands": [
            // It's not yet in the project
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
            // Or it's in the project, but it's in the Done column
            {
              "name": "isInProjectColumn",
              "parameters": {
                "projectName": `Area Pod: ${podName} - PRs`,
                "columnName": "Done",
                "isOrgProject": true
              }
            }
          ]
        }
      ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label
    }
  }
}];
