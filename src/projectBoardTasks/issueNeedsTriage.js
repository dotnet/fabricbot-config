module.exports = ({podName, podAreas}) => [{
  "taskType": "trigger",
  "capabilityId": "IssueResponder",
  "subCapability": "IssuesOnlyResponder",
  "version": "1.0",
  "config":
  {
    "conditions":
    {
      "operator": "and",
      "operands":
      [
        {
          "operator": "or",
          "operands":
          [
            {
              "operator": "and",
              "operands":
              [
                (Array.isArray(podAreas) && {
                  "operator": "or",
                  "operands": podAreas.map(label => ({
                    "name": "hasLabel",
                    "parameters": { label }
                  }))
                }),
                {
                  "operator": "or",
                  "operands":
                  [
                    {
                      "name": "isAction",
                      "parameters":
                      {
                        "action": "reopened"
                      }
                    },
                    {
                      "operator": "not",
                      "operands": [
                        {
                          "name": "isInMilestone",
                          "parameters":
                          {}
                        }
                      ]
                    }
                  ]
                }
              ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label
            },
            (Array.isArray(podAreas) && {
              "operator": "or",
              "operands": podAreas.map(label => ({
                "name": "labelAdded",
                "parameters": { label }
              }))
            })
          ].filter(op => !!op) // We will have a falsy element in the array of we're not filtering by area label
        },
        {
          "name": "isOpen",
          "parameters":
          {}
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
                    "projectName": `Area Pod: ${podName} - Issue Triage`,
                    "isOrgProject": true
                  }
                }
              ]
            },
            {
              "name": "isInProjectColumn",
              "parameters":
              {
                "projectName": `Area Pod: ${podName} - Issue Triage`,
                "isOrgProject": true,
                "columnName": "Triaged"
              }
            }
          ]
        }
      ]
    },
    "eventType": "issue",
    "eventNames":
    [
      "issues"
    ],
    "taskName": `[Area Pod: ${podName} - Issue Triage] Needs Triage`,
    "actions":
    [
      // Archived cards need to be removed/added instead of just added.
      // There's no means for detecting/handling archive state, so this
      // workaround is applied for all cards that need to be moved to
      // the "Needs Triage" column.
      {
        "name": "removeFromProject",
        "parameters":
        {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
          "isOrgProject": true
        }
      },
      {
        "name": "addToProject",
        "parameters":
        {
          "projectName": `Area Pod: ${podName} - Issue Triage`,
          "columnName": "Needs Triage",
          "isOrgProject": true
        }
      }
    ]
  }
}];
