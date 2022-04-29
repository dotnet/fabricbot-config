module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "taskName": "Add untriaged label to new/reopened issues without a milestone",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "untriaged"
          }
        }
      ],
      "eventType": "issue",
      "eventNames": ["issues"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "operator": "or",
            "operands": [
              {
                "name": "isAction",
                "parameters": {
                  "action": "opened"
                }
              },
              {
                "name": "isAction",
                "parameters": {
                  "action": "reopened"
                }
              },
              {
                "name": "removedFromMilestone",
                "parameters": {}
              }
            ]
          },
          {
            "name": "isOpen",
            "parameters": {}
          },
          {
            "operator": "not",
            "operands": [
              {
                "name": "isInMilestone",
                "parameters": {}
              }
            ]
          },
          {
            "operator": "not",
            "operands": [
              {
                "name": "hasLabel",
                "parameters": {
                  "label": "untriaged"
                }
              }
            ]
          }
        ]
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "taskName": "Remove untriaged label from issues when closed or added to a milestone",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "untriaged"
          }
        }
      ],
      "eventType": "issue",
      "eventNames": ["issues"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "operator": "or",
            "operands": [
              {
                "name": "isAction",
                "parameters": {
                  "action": "closed"
                }
              },
              {
                "name": "addedToMilestone",
                "parameters": {}
              }
            ]
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "untriaged"
            }
          }
        ]
      }
    }
  }
];
