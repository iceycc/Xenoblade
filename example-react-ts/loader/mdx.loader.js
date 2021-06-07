const marked = require('marked')
const hljs = require('highlight.js')
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        // console.log(code, lang)
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, {language}).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

module.exports = source => {
    // 将 markdown 转换为 html 字符串
    const html = JSON.stringify(marked(source))
    // 将 html 字符串拼接为一段导出字符串的 JS 代码
    const code = `
    import * as React from 'react';
    export default function fn(){
        return <div className="mdx_parser" dangerouslySetInnerHTML={{__html:${html}}}></div>
    }
    `
    // console.log(code)
    return code
}
