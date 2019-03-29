## git-allyias

A cli ally to help you learn your overly complex git aliases.

#### Install

```
> git clone ... && cd ..
> yarn link
```

yes... very lazy

#### Use

```
> g rebase origin/master --autosquash -i
> ...
> Successfully rebased and updated refs/heads/master.
> 
> 🧞‍♂️  Woah there buddy, easy on the keys! Next time you can use `git romas` instead.
```

assumimg you had...

```
[alias]
    romas = rebase -i --autosquash origin/master
```