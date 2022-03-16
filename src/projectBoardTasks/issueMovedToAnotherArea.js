// This task is only applicable if the area pod has specific areas specified
module.exports = (pod, areas) => (Array.isArray(areas) && {
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
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
                "projectName": `Area Pod: ${pod} - Issue Triage`,
                "columnName": "Triaged",
                "isOrgProject": true
              }
            }
          ]
        },
        {
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
        },
        {
          "name": "isAction",
          "parameters": {
            "action": "unlabeled"
          }
        }
      ]
    },
    "eventType": "issue",
    "eventNames": [
      "issues",
      "project_card"
    ],
    "taskName": `[Area Pod: ${pod} - Issue Triage] Moved to Another Area`,
    "actions": [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${pod} - Issue Triage`,
          "columnName": "Triaged",
          "isOrgProject": true
        }
      }
    ]
  }
});
