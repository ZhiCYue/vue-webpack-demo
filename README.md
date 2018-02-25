# 项目框架

## 结构

```txt
.
├── app
│   ├── app.vue                         #引导页面
│   ├── component_modules               # 外部模块
│   │   ├── liuliang                    # 外部模块分组
│   │   └── shring
│   ├── components                      # 内部模块
│   │   ├── shared-components           # 内部共享模块
│   │   │   ├── ajax                    # 内部模块
│   │   │   │   └── index.js            # 内部模块主函数
│   │   │   ├── sr-full-loading
│   │   │   │   ├── index.js
│   │   │   │   └── src
│   │   │   │       ├── index.js
│   │   │   │       └── loading.vue
│   │   │   ├── sr-header
│   │   │   │   ├── index.js
│   │   │   │   └── main.vue
│   │   │   └── sr-utils                # 模块工具类（公用）
│   │   │       └── index.js
│   │   └── view-components             # 内部试图模块（可包含具体业务逻辑）
│   │       └── mea-header
│   │           ├── index.js
│   │           └── main.vue
│   ├── main.js                         # 引导函数
│   ├── modules                         # JS公用方法
│   │   └── api
│   │       └── system.js
│   ├── pages                           # 页面集合
│   │   ├── 404.vue
│   │   └── main                        # 分渠道的页面集合
│   │       ├── home                    # 页面
│   │       │   ├── banner.jpg
│   │       │   ├── index.js
│   │       │   └── main.vue
│   │       └── login
│   │           ├── index.js
│   │           └── main.vue
│   ├── public                          # 公用的静态文件
│   │   └── css
│   ├── router
│   │   └── index.js                    # 页面路由设置
│   ├── store                           # vuex存储
│   │   ├── index.js
│   │   ├── modules                     # vuex子模块定义
│   │   │   └── system.js
│   │   └── mutation-type.js            # 行为类型定义
│   └── templates
│       └── index.html
├── build                               # 构建相关
│   ├── build.js
│   ├── build.local.server.js
│   ├── build.profile.config.replacer.js
│   ├── build.utils.js
│   ├── webpack.config.base.js
│   ├── webpack.config.development.js
│   ├── webpack.config.local.js
│   ├── webpack.config.production.js
│   └── webpack.config.test.js
├── config                              # 配置
│   ├── index.js                        # 动态生成的配置文件，此文件每次生成都会动态替换，不要在此文件中增加配置
│   └── index.template.js               # 配置模板，配置写在此文件夹中，需要动态替换的参数使用“@...@”的形式，构建时会使用profile中的数据替换
├── package.json
├── package-lock.json
└── README.md                           # 开发人员必看
```

## 规范

1. 严格按照文件结构进行开发
1. 在开发前需要配置`build/build.js`中的配置信息：

    ```js
    profiles = {
        local: {
            profileFiles: ['D:/workspace/temp/website.properties'],
            webpackConfig: 'webpack.config.local.js'
        },
        development: {
            profileFiles: [''],
            webpackConfig: 'webpack.config.development.js'
        },
        test: {
            profileFiles: [''],
            webpackConfig: 'webpack.config.test.js'
        },
        production: {
            profileFiles: [''],
            webpackConfig: 'webpack.config.production.js'
        }
    };
    ```
    1. `profileFiles`: 配置相关环境的profile文件路径

1. 修改配置时：

    ```js
    module.exports = {
        staticDomain: '@website.demo.static_domain@',
        dynamicDomain: '@website.demo.dynamic_domain@'
    };
    ```
    1. 将`@...@`中的配置修改为profile文件中响应的配置

## 运行

1. 本地环境，执行：`npm run local`
1. 开发环境，执行：`npm run dev`
1. 测试环境，执行：`npm run test`
1. 生产环境，执行：`npm run prod`

## 修改本地调试配置

在`build/build.local.server.js`中修改配置：

```js
const DEV_CONFIG = {
    port: 9999,
    proxyTable: {
        '/api': {
            target: 'http://127.0.0.1:8899',
            changeOrigin: true
        }
    },
    autoOpenBrowser: true
};
```

## 修改webpack配置

在`build/webpack.config.{env}.js`中修改即可