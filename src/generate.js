// Generates FabricBot config for all of the affected repositories
// Running the script using node will generate the `/generated/*.json` files with the new configurations.
//
// After generation, the `merge.js` script can be used to merge the generated config with the target
// repositories" config files to merge the area pod configuration with other fabricbot configuration tasks.

const path = require("path");
const fs = require("fs");

const areaPods = require("./areaPods");
const issueLabelTasks = require("./issueLabelTasks");
const projectBoardTasks = require("./projectBoardTasks");

const generatedFolder = path.resolve(path.join(__dirname, "..", "generated"));

if (!fs.existsSync(generatedFolder)) {
  fs.mkdirSync(generatedFolder);
}

const repos = [
  "fabricbot-config",
  "runtime",
  "dotnet-api-docs",
  "machinelearning"
];

const triagedLabels = {
  "fabricbot-config": ["needs-author-action", "approved", "rejected"],
  "runtime":          ["needs-author-action", "api-ready-for-review"],
  "dotnet-api-docs":  ["needs-author-action", "needs-more-info"],
  "machinelearning":  ["needs-author-action"]
};

const repoIssueLabelTasks = {
  "fabricbot-config": [issueLabelTasks.untriaged(triagedLabels["fabricbot-config"])],
  "machinelearning": [issueLabelTasks.untriaged(triagedLabels["machinelearning"])]
};

for (const repo of repos) {
  const generatedTasks = [
    // Repository-Wide Issue Labeling Tasks
    ...(repoIssueLabelTasks[repo] || []),

    // Area Pod Project Board Tasks
    ...areaPods
      // Filter to the area pods that have areas in this repo
      .filter(areaPod => !!areaPod.repos[repo])
      // Get a flat array of project board tasks for this pod in this repo
      .flatMap(areaPod => projectBoardTasks.map(task => task({
        podName: areaPod.pod,
        podAreas: areaPod.repos[repo],
        triagedLabels: triagedLabels[repo]
      })))
      // Filter out any empty/falsy tasks (that were not applicable for a pod in this repo)
      .filter(task => !!task)
  ].map(task => ({
    "taskSource": "fabricbot-config",
    ...task
  }));

  const generatedJson = JSON.stringify(generatedTasks, null, 2);
  const generatedConfigPath = path.join(generatedFolder, `${repo}.json`);

  fs.writeFileSync(generatedConfigPath, generatedJson);
  console.log(`Generated tasks written to ${generatedConfigPath}`);
}
