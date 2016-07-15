const { all, append, compose, countBy, filter, head, identity, map, match, prop,
  reduce, reverse, sortBy, tail, take, test, toPairs, values, zip } = require('ramda');

const saveAndQuit = /:wq/;
const split = /:split/;
const vsplit = /:vsplit/;
const help = /:help/;
const bnext = /:bnext/;

// getCommand :: str -> str
const getCommand = compose(head, match(/:(%s|\S+)/g));

// plTimes :: int -> str
const plTimes = t => t === 1 ? 'once' : `${t} times`;

// testShorthand :: regex -> string -> ([command] -> result)
const testShorthand = (pattern, replacement) =>
  commands => {
    const functions = map(getCommand)(commands);
    const filtered = filter(test(pattern), functions);
    if (filtered.length) {
      const pluralized = plTimes(filtered.length);
      return {
        message: `you used ${pattern} ${pluralized}, use the shorthand ${replacement} instead`,
      };
    }

    return {};
  };

// rules :: { k: Rule }
//  Rule :: [command] -> result
const rules = {
  shorthandSplit: testShorthand(split, ':sp'),
  shorthandVsplit: testShorthand(vsplit, ':vs'),
  shorthandHelp: testShorthand(help, ':h'),
  shorthandBnext: testShorthand(bnext, ':bn'),

  multipleQuits: (commands) => {
    const functions = map(getCommand)(commands);
    const offsetFunctions = tail(functions);

    const result = reduce((acc, valAndNext) => {
      if (all(test(/:q$/), valAndNext)) {
        return append(true, acc);
      }
      return acc;
    }, [], zip(functions, offsetFunctions));

    if (result.length) {
      return {
        message: 'you used :q twice in a row - try :on(ly) to close all but one window',
      };
    }
  },

  saves: (commands) => {
    const saves = filter(test(saveAndQuit), commands);
    if (saves) {
      const pluralized = plTimes(saves.length);
      return {
        message: `you used \`:wq\` ${pluralized}, try ZZ`,
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
      message: `Your most common command is ${hhead(mc)}`,
    };
  },
};

const analyzeCommands = commands =>
  reduce((acc, rule) => append(rule(commands), acc), [], values(rules));

module.exports = analyzeCommands;

