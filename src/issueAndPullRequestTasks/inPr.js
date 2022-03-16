module.exports = () => [
  {
    "taskType": "trigger",
    "capabilityId": "InPrLabel",
    "subCapability": "InPrLabel",
    "version": "1.0",
    "config": {
      "taskName": "Add `in-pr` label on issue when an open pull request is targeting it",
      "inPrLabelText": "There is an active PR which will close this issue when it is merged",
      "fixedLabelEnabled": false,
      "label_inPr": "in-pr"
    }
  }
];
