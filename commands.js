const { append, compose, countBy, filter, head, identity, map, match, prop,
  reverse, sortBy, take, test, toPairs } = require('ramda')

// saveAndQuit :: Regex
const saveAndQuit = /:wq/

// getCommand :: str -> str
const getCommand = compose(head, match(/:(%s|\S+)/g))

const analyzeCommands = commands => {
  // this is gross
  let suggestions = []
  const saves = filter(test(saveAndQuit), commands)
  if (saves) {
    suggestions = append({
      message: `you used :wq ${saves.length} times, try 'ZZ'`
    }, suggestions)
  }
  const commandHeads = map(getCommand)
  const mostCommon = compose(
    take(10),
    reverse,
    sortBy(prop(1)),
    toPairs,
    countBy(identity),
    commandHeads
  )
  const mc = mostCommon(commands)
  const hhead = compose(head, head)
  suggestions = append({
    message: `Your most common command is ${hhead(mc)}`
  }, suggestions)

  return suggestions
}

module.exports = analyzeCommands
