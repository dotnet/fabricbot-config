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
  Area: "areas",
  "Operating System": "operatingSystems",
  Architecture: "architectures",
  "Trimming Label": "trimming"
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

    let resultsJson = [];
    let markdown = [];
    for (const scope in ownersAreas) {
      var data = json[ownersAreas[scope]]
      if (!data)
        continue;

      data = data.sort((a, b) => a["label"].localeCompare(b["label"], 'en-US'));

      let jsonData = data.filter(entry => (entry["owners"].concat(entry["mentionees"] || []))[0].length > 0);

      resultsJson.push(issueAndPullRequestTasks.areaNotification(scope, jsonData));
      markdown.push(formatAreasLikeMarkdown(scope, data));
    }
    return { 'JSON': resultsJson, 'Markdown': markdown };
  })
};

function formatAreasLikeMarkdown(scope, data) {
  return { 'Scope': scope, 'Data': data.map(entry => {
    return { Label: entry["label"], Lead: entry["lead"], Owners: entry["owners"] || [], Notes: entry["notes"] || "" };
  })};
}

(async() => {
for (const repo of repos) {
  const notifications = await generateAreasNotifications(repo) || { 'JSON': [], 'Markdown': []};

  const generatedTasks = [
    ...(repoWideTasks[repo] || []),
    ...notifications.JSON.flatMap(l => l),
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

  if (notifications.Markdown.length > 0) {
    const generatedMarkdown = path.join(generatedFolder, `${repo}.md`);

    let writer = fs.createWriteStream(generatedMarkdown);

    const col1 = 47;
    const col2 = 21;
    const col3 = 52;
    const col4 = 282;

    for (const i in notifications.Markdown) {
      let row = notifications.Markdown[i];

      let scope = row.Scope;

      writer.write(`## ${scope}s\n\n`);
      writer.write(`| ${scope.padEnd(col1)}| ${"Lead".padEnd(col2)}| ${"Owners (area experts to tag in PRs and issues)".padEnd(col3)}| ${"Notes".padEnd(col4)}|\n`);
      writer.write(`|${'-'.repeat(col1 + 1)}|${'-'.repeat(col2 + 1)}|${'-'.repeat(col3 + 1)}|${'-'.repeat(col4 + 1)}|\n`);

      for (const ii in row.Data) {
        let entry = row.Data[ii];
        let lead = entry.Lead;
        let owners = entry.Owners.filter(Boolean);
        writer.write(`| ${entry.Label.padEnd(col1)}| ${(lead?.length > 0 ? '@'+lead : '').padEnd(col2)}| ${(owners?.length > 0 ? owners.map(e => '@'+e).join(' '): '' ).padEnd(col3)}| ${entry.Notes.padEnd(col4)}|\n`);
      }

      writer.write('\n');
    }

    console.log(`Generated markdown written to ${generatedMarkdown}`);
  }
}
})()