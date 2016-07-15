const { any, append, compose, countBy, filter, head, identity, map, match, prop,
  reduce, reverse, sortBy, take, test, toPairs, values } = require('ramda');

// saveAndQuit :: Regex
const saveAndQuit = /:wq/;
const split = /:split/;
const vsplit = /:vsplit/;
const help = /:help/;
const bnext = /:bnext/;

// getCommand :: str -> str
const getCommand = compose(head, match(/:(%s|\S+)/g));

const plTimes = t => t === 1 ? 'once' : `${t} times`;

const testShorthand = (pattern, replacement) =>
  commands => {
    const functions = map(getCommand)(commands);
    const filtered = filter(test(pattern), functions);
    if (filtered.length) {
      return {
        message: `you used ${pattern} ${plTimes(filtered.length)}, use the shorthand ${replacement} instead`,
      };
    }

    return {};
  };

const rules = {
  shorthandSplit: testShorthand(split, ':sp'),
  shorthandVsplit: testShorthand(vsplit, ':vs'),
  shorthandHelp: testShorthand(help, ':h'),
  shorthandBnext: testShorthand(bnext, ':bn'),
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

