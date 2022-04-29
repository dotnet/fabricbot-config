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
        {
          "name": "isOpen",
          "parameters": {}
        },
        (Array.isArray(podAreas) && {
          "operator": "or",
          "operands": podAreas.map(label => ({
            "name": "hasLabel",
            "parameters": { label }
          }))
        }),
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
        {
          "operator": "or",
          "operands": [
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
