const path = require('path');
const fs = require('fs');

let [generatedConfig, repositoryConfig] = process.argv.slice(2);

if (!generatedConfig || !repositoryConfig) {
    console.error('Usage: node mergeConfig.js generatedConfig repositoryConfig');
    console.error('Example: node mergeConfig.js ~/git/dotnet/fabricbot-config/generated/runtime.json ~/git/dotnet/runtime/.github/fabricbot.json');

    process.exit(1);
}

if (!path.isAbsolute(generatedConfig)) {
    generatedConfig = path.normalize(path.join(process.cwd(), generatedConfig));
}

if (!path.isAbsolute(repositoryConfig)) {
    repositoryConfig = path.normalize(path.join(process.cwd(), repositoryConfig));
}

const generatedExists = fs.existsSync(generatedConfig);
const publishedExists = fs.existsSync(repositoryConfig);

if (!generatedExists || !publishedExists) {
    if (!generatedExists) {
        console.error('Generated config file could not be found: ' + generatedConfig);
    }

    if (!publishedExists) {
        console.error('Repository config file could not be found: ' + repositoryConfig);
    }

    process.exit(1);
}

const generatedTasks = require(generatedConfig);
const repositoryTasks = require(repositoryConfig);

const nonAreaPodTasks = repositoryTasks.filter(task => !task.config.taskName || task.config.taskName.indexOf('[Area Pod:') != 0);
const mergedConfig = [...nonAreaPodTasks, ...generatedTasks];

fs.writeFileSync(repositoryConfig, JSON.stringify(mergedConfig, null, 2));

console.log('Merged generated tasks into ' + repositoryConfig);
