# commander-cli

To help execute a sequence commands, which you need to do multiple times. It's boring right?

```
➜  ~ cmd -h
Usage: cmd [options] [command]

Options:
  -h, --help      display help for command

Commands:
  branch:create   Create a new branch
  help [command]  display help for command
```

### Create new branch

```
cmd branch:create
```

1. Choose the purpose of new branch: `Feature`, `Hotfix` or `Release`
2. Input the branch name

Example:

