module.exports = ({podName, podAreas, podMembers}) => podMembers.map(({name, user}) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - PRs] ${name} Assigned as Champion`,
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
        // (It belongs on the area pod board, and...)
        {
          "operator": "or",
          "operands": [
            // It's assigned to the pod member
            {
              "name": "isAssignedToUser",
              "parameters": { user },
            },
            // Or it was just opened by the pod member (in which case it won't be assigned yet)
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
        },
        // (The PR should be assigned to a pod member as champion, and...)
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
            // Or it's in the Needs Champion column
            {
              "name": "isInProjectColumn",
              "parameters": {
                "projectName": `Area Pod: ${podName} - PRs`,
                "columnName": "Needs Champion",
                "isOrgProject": true
              }
            },
            // Or it's in the Done column
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
}));
