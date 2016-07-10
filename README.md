#### Vim Analyzer

Every keystroke, command, and edit is tracked in vim.

You could build something that analyzes a .viminfo file and keystroke output
that reports on your daily vim usage and gives you back hints, tips, and
optimizations for more efficient text editing.

Could return a list of macros or functions for later use.
Shows stats from daily usage and compares you to other people (opt-in).

```
You recorded 32 macros today
You recorded 16 macros that you've recorded previously
You used j more than once in a row 245 times. Consider using / or text objects to move more efficiently. This could save you x keystrokes and y time.
```

## DEV SETUP

```
npm install
node index.js # uses ~/.viminfo
node index.js dummyVimInfo # for trying out another file
```

