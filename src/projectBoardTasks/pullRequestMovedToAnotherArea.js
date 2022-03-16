// This task is only applicable if the area pod has specific areas specified
module.exports = ({podName, podAreas}) => (Array.isArray(podAreas) ? [{
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
              "projectName": `Area Pod: ${podName} - PRs`,
              "columnName": "Done",
              "isOrgProject": true
              }
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
      ].filter(op => !!op) // We will have a falsy element in the array of we"re not filtering by area label
    },
    "eventType": "pull_request",
    "eventNames": [
      "pull_request",
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${podName} - PRs] Moved to Another Area`,
    "actions": [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${podName} - PRs`,
          "columnName": "Done",
          "isOrgProject": true
        }
      },
    ]
  }
}] : []);
