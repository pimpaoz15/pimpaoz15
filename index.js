// index.js
const Mustache = require('mustache');
const fs = require('fs');
const fetch = require('node-fetch');
const MUSTACHE_MAIN_DIR = './main.mustache';

const getGitStats = async (username) => {
  const response = await fetch(`https://api.github.com/users/pimpaoz15}`);
  const data = await response.json();
  return {
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    contributions: data.contributions,
  };
};

const generateReadMe = async () => {
  const gitStats = await getGitStats('pimpaoz15');

  const readMeData = {
    gitStats,
  };

  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
    if (err) throw err;
    const output = Mustache.render(data.toString(), readMeData);
    fs.writeFileSync('README.md', output);
  });
};

generateReadMe();
