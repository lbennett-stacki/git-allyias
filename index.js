const { spawn } = require("child_process");

const ALIAS_REGEX = /^alias\.(?<matchAlias>.+?)\s/;
const GIT_COMMAND = process.argv[2];

const originalArgs = process.argv;
originalArgs.splice(0, 2);

function countMatches(A, B) {
  return A.reduce((count, a) => {
    B.forEach(b => {
      count += a === b ? 1 : 0;
    });
    return count;
  }, 0);
}

function descendingScore(a, b) {
  return a.score < b.score ? 1 : -1;
}

const gitConfig = spawn("git", ["config", "--get-regexp", "alias"]);
gitConfig.stdout.on("data", aliasConfig => {
  const aliases = aliasConfig.toString().split("\n");

  const results = aliases.reduce((results, alias) => {
    if (!alias) return results;

    const matches = alias.match(ALIAS_REGEX);
    if (!matches) return results;
    const { matchAlias } = matches.groups;

    const destructuredAlias = alias.replace(ALIAS_REGEX, "").split(/\s/);
    if (destructuredAlias[0] !== originalArgs[0]) return results;

    const score = countMatches(destructuredAlias, originalArgs);

    results.push({ matchAlias, score });

    return results;
  }, []);

  const originalCommand = spawn('git', originalArgs, { stdio: 'inherit' });

  originalCommand.on('close', () => {
    const result = results.sort(descendingScore)[0];
    if (result) {
      console.log(`\n🧞‍♂️  Woah there buddy, easy on the keys! Next time you can use \`git ${result.matchAlias}\` instead.`);
    }
  });
});

