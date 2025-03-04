```bash
npm install -g @microsoft/rush --loglevel verbose

git clone git@github.com:qpjoy/i-know.git
rush init

# ~~~ git blame
# ~~~ git bisect

rush update
# 更新所有package.json中的文件到最新版本
rush update --full
# 更改pnpm-version 或 设置
rush update --full --purge

# !!! 重新安装 rush update --purge
rush rebuild --verbose

# 安装所有依赖B，但是不包括B的项目
rush build --to-except B
# Build only B and nothing else
rush build --only B
# 重新安装两个项目 和 依赖这两个的所有项目
rush rebuild --to widget --to widget-demo
# 重装这个库 和 所有依赖这个库的项目 和 所有 依赖这些项目的(树状有依赖)
rush rebuild --from widget

# "~1.2.3"
rush add --package example-lib@1.2.3
# "^1.2.3"
rush add --package example-lib@1.2.3 --caret
# update all example-lib
rush add --package example-lib@1.2.3 --make-consistent


rush remove --package example-lib

rush upgrade-interactive

# clean state
rush unlink
rush purge

# lib/my-toolchain


# de use install-run-rush
node common/scripts/install-run-rush.js --help
node common/scripts/install-run-rush.js install

# commit-msg

# prettier
rush init-autoinstaller --name rush-prettier
cd common/autoinstallers/rush-prettier
pnpm install prettier pretty-quick
rush update-autoinstaller --name rush-prettier

# pack tgz包
rush publish --pack --include-all --publish --release-folder releases/release-fe
# 确保有该target分支,apply生成log，需要提供远端分支
# --include-all 包含所有private分支?
rush publish --apply --target-branch main

```

# 添加 npm 用户

```bash
npm adduser
npm profile enable-2fa auth-and-writes

# 可以免费发布公有org包
## 在@qpjoy/qp-at-public的package.json目录下运行
npm publish --access public
```

### usage

1. 先 git add、commit，然后 rush change 会基于 repo url，对比本地和远端的子项目有没有更改。然后建议各个项目是否生成 change log,最后 rush publish --apply --target-branch
2. 当需要发版(也就是发 npm 包，或者上线版本)的时候，运行 rush chang，其他情况下只需要 git 操作。可以理解为 rush change 和 rush publish 只是管理员需要操作的。

# Plugins

Auto Rename Tag
ES7 React/Redux/GraphQL/React-Native Snippets
Prettier - Code Formatter
JavaScript (ES6) Code Snippets

#### Useful links

https://medium.com/itnext/build-a-scalable-front-end-with-rush-monorepo-and-react-part-1-dd50ae38ad3e