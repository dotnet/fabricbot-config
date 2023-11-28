// Generates FabricBot config for all of the affected repositories
// Running the script using node will generate the `/generated/*.json` files with the new configurations.
//
// After generation, the `merge.js` script can be used to merge the generated config with the target
// repositories" config files to merge the area pod configuration with other fabricbot configuration tasks.

const path = require("path");
const fs = require("fs");

const areaPods = require("./areaPods");
const issueAndPullRequestTasks = require("./issueAndPullRequestTasks");

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

const repoWideTasks = {
  "fabricbot-config": [
    ...issueAndPullRequestTasks.trackUntriaged(),
    ...issueAndPullRequestTasks.addInPrLabel(),
    ...issueAndPullRequestTasks.assignTeamAuthor(),
    ...issueAndPullRequestTasks.addCommunityContributionLabel(),
    ...issueAndPullRequestTasks.trackNeedsAuthorAction(),
    ...issueAndPullRequestTasks.trackNoRecentActivity(14),
    ...issueAndPullRequestTasks.trackInactiveDrafts(30)
  ],
  "runtime": [
    ...issueAndPullRequestTasks.trackUntriaged(),
    ...issueAndPullRequestTasks.addInPrLabel(),
    ...issueAndPullRequestTasks.assignTeamAuthor(),
    ...issueAndPullRequestTasks.addCommunityContributionLabel(),
    ...issueAndPullRequestTasks.trackNeedsAuthorAction(),
    ...issueAndPullRequestTasks.trackNoRecentActivity(14, ['backlog-cleanup-candidate']),
    ...issueAndPullRequestTasks.trackInactiveDrafts(30),
    ...issueAndPullRequestTasks.trackStaleIssuesAndPullRequests(30),
  ],
  "machinelearning": [
    ...issueAndPullRequestTasks.trackUntriaged(),
    ...issueAndPullRequestTasks.addInPrLabel(),
    ...issueAndPullRequestTasks.assignTeamAuthor(),
    ...issueAndPullRequestTasks.addCommunityContributionLabel(),
    ...issueAndPullRequestTasks.trackNeedsAuthorAction(),
    ...issueAndPullRequestTasks.trackNoRecentActivity(14),
    ...issueAndPullRequestTasks.trackInactiveDrafts(30),
    ...issueAndPullRequestTasks.trackStaleIssuesAndPullRequests(30),
  ],
  "dotnet-api-docs": [
    ...issueAndPullRequestTasks.trackUntriaged(),
    ...issueAndPullRequestTasks.assignTeamAuthor(),
    ...issueAndPullRequestTasks.addCommunityContributionLabel(),
    ...issueAndPullRequestTasks.trackNeedsAuthorAction()
  ]
};

const areaPodTriagedLabels = {
  "fabricbot-config": ["needs-author-action"],
  "runtime":          ["needs-author-action", "api-ready-for-review"],
  "machinelearning":  ["needs-author-action"],
  "dotnet-api-docs":  ["needs-author-action"]
};

// Generate the config files, annotating all generated tasks with a `taskSource` property
for (const repo of repos) {
  const generatedTasks = [...(repoWideTasks[repo] || [])].map(task => ({
    "taskSource": "fabricbot-config",
    ...task
  }));

  const generatedJson = JSON.stringify(generatedTasks, null, 2);
  const generatedConfigPath = path.join(generatedFolder, `${repo}.json`);

  fs.writeFileSync(generatedConfigPath, generatedJson);
  console.log(`Generated tasks written to ${generatedConfigPath}`);
}
