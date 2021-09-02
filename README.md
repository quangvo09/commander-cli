# commander-cli

To help execute a sequence commands, which you need to do multiple times. It's boring right?

### Install

```
  npm install -g @smartapp-org/commander-cli
```

### Configuration

- This tool will create the configuration file `.cmdrc`, you have to update `.gitignore` if do not push it to github.

- You can customize default `base branch`, `assignee`, `reviewer`, `label` in the `.cmdrc` file. This configurations will be use when creating new PR.

### How to use

```
➜  ~ cmd
_________     _____  ________    _________ .____    .___
\_   ___ \   /     \ \______ \   \_   ___ \|    |   |   |
/    \  \/  /  \ /  \ |    |  \  /    \  \/|    |   |   |
\     \____/    Y    \|    `   \ \     \___|    |___|   |
 \______  /\____|__  /_______  /  \______  /_______ \___|
        \/         \/        \/          \/        \/

Usage: cmd [options] [command]

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  br:create|brc   Create a new branch
  pr:create|prc   Create a new pull-request
  help [command]  display help for command
```

### 1. Create new branch

```
cmd br:create
```

Or

```
cmd brc
```

1. Choose the purpose of new branch: `Feature`, `Hotfix` or `Release`
2. Input the branch name

#### Example:

![commander-cli-new-branch](https://user-images.githubusercontent.com/6206464/131709697-a58d17fa-3bdd-42e1-b7db-a8d3b6cc9b95.gif)

### 2. Create new PR

```
cmd pr:create
```

Or

```
cmd prc
```

#### Example:

![commander-cli-new-pr](https://user-images.githubusercontent.com/6206464/131869051-40598ac4-2e1b-40f4-96a7-d03298fefe1d.gif)


