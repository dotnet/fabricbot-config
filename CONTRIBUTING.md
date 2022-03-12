# Contributing to the .NET FabricBot Config Scripts

We welcome contributions from .NET team members who rely on the FabricBot configuration across the [dotnet organization](https://github.com/dotnet) repositories.

## Reporting Issues

Issues can be submitted to report a https://github.com/dotnet/fabricbot-config/labels/bug or to propose and https://github.com/dotnet/fabricbot-config/labels/enhancement in the generated FabricBot configurations.

## Submitting PRs

PRs can be submitted to fix a https://github.com/dotnet/fabricbot-config/labels/bug, to implement https://github.com/dotnet/fabricbot-config/labels/approved https://github.com/dotnet/fabricbot-config/labels/enhancement proposals, to update area pod members, or to update area/repository assignments to area pods.

After updating the scripts, run `generate.ps1` / `generate.sh` to update the generated config files. Include the updates to the `generated` files in the PR that updates the script. By including the generated output in the PR, the effects of the changes can be reviewed easily. When `generate.ps1` / `generate.sh` is executed, the `.github/fabricbot.json` file within this repository will be updated to reflect the changes to the script too.

## Testing Changes

This repository uses FabricBot to ensure submitted issues are routed to the assigned area pod for triage. After a PR is merged, manual testing of the changes can be conducted within this repository by creating https://github.com/dotnet/fabricbot-config/labels/testing issues and PRs and verifying the expeected behavior.
