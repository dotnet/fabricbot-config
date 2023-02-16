module.exports = (scope, data) => [
{
    "taskType": "scheduledAndTrigger",
    "capabilityId": "IssueRouting",
    "subCapability": "@Mention",
    "version": "1.0",
    "config": {
        "taskName": `Notify subscribers for ${scope} labels`,
        "labelsAndMentions": data.flatMap(element => [{
            "labels": [
              `${element["label"]}`
            ],
            "mentionees":
              element["owners"].map(owner => `${owner}`),
          },
        ]),
        "replyTemplate": "Tagging subscribers to this area: ${mentionees}\nSee info in [area-owners.md](https://github.com/dotnet/runtime/blob/main/docs/area-owners.md) if you want to be subscribed.",
        "enableForPullRequests": true
      },
      "disabled": false
}];