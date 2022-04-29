module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "labelAdded",
            "parameters": {
              "label": "needs-author-action"
            }
          }
        ]
      },
      "eventType": "issue",
      "eventNames": [
        "issues"
      ],
      "taskName": "Needs-author-action notification",
      "actions": [
        {
          "name": "addReply",
          "parameters": {
            "comment": "This issue has been marked `needs-author-action` since it may be missing important information. Please refer to our [contribution guidelines](https://github.com/dotnet/runtime/blob/main/CONTRIBUTING.md#writing-a-good-bug-report) for tips on how to report issues effectively."
          }
        }
      ]
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestReviewResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "operator": "not",
            "operands": [
              {
                "name": "activitySenderHasPermissions",
                "parameters": {
                  "state": "changes_requested",
                  "permissions": "read"
                }
              }
            ]
          },
          {
            "name": "isAction",
            "parameters": {
              "action": "submitted"
            }
          },
          {
            "name": "isReviewState",
            "parameters": {
              "state": "changes_requested"
            }
          }
        ]
      },
      "eventType": "pull_request",
      "eventNames": [
        "pull_request_review"
      ],
      "taskName": "PR reviews with \"changes requested\" applies the needs-author-action label",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ]
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Replace `needs-author-action` label with `needs-further-triage` label when the author comments on an issue",
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isAction",
            "parameters": {
              "action": "created"
            }
          },
          {
            "name": "isActivitySender",
            "parameters": {
              "user": {
                "type": "author"
              }
            }
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "needs-author-action"
            }
          },
          {
            "name": "isOpen",
            "parameters": {}
          }
        ]
      },
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "needs-further-triage"
          }
        },
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "issue",
      "eventNames": [
        "issue_comment"
      ]
    }
  },
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
            "name": "isAction",
            "parameters": {
              "action": "synchronize"
            }
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "needs-author-action"
            }
          }
        ]
      },
      "eventType": "pull_request",
      "eventNames": [
        "pull_request"
      ],
      "taskName": "Pushing changes to PR branch removes the needs-author-action label",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ]
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestCommentResponder",
    "version": "1.0",
    "config": {
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isActivitySender",
            "parameters": {
              "user": {
                "type": "author"
              }
            }
          },
          {
            "name": "isAction",
            "parameters": {
              "action": "created"
            }
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "needs-author-action"
            }
          },
          {
            "name": "isOpen",
            "parameters": {}
          }
        ]
      },
      "eventType": "pull_request",
      "eventNames": [
        "issue_comment"
      ],
      "taskName": "Author commenting in PR removes the needs-author-action label",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ]
    },
    "disabled": false
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestReviewResponder",
    "version": "1.0",
    "config": {
      "taskName": "Author responding to a pull request review comment removes the needs-author-action label",
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isActivitySender",
            "parameters": {
              "user": {
                "type": "author"
              }
            }
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "needs-author-action"
            }
          },
          {
            "name": "isAction",
            "parameters": {
              "action": "submitted"
            }
          },
          {
            "name": "isOpen",
            "parameters": {}
          }
        ]
      },
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": [
        "pull_request_review"
      ]
    }
  }
];
