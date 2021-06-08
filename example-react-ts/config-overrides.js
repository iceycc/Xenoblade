const {
    override,
    addLessLoader, // less配置函数
    // fixBabelImports, // 按需加载配置函数
    addBabelPlugins, // babel插件配置函数
    addWebpackAlias, // /路径别名
    addWebpackModuleRule
} = require('customize-cra');
const path = require("path");
const images = require('remark-images')
const emoji = require('remark-emoji')
module.exports = override(
    ...addBabelPlugins( // 支持装饰器
        [
            '@babel/plugin-proposal-decorators',
            {legacy: true}
        ]
    ),
    // fixBabelImports('import', { // antd 按需加载
    //     libraryName: 'antd',
    //     libraryDirectory: 'es',
    //     style: true  //自动打包相关的样式 默认为 style:'css',这里需要改为true
    // }),

    // md文件
    addWebpackModuleRule({
        test: /\.md$/,
        use: './loader/md.loader'
    }),
    addWebpackModuleRule({
        test: /\.mdxx$/,
        use: ['babel-loader', './loader/mdx.loader']
    }),
    addWebpackModuleRule({
        test: /\.mdx$/,
        use: ['babel-loader',  {
            loader: '@mdx-js/loader',
            options: {
                remarkPlugins: [images, emoji]
            }
        }]
    }),
    addLessLoader({

        lessOptions: {
            strictMath: true,
            noIeCompat: true,
            javascriptEnabled: true,
            localIdentName: '[local]--[hash:base64:5]',
            modifyVars: {
                "@primary-color": "#1DA57A", // for example, you use Ant Design to change theme color.
            },
            cssLoaderOptions: {}, // .less file used css-loader option, not all CSS file.
            cssModules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
            }
        }
    }),
    addWebpackAlias({ //路径别名
        '@': path.resolve(__dirname, 'src'),
    }),
    (config) => {
        // console.log('---'.config)
        // todo 配置less？
        //修改、添加loader 配置 :
        // 所有的loaders规则是在config.module.rules(数组)的第二项
        // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
        // 修改 less 配置 ，规则 loader 在第7项(具体可以打印配置)
        // const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
        // loaders[8].use.push({
        //     loader: [
        //         // compiles Less to CSS
        //         "style-loader",
        //         "css-loader",
        //         "less-loader",
        //     ]
        // })
        //
        // console.log(loaders[8])
        config.node.fs = 'empty'
        return config
    }
)
