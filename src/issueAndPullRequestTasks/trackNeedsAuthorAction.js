module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "taskName": "Needs-author-action notification",
      "actions": [
        {
          "name": "addReply",
          "parameters": {
            "comment": "This issue has been marked `needs-author-action` and may be missing some important information."
          }
        }
      ],
      "eventType": "issue",
      "eventNames": ["issues"],
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
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestReviewResponder",
    "version": "1.0",
    "config": {
      "taskName": "PR reviews with \"changes requested\" applies the needs-author-action label",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["pull_request_review"],
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
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Replace `needs-author-action` label with `needs-further-triage` label when the author comments on an issue that is not still untriaged",
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
      "eventNames": ["issue_comment"],
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
            "operator": "not",
            "operands": [
              {
                "name": "hasLabel",
                "parameters": {
                  "label": "untriaged"
                }
              }
            ]
          },
          {
            "name": "isOpen",
            "parameters": {}
          }
        ]
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Remove `needs-author-action` label when the author comments on an `untriaged` issue",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "issue",
      "eventNames": ["issue_comment"],
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
            "name": "hasLabel",
            "parameters": {
              "label": "untriaged"
            }
          },
          {
            "name": "isOpen",
            "parameters": {}
          }
        ]
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestResponder",
    "version": "1.0",
    "config": {
      "taskName": "Pushing changes to PR branch removes the needs-author-action label",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["pull_request"],
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
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Author commenting in PR removes the needs-author-action label",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["issue_comment"],
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
      }
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "PullRequestReviewResponder",
    "version": "1.0",
    "config": {
      "taskName": "Author responding to a pull request review comment removes the needs-author-action label",
      "actions": [
        {
          "name": "removeLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        }
      ],
      "eventType": "pull_request",
      "eventNames": ["pull_request_review"],
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
      }
    }
  }
];
