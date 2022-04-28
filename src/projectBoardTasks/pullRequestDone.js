module.exports = ({podName, podAreas}) => [
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
            "name": "isInProject",
            "parameters": {
              "projectName": `Area Pod: ${podName} - PRs`,
              "isOrgProject": true
            }
          },
          {
            "operator": "not",
            "operands": [
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
          {
            "operator": "or",
            "operands": [
              {
                "operator": "not",
                "operands": [
                  {
                    "name": "isOpen",
                    "parameters": {}
                  }
                ]
              },
              (Array.isArray(podAreas) && {
                "operator": "and",
                "operands": podAreas.map(label => ({
                  "operator": "not",
                  "operands": [
                    {
                      "name": "hasLabel",
                      "parameters": { label }
                    }
                  ]
                }))
              })
            ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label
          }
        ]
      },
      "eventType": "pull_request",
      "eventNames": [
        "pull_request"
      ],
      "taskName": `[Area Pod: ${podName} - PRs] Closed, Merged, or Moved`,
      "actions": [
        {
          "name": "moveToProjectColumn",
          "parameters": {
            "projectName": `Area Pod: ${podName} - PRs`,
            "columnName": "Done",
            "isOrgProject": true
          }
        }
      ]
    }
  }
];
