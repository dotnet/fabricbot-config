// Generates FabricBot config for all of the affected repositories
// Running the script using node will generate the `/generated/*.json` files with the new configurations.
//
// After generation, the `merge.js` script can be used to merge the generated config with the target
// repositories" config files to merge the area pod configuration with other fabricbot configuration tasks.

const path = require("path");
const fs = require("fs");

const areaPods = require("./areaPods");
const issueAndPullRequestTasks = require("./issueAndPullRequestTasks");
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

const repoWideTasks = {
  "fabricbot-config": [
    ...issueAndPullRequestTasks.trackUntriaged(),
    ...issueAndPullRequestTasks.addInPrLabel(),
    ...issueAndPullRequestTasks.assignTeamAuthor(),
    ...issueAndPullRequestTasks.addCommunityContributionLabel(),
    ...issueAndPullRequestTasks.trackNeedsAuthorAction(),
    ...issueAndPullRequestTasks.trackNoRecentActivity(14),
    ...issueAndPullRequestTasks.trackInactiveDrafts(30),
    ...issueAndPullRequestTasks.trackStaleIssuesAndPullRequests(30),
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

const ownersAreas = {
  Architecture: "architectures",
  OS: "operatingSystems",
  Areas: "areas",
  Trimming: "trimming"
};

const generateAreasNotifications = async function(repo) {
  return await fetch(`https://raw.githubusercontent.com/dotnet/${repo}/main/docs/area-owners.json`)
  .then(r => {
    if (r.ok)
      return r.json();
  })
  .then(json => {
    if (!json)
      return;

    let results = []
    for (const scope in ownersAreas) {
      var data = json[ownersAreas[scope]]
      if (!data)
        continue;

      data = data.
        filter(entry => entry["owners"].length > 0 && entry["owners"][0] != []).
        sort((a, b) => a["label"].localeCompare(b["label"], 'en-US'));

      results.push(issueAndPullRequestTasks.areaNotification(scope, data));
    }
    return results;
  })
};

(async() => {
for (const repo of repos) {
  const notifications = await generateAreasNotifications(repo) || [];

  const generatedTasks = [
    ...(repoWideTasks[repo] || []),
    ...notifications.flatMap(l => l),
    // Area Pod Project Board Tasks
    ...areaPods
      // Filter to the area pods that have areas in this repo
      .filter(areaPod => !!areaPod.repos[repo])
      // Get a flat array of project board tasks for this pod in this repo
      .flatMap(({podName, podMembers, repos}) => projectBoardTasks({
        podName,
        podMembers,
        podAreas: repos[repo],
        triagedLabels: areaPodTriagedLabels[repo]
      }))
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
})()