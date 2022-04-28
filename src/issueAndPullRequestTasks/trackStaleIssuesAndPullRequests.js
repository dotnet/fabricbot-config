module.exports = (days) => [
  {
    "taskType": "scheduled",
    "capabilityId": "ScheduledSearch",
    "subCapability": "ScheduledSearch",
    "version": "1.1",
    "config": {
      "frequency": [
        {
          "weekDay": 0,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 1,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 2,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 3,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 4,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 5,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        },
        {
          "weekDay": 6,
          "hours": [
            1,
            7,
            13,
            19
          ],
          "timezoneOffset": 0
        }
      ],
      "searchTerms": [
        {
          "name": "isClosed",
          "parameters": {}
        },
        {
          "name": "noActivitySince",
          "parameters": { days }
        },
        {
          "name": "isUnlocked",
          "parameters": {}
        }
      ],
      "actions": [
        {
          "name": "lockIssue",
          "parameters": {
            "reason": "resolved",
            "label": "will_lock_this"
          }
        }
      ],
      "taskName": "Lock stale issues and PR's"
    }
  }
];
