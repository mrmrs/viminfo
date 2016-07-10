const { __, assoc, compose, drop, head, isEmpty, map, reduce, reject, replace,
  split, tail, trim } = require('ramda');

// removeStr :: str -> str -> str
const removeStr = replace(__, '');

// splitAtHeaders :: str -> [str]
const splitAtHeaders = split('# ');

// rejectEmpty :: [a] -> [a]
const rejectEmpty = reject(isEmpty);

// splitLines :: str -> [str]
const splitLines = split('\n');

// cleanTitle :: str -> str
const cleanTitle = compose(
  trim,
  removeStr(/:/g),
  removeStr(/\(newest first\)/g),
  removeStr(/\(newest to oldest\)/g)
);

// title :: [str] -> str
const title = compose(cleanTitle, head);

// items :: [str] -> [str]
const items = tail;

// intoObject :: {k: v} -> [str] -> {k: v}
const intoObject = (acc, val) => assoc(title(val), items(val), acc);

// removeIntro :: [str] -> [str]
const removeIntro = drop(2);

// processVimInfo :: str -> {k: v}
const processVimInfo = compose(
  // tap(x => console.log(keys(x))),
  reduce(intoObject, {}),
  removeIntro,
  rejectEmpty,
  map(compose(rejectEmpty, splitLines)),
  splitAtHeaders
);

module.exports = processVimInfo;
