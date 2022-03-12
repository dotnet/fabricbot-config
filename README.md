# .NET FabricBot Configuration

Several of the [dotnet organization](https://github.com/dotnet) repositories use a utility called FabricBot to automate our GitHub issue/PR practices. FabricBot is configured through `.github/fabricbot.json` files within the repositories. This `dotnet/fabricbot-config` repository contains scripts used to generate/maintain those configurations.

## Area Pod Configurations

Many of the areas within .NET's runtime and libraries use "Area Pods" to fulfill area owner responsibilities. Area pods are crews responsible for issue triage and PR championship across several areas. The pod members collaborate and load-balance work among themselves. Because the issue triage and PR championship workflows are standardized across the area pods though, we can use FabricBot to automate steps within the workflows.

The scripts within this repository aid with generating and maintaining the FabricBot configurations so they remain consistent across the area pods. These configurations are generated for each dotnet organization repository that the area pods work in.

Within each of the repositories that area pods work, there can be other FabricBot configuration in place specific to that repository. The scripts within this repository take that into account as well, allowing the area pod configurations to be merged together with other configuration.

### Generating Area Pod Configurations

*NodeJS is required.*

* PowerShell: `./generate.ps1`
* Bash: `./generate.sh`

Running the script will generate JSON configuration files under the `generated/` folder. The generated files are being tracked by git to simplify auditing changes of the generator script. When making changes to the generator script, please ensure that you have run the script and have committed the new generated files.

The generated files themselves have no impact on live FabricBot configuration. The changes need to be merged into the `.github/fabricbot.json` file at the root of the affected repositories. The `.github/fabricbot.json` file within this repo is automatically merged with the generated config during the build.

### Merging Area Pod Configurations into Affected Repositories

*NodeJS is required.*

* PowerShell: `./merge.ps1 generatedConfig repositoryConfig`
    * Example: `./merge.ps1 .\generated\runtime.json D:\git\dotnet\runtime\.github\fabricbot.json`
* Bash: `./merge.sh generatedConfig repositoryConfig`
    * Example: `./merge.sh ./generated/runtime.json ~/git/dotnet/runtime/.github/fabricbot.json`

The merge script detects the Area Pod configuration tasks based on naming convention, and overwrites those tasks with the generated tasks; other tasks will remain unchanged.
