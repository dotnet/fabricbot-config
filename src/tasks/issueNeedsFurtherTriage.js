module.exports = (pod, areas) => ({
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssueCommentResponder",
  "version": "1.0",
  "config":
  {
    "conditions":
    {
      "operator": "and",
      "operands":
      [
        (Array.isArray(areas) && {
          "operator": "or",
          "operands": areas.map(area => ({
            "name": "hasLabel",
            "parameters": { "label": area }
          }))
        }),
        {
          "operator": "not",
          "operands":
          [
            {
              "name": "isCloseAndComment",
              "parameters":
              {}
            }
          ]
        },
        {
          "operator": "not",
          "operands": [
            {
              "name": "activitySenderHasPermissions",
              "parameters": {
                "permissions": "write"
              }
            }
          ]
        },
        {
          "operator": "or",
          "operands":
          [
            {
              "operator": "not",
              "operands":
              [
                {
                  "name": "isInProject",
                  "parameters":
                  {
                    "projectName": `Area Pod: ${pod} - Issue Triage`,
                    "isOrgProject": true
                  }
                }
              ]
            },
            {
              "name": "isInProjectColumn",
              "parameters":
              {
                "projectName": `Area Pod: ${pod} - Issue Triage`,
                "columnName": "Triaged",
                "isOrgProject": true
              }
            }
          ]
        }
      ].filter(op => !!op) // We will have a falsy element in the array of we"re not filtering by area label
    },
    "eventType": "issue",
    "eventNames":
    [
      "issue_comment"
    ],
    "taskName": `[Area Pod: ${pod} - Issue Triage] Needs Further Triage`,
    "actions":
    [
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${pod} - Issue Triage`,
          "columnName": "Needs Triage",
          "isOrgProject": true
        }
      }
    ]
  }
});
