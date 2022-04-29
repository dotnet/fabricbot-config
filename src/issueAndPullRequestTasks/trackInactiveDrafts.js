module.exports = (days) => [
  {
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "taskName": "Close inactive Draft PRs",
      "actions": [
        {
          "name": "closeIssue",
          "parameters": {}
        },
        {
          "name": "addReply",
          "parameters": {
            "comment": `Draft Pull Request was automatically closed for ${days} days of inactivity. Please [let us know](https://github.com/dotnet/runtime/blob/main/docs/area-owners.md) if you'd like to reopen it.`
          }
        }
      ],
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 1,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 2,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 3,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 4,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 5,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 6,
          "hours": [
            5,
            11,
            17,
            23
          ],
          "timezoneOffset": 0
        }
      ],
      "searchTerms": [
        {
          "name": "isDraftPr",
          "parameters": {
            "value": "true"
          }
        },
        {
          "name": "isOpen",
          "parameters": {}
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        }
      ]
    }
  }
];
