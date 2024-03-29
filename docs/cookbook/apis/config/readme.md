在项目的根目录下创建一个名为 `.knosysrc` 且内容是 JSON 的文件——

## 配置项

| 属性名 | 值类型/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `command` | `string` | - | 当前项目的 npm scripts 命令实现所在文件夹的相对路径 |
| `site` | `SiteConfig` | - | 要部署的静态站点相关构建用信息，详见下方 |

### `site`

配置项 `site` 的值是个对象，可以配置多个站点，属性名为站点名称，属性值为具体配置；若只有一个站点，属性名应为 `default`。

生成的站点文件在操作系统用户文件夹下的 `.knosys/sites` 中。

属性值的详细信息如下：

| 属性名 | 值类型/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `alias` | `string` | - | 站点别名，没指定时会取站点名称 |
| `source` | `string` | - | 站点源码文件夹 |
| `data` | `string` | - | 数据源文件夹 |
| `generator` | `string` | `'jekyll'` | [静态站点生成器](https://jamstack.org/generators/) |
| `git` | `GitConfig` | - | 要部署到的 Git 远程仓库及分支，详见下方 |
| `cname` | `string` | - | 自定义域名 |

#### `git`

| 属性名 | 值类型/可选值 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | - | Git 远程仓库地址 |
| `branch` | `string` | `'master'` | Git 远程仓库分支 |
