const issueMovedToAnotherArea = require("./issueMovedToAnotherArea");
const issueNeedsTriage = require("./issueNeedsTriage");
const issueNeedsFurtherTriage = require("./issueNeedsFurtherTriage");
const issueTriaged = require("./issueTriaged");
const issueTriageStarted = require("./issueTriageStarted");
const issueExcluded = require("./issueExcluded");
const pullRequestDone = require("./pullRequestDone");
const pullRequestNeedsChampion = require("./pullRequestNeedsChampion");
const pullRequestChampionAssigned = require("./pullRequestChampionAssigned");
const pullRequestExcluded = require("./pullRequestExcluded");

module.exports = (options) => [
  ...issueMovedToAnotherArea(options),
  ...issueNeedsTriage(options),
  ...issueNeedsFurtherTriage(options),
  ...issueTriaged(options),
  ...issueTriageStarted(options),
  ...issueExcluded(options),
  ...pullRequestDone(options),
  ...pullRequestNeedsChampion(options),
  ...pullRequestChampionAssigned(options),
  ...pullRequestExcluded(options)
];
