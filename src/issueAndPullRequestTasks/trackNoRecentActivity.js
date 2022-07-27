module.exports = (days, labelsToRemoveWithActivity) => [
  {
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "taskName": "Add no-recent-activity label to issues",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        },
        {
          "name": "addReply",
          "parameters": {
            "comment": `This issue has been automatically marked \`no-recent-activity\` because it has not had any activity for ${days} days. It will be closed if no further activity occurs within ${days} more days. Any new comment (by anyone, not necessarily the author) will remove \`no-recent-activity\`.`
          }
        }
      ],
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 1,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 2,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 3,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 4,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 5,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 6,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        }
      ],
      "searchTerms": [
        {
          "name": "isIssue",
          "parameters": {}
        },
        {
          "name": "isOpen",
          "parameters": {}
        },
        {
          "name": "hasLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        },
        {
          "name": "noLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        }
      ]
    }
  },
  {
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "taskName": "Add no-recent-activity label to PRs",
      "actions": [
        {
          "name": "addLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        },
        {
          "name": "addReply",
          "parameters": {
            "comment": `This pull request has been automatically marked \`no-recent-activity\` because it has not had any activity for ${days} days. It will be closed if no further activity occurs within ${days} more days. Any new comment (by anyone, not necessarily the author) will remove \`no-recent-activity\`.`
          }
        }
      ],
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 1,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 2,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 3,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 4,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 5,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        },
        {
          "weekDay": 6,
          "hours": [
            4,
            10,
            16,
            22
          ],
          "timezoneOffset": 1
        }
      ],
      "searchTerms": [
        {
          "name": "isPr",
          "parameters": {}
        },
        {
          "name": "isOpen",
          "parameters": {}
        },
        {
          "name": "hasLabel",
          "parameters": {
            "label": "needs-author-action"
          }
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        },
        {
          "name": "noLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        }
      ]
    }
  },
  {
    "taskType": "trigger",
    "capabilityId": "IssueResponder",
    "subCapability": "IssuesOnlyResponder",
    "version": "1.0",
    "config": {
      "taskName": "Remove `no-recent-activity` label from issues when issue is modified",
      "actions": (['no-recent-activity', ...(labelsToRemoveWithActivity || [])]).map(label => ({
        "name": "removeLabel",
        "parameters": {
          label
        }
      })),
      "eventType": "issue",
      "eventNames": ["issues"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "operator": "not",
            "operands": [
              {
                "name": "isAction",
                "parameters": {
                  "action": "closed"
                }
              }
            ]
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "no-recent-activity"
            }
          },
          {
            "operator": "not",
            "operands": [
              {
                "name": "labelAdded",
                "parameters": {
                  "label": "no-recent-activity"
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
    "subCapability": "IssueCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Remove `no-recent-activity` label when an issue is commented on",
      "actions": (['no-recent-activity', ...(labelsToRemoveWithActivity || [])]).map(label => ({
        "name": "removeLabel",
        "parameters": {
          label
        }
      })),
      "eventType": "issue",
      "eventNames": ["issue_comment"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "hasLabel",
            "parameters": {
              "label": "no-recent-activity"
            }
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
      "taskName": "Remove `no-recent-activity` label from PRs when modified",
      "actions": (['no-recent-activity', ...(labelsToRemoveWithActivity || [])]).map(label => ({
        "name": "removeLabel",
        "parameters": {
          label
        }
      })),
      "eventType": "pull_request",
      "eventNames": ["pull_request"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "isOpen",
            "parameters": {}
          },
          {
            "name": "hasLabel",
            "parameters": {
              "label": "no-recent-activity"
            }
          },
          {
            "operator": "not",
            "operands": [
              {
                "name": "labelAdded",
                "parameters": {
                  "label": "no-recent-activity"
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
    "subCapability": "PullRequestCommentResponder",
    "version": "1.0",
    "config": {
      "taskName": "Remove `no-recent-activity` label from PRs when commented on",
      "actions": (['no-recent-activity', ...(labelsToRemoveWithActivity || [])]).map(label => ({
        "name": "removeLabel",
        "parameters": {
          label
        }
      })),
      "eventType": "pull_request",
      "eventNames": ["issue_comment"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "hasLabel",
            "parameters": {
              "label": "no-recent-activity"
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
      "taskName": "Remove `no-recent-activity` label from PRs when new review is added",
      "actions": (['no-recent-activity', ...(labelsToRemoveWithActivity || [])]).map(label => ({
        "name": "removeLabel",
        "parameters": {
          label
        }
      })),
      "eventType": "pull_request",
      "eventNames": ["pull_request_review"],
      "conditions": {
        "operator": "and",
        "operands": [
          {
            "name": "hasLabel",
            "parameters": {
              "label": "no-recent-activity"
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
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "taskName": "Close issues with no recent activity",
      "actions": [
        {
          "name": "addReply",
          "parameters": {
            "comment": `This issue will now be closed since it had been marked \`no-recent-activity\` but received no further activity in the past ${days} days. It is still possible to reopen or comment on the issue, but please note that the issue will be locked if it remains inactive for another 30 days.`
          }
        },
        {
          "name": "closeIssue",
          "parameters": {}
        }
      ],
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 1,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 2,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 3,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 4,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 5,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 6,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        }
      ],
      "searchTerms": [
        {
          "name": "isIssue",
          "parameters": {}
        },
        {
          "name": "isOpen",
          "parameters": {}
        },
        {
          "name": "hasLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        }
      ]
    }
  },
  {
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "taskName": "Close PRs with no-recent-activity",
      "actions": [
        {
          "name": "addReply",
          "parameters": {
            "comment": `This pull request will now be closed since it had been marked \`no-recent-activity\` but received no further activity in the past ${days} days. It is still possible to reopen or comment on the pull request, but please note that it will be locked if it remains inactive for another 30 days.`
          }
        },
        {
          "name": "closeIssue",
          "parameters": {}
        }
      ],
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 1,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 2,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 3,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 4,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 5,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 6,
          "hours": [
            0,
            6,
            12,
            18
          ],
          "timezoneOffset": 0
        }
      ],
      "searchTerms": [
        {
          "name": "isPr",
          "parameters": {}
        },
        {
          "name": "isOpen",
          "parameters": {}
        },
        {
          "name": "hasLabel",
          "parameters": {
            "label": "no-recent-activity"
          }
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        }
      ]
    }
  }
];
