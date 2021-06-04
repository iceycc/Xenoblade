import marked from "marked";
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
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

// Override function
const renderer = {
    heading(text: string, level: any) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        console.log(text, level)
        return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
    },
    // code(code: any, infostring: any, escaped: any){
    //     console.log(code, infostring, escaped)
    //     return code
    // }
};

marked.use({ renderer });

export default marked
