const path = require("path");
const fs = require("fs");

let [generatedConfig, repositoryConfig] = process.argv.slice(2);

if (!generatedConfig || !repositoryConfig) {
    console.error("Usage: node mergeConfig.js generatedConfig repositoryConfig");
    console.error("Example: node mergeConfig.js ~/git/dotnet/fabricbot-config/generated/runtime.json ~/git/dotnet/runtime/.github/fabricbot.json");

    process.exit(1);
}

if (!path.isAbsolute(generatedConfig)) {
    generatedConfig = path.normalize(path.join(process.cwd(), generatedConfig));
}

if (!path.isAbsolute(repositoryConfig)) {
    repositoryConfig = path.normalize(path.join(process.cwd(), repositoryConfig));
}

const generatedExists = fs.existsSync(generatedConfig);

if (!generatedExists) {
    console.error("Generated config file could not be found: " + generatedConfig);
    process.exit(1);
}

const generatedTasks = require(generatedConfig);
let repositoryTasks = [];

if (fs.existsSync(repositoryConfig)) {
    repositoryTasks = require(repositoryConfig);
} else {
    const repoDir = path.dirname(repositoryConfig);

    if (!fs.existsSync(repoDir)) {
        fs.mkdirSync(repoDir);
    }
}

// Generated tasks use the taskSource of "fabricbot-config"
// But a previous version of generated tasks used the taskName convention of "[Area Pod:"
const nonGeneratedTasks = repositoryTasks
    .filter(task => !task.taskSource || task.taskSource != "fabricbot-config")
    .filter(task => !task.config.taskName || task.config.taskName.indexOf("[Area Pod:") != 0);

const mergedConfig = [...nonGeneratedTasks, ...generatedTasks];

fs.writeFileSync(repositoryConfig, JSON.stringify(mergedConfig, null, 2));

console.log("Merged generated tasks into " + repositoryConfig);
