const issueMovedToAnotherArea = require("./issueMovedToAnotherArea");
const issueNeedsTriage = require("./issueNeedsTriage");
const issueNeedsFurtherTriage = require("./issueNeedsFurtherTriage");
const issueTriaged = require("./issueTriaged");
const pullRequestMovedToAnotherArea = require("./pullRequestMovedToAnotherArea");
const pullRequestNeedsChampion = require("./pullRequestNeedsChampion");
const pullRequestChampionAssigned = require("./pullRequestChampionAssigned");

module.exports = (options) => [
  ...issueMovedToAnotherArea(options),
  ...issueNeedsTriage(options),
  ...issueNeedsFurtherTriage(options),
  ...issueTriaged(options),
  ...pullRequestMovedToAnotherArea(options),
  ...pullRequestNeedsChampion(options),
  ...pullRequestChampionAssigned(options)
];
