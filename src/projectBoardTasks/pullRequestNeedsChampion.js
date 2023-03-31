const isNotExcluded = require("../rules/isNotExcluded");

module.exports = ({podName, podAreas, podMembers, exclusionLabels}) => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "taskName": `[Area Pod: ${podName} - PRs] New PR Needs Champion`,
      "actions": [
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
          // The PR was just opened
          {
            "name": "isAction",
            "parameters": {
              "action": "opened"
            }
          },
          // And it has one of the pod's area labels
          (Array.isArray(podAreas) && {
            "operator": "or",
            "operands": podAreas.map(label => ({
              "name": "hasLabel",
              "parameters": { label }
            }))
          }),
          // And it's not assigned to a pod member already, nor was it opened by a pod member
          podMembers.map(({user}) => [
            {
              "operator": "not",
              "operands": [
                {
                  "name": "isAssignedToUser",
                  "parameters": { user }
                }
              ]
            },
            {
              "operator": "not",
              "operands": [
                {
                  "name": "isActivitySender",
                  "parameters": { user }
                }
              ]
            }
          ]),
          // (The PR was just opened, it belongs to the pod, and it wasn't assigned to or opened by a pod member, and...)
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
          },
          isNotExcluded(exclusionLabels)
        ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label or if there are no exclusion labels
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "taskName": `[Area Pod: ${podName} - PRs] Updated PR Needs Champion`,
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
          // And it wasn't just opened
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
          // And it has one of the pod's area labels
          (Array.isArray(podAreas) && {
            "operator": "or",
            "operands": podAreas.map(label => ({
              "name": "hasLabel",
              "parameters": { label }
            }))
          }),
          // And it's not assigned to a pod member already
          ...podMembers.map(({user}) => ({
            "operator": "not",
            "operands": [
              {
                "name": "isAssignedToUser",
                "parameters": { user }
              }
            ]
          })),
          // (The PR is open but wasn't just opened, it belongs to the pod, and it's not yet assigned to a pod member, and...)
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
          },
          isNotExcluded(exclusionLabels)
        ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label or if there are no exclusion labels
      }
    }
  }
];
