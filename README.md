# git-allyias

A cli ally to help you learn your overly complex git aliases by notifying you when you could have used an alias command.

## Install

```bash
npm install --global @lbennett/git-allyias
# OR
yarn global add @lbennett/git-allyias
```

## Usage

You can now use the `g` or `git-allyias` commands.

```
> g rebase origin/master --autosquash -i
> ...
> Successfully rebased and updated refs/heads/master.

> 🧞‍♂️  Woah there buddy, easy on the keys! Next time you can use `git romas` instead.
```

assumimg you had a `romas` alias like so...

```
[alias]
    romas = rebase -i --autosquash origin/master
```
