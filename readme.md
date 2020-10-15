# fund-cli

> fund-cli 是一款在终端查看基金情况的 cli 工具

![demo]('/demo.gif')

## Install

```bash
$ npm install -g @qschqd/fund-cli
```

## CLI

```
$ fund

# 查看帮助信息
$ fund --help

```

## Keyboard operations

- 按`esc`键在`排行榜`，`自选`, `实时大盘`之间切换
- 在`排行榜`, `自选`列表页，按**j/k**选中某一行，在按**空格**键添加自选或者取消自选
- 在`排行榜`中，按**左右键**进行翻页
- 在`排行榜`中，使用**上下键**根据类型筛选列表
- 在`排行榜`中，使用`Tab`键(正向)，或者`Shift+Tab`(反向)根据公司筛选列表
- 在`自选`中，输入基金代码(支持逗号分割的多个基金代码)，**回车**添加自选
- 按`q`键或者`Ctrl + C`退出应用
