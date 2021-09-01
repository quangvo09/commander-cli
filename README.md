# commander-cli

To help execute a sequence commands, which you need to do multiple times. It's boring right?

### Install

```
  npm install -g @smartapp-org/commander-cli
```

### How to use

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
3. Example:

![commander-cli-new-branch](https://user-images.githubusercontent.com/6206464/131709697-a58d17fa-3bdd-42e1-b7db-a8d3b6cc9b95.gif)
