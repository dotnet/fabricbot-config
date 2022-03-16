module.exports = (pod, areas) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "conditions": {
      "operator": "and",
      "operands": [
        (Array.isArray(areas) && {
          "operator": "or",
          "operands": areas.map(area => ({
            "name": "hasLabel",
            "parameters": { "label": area }
          }))
        }),
        {
          "operator": "not",
          "operands": [
            {
              "name": "isInProject",
              "parameters": {
                "projectName": `Area Pod: ${pod} - PRs`,
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
    "taskName": `[Area Pod: ${pod} - PRs] Needs Champion`,
    "actions": [
      {
        "name": "addToProject",
        "parameters": {
          "projectName": `Area Pod: ${pod} - PRs`,
          "columnName": "Needs Champion",
          "isOrgProject": true
        }
      }
    ]
  }
});
