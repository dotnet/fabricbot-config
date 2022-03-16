module.exports = ({podName, podAreas}) => [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "conditions": {
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
        }
      ].filter(op => !!op) // We will have a falsy element in the array of we"re not filtering by area label
    },
    "eventType": "pull_request",
    "eventNames": [
      "pull_request",
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${podName} - PRs] Needs Champion`,
    "actions": [
      {
        "name": "addToProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
          "columnName": "Needs Champion",
          "isOrgProject": true
        }
      }
    ]
  }
}];
