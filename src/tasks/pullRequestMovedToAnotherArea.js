// This task is only applicable if the area pod has specific areas specified
module.exports = (pod, areas) => (Array.isArray(areas) && {
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "PullRequestResponder",
  "version": "1.0",
  "config": {
    "conditions": {
      "operator": "and",
      "operands": [
        {
          "operator": "not",
          "operands": [
            {
              "name": "isInProjectColumn",
              "parameters": {
              "projectName": `Area Pod: ${pod} - PRs`,
              "columnName": "Done",
              "isOrgProject": true
              }
            }
          ]
        },
        (Array.isArray(areas) && {
          "operator": "and",
          "operands": areas.map(area => ({
            "operator": "not",
            "operands": [
              {
                "name": "hasLabel",
                "parameters": { "label": area }
              }
            ]
          }))
        })
      ].filter(op => !!op) // We will have a falsy element in the array of we"re not filtering by area label
    },
    "eventType": "pull_request",
    "eventNames": [
      "pull_request",
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${pod} - PRs] Moved to Another Area`,
    "actions": [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${pod} - PRs`,
          "columnName": "Done",
          "isOrgProject": true
        }
      },
    ]
  }
});
