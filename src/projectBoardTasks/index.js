const issueMovedToAnotherArea = require("./issueMovedToAnotherArea");
const issueNeedsTriage = require("./issueNeedsTriage");
const issueNeedsFurtherTriage = require("./issueNeedsFurtherTriage");
const issueTriaged = require("./issueTriaged");
const issueTriageStarted = require("./issueTriageStarted");
const pullRequestDone = require("./pullRequestDone");
const pullRequestNeedsChampion = require("./pullRequestNeedsChampion");
const pullRequestChampionAssigned = require("./pullRequestChampionAssigned");

module.exports = (options) => [
  ...issueMovedToAnotherArea(options),
  ...issueNeedsTriage(options),
  ...issueNeedsFurtherTriage(options),
  ...issueTriaged(options),
  ...issueTriageStarted(options),
  ...pullRequestDone(options),
  ...pullRequestNeedsChampion(options),
  ...pullRequestChampionAssigned(options)
];
