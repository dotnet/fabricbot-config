node src/generate.js
node src/merge.js ./generated/fabricbot-config.json .github/fabricbot.json
node src/merge.js ./generated/runtime.json          ../runtime/.github/fabricbot.json
node src/merge.js ./generated/machinelearning.json  ../machinelearning/.github/fabricbot.json
node src/merge.js ./generated/dotnet-api-docs.json  ../dotnet-api-docs/.github/fabricbot.json
node src/merge.js ./generated/roslyn-analyzers.json ../roslyn-analyzers/.github/fabricbot.json
