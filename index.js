const fs = require('fs');
const path = require('path');
const commands = require('./src/commands');
const processVimInfo = require('./src/processVimInfo');

// actualVimInfo :: _ -> path
const actualVimInfo = () => {
  const HOME = process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE;
  return path.join(HOME, '.viminfo');
};

// impure
// resolveInfoPath :: [args] -> path
const resolveInfoPath = (args) => {
  const a = args[2];
  if (a) {
    return path.resolve(a);
  }
  return actualVimInfo();
};

fs.readFile(resolveInfoPath(process.argv), { encoding: 'utf-8' }, (err, res) => {
  if (err) { throw err; }
  const info = processVimInfo(res);
  console.log(commands(info['Command Line History']));
});
