const { append, compose, countBy, filter, head, identity, map, match, prop,
  reduce, reverse, sortBy, take, test, toPairs, values } = require('ramda');

// saveAndQuit :: Regex
const saveAndQuit = /:wq/;

// getCommand :: str -> str
const getCommand = compose(head, match(/:(%s|\S+)/g));

const rules = {
  saves: (commands) => {
    const saves = filter(test(saveAndQuit), commands);
    if (saves) {
      return {
        message: `you used \`:wq\` ${saves.length} times, try \`ZZ\``,
      };
    }
    return {};
  },

  commandCommands: (commands) => {
    const mostCommon = compose(
      take(10),
      reverse,
      sortBy(prop(1)),
      toPairs,
      countBy(identity),
      map(getCommand)
    );
    const mc = mostCommon(commands);
    const hhead = compose(head, head);

    return {
      message: `Your most common command is \`${hhead(mc)}\``,
    };
  },
};

const analyzeCommands = commands =>
  reduce((acc, rule) => append(rule(commands), acc), [], values(rules));

module.exports = analyzeCommands;

