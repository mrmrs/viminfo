## Vim Analyzer (WIP)

Every keystroke, command, and edit is tracked in vim.

You could build something that analyzes a combination of .viminfo, undo files,
and keystroke output that reports on your daily vim usage and gives you back
hints, tips, and optimizations for more efficient text editing. The productization / design
of the interface could work a number of different ways (not mutually exclusive)

- Could give you a report within vim when you close vim (and save it for future usage)
- Could email a report or create a webpage with the stats (could track efficiency over time)

### Feature ideas
- Return a list of macros or functions for repeated command sequences above a certain count or percentage threshold
- Show stats from daily usage and compares you to other people (opt-in).
- Show total amount of commands used
- How many times you read help, related topic links
- If :q is used more than once in a row suggest using :only
- Create session file that loads most commonly used files per directory into buffer
- Suggest use of shorthand notation when longhand is used for commands i.e
  - :help :h
  - :split :sp
  - :vsplit :vsp
  - :bnext :bn
- Suggest shortcut commands when chained commands are used i.e
  - `d$` → `D`
  - `li` → `a`
  - `$i` → `A`
```
You recorded 32 macros today
You recorded 16 macros that you've recorded previously
You used j more than once in a row 245 times. Consider using / or text objects to move more efficiently. This could save you x keystrokes and y time.
```

## DEV SETUP

```
npm install
npm start
```

## Using a file that isn't ~/.viminfo
Currently ```npm start``` just calls ```node index.js```
If you want to use an alternate path/name for your viminfo file
you can pass in the file name as an argument

```
node index.js # uses ~/.viminfo
node index.js dummyVimInfo # for trying out another file
```

