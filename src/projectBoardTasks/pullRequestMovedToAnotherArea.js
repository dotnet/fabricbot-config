// This task is only applicable if the area pod has specific areas specified
module.exports = ({podName, podAreas}) => (Array.isArray(podAreas) ? [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config": {
    "taskName": `[Area Pod: ${podName} - PRs] Moved to Another Area`,
    "actions": [
      {
        "name": "removeFromProject",
        "parameters": {
          "projectName": `Area Pod: ${podName} - PRs`,
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
        },
        {
          "name": "isAction",
          "parameters": {
            "action": "unlabeled"
          }
        },
        {
          "name": "isInProject",
          "parameters": {
            "projectName": `Area Pod: ${podName} - PRs`,
            "isOrgProject": true
          }
        }
      ]
    }
  }
}] : []);
