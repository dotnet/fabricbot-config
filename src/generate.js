// Generates FabricBot config for all area pod triage/PR boards
//
// Running the script using node will generate the `/generated/*/areapods.json` files with the new configuration.
//
// After generation, the `mergeConfig.js` script can be used to merge the generated config with the target
// repositories" config files to merge the area pod configuration with other fabricbot configuration tasks.

const path = require("path");
const fs = require("fs");

const areaPods = require("./areaPods");
let tasks = require("./tasks");

const repos = [
  "fabricbot-config",
  "runtime",
  "dotnet-api-docs",
  "machinelearning"
];

const generatedFolder = path.resolve(path.join(__dirname, "..", "generated"));

if (!fs.existsSync(generatedFolder)) {
  fs.mkdirSync(generatedFolder);
}

for (const repo of repos) {
  const generatedTasks = areaPods
    // Filter to the area pods that have areas in this repo
    .filter(areaPod => !!areaPod.repos[repo])
    // Get a flat array of tasks for this pod in this repo
    .flatMap(areaPod => tasks.map(task => task(areaPod.pod, areaPod.repos[repo])))
    // Filter out any empty/falsy tasks (that were not applicable for a pod in this repo)
    .filter(task => !!task);

  const generatedJson = JSON.stringify(generatedTasks, null, 2);
  const generatedConfigPath = path.join(generatedFolder, `${repo}.json`);

  fs.writeFileSync(generatedConfigPath, generatedJson);
  console.log(`Generated tasks written to ${generatedConfigPath}`);
}
