const issueMovedToAnotherArea = require("./issueMovedToAnotherArea");
const issueNeedsTriage = require("./issueNeedsTriage");
const issueNeedsFurtherTriage = require("./issueNeedsFurtherTriage");
const issueTriaged = require("./issueTriaged");
const pullRequestDone = require("./pullRequestDone");
const pullRequestNeedsChampion = require("./pullRequestNeedsChampion");

module.exports = (options) => [
  ...issueMovedToAnotherArea(options),
  ...issueNeedsTriage(options),
  ...issueNeedsFurtherTriage(options),
  ...issueTriaged(options),
  ...pullRequestDone(options),
  ...pullRequestNeedsChampion(options)
];
