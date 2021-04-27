import {useCallback, useState} from 'react'
import './style.less'
import marked from "marked";

export default function MdEditor() {
    const [content, setContent] = useState('# hhhhh')
    const onChange = function (event: any) {
        event.preventDefault();
        setContent(event.target.value)
    }
    useCallback(() => {
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, lang) {
                const hljs = require('highlight.js');
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
    }, [])
    return <div className="md_editor">
        <div className="left">
            <textarea defaultValue={content} rows={6} style={{width: '100%', height: '100%'}}
                      onChange={(e) => onChange(e)}/>
        </div>
        <div className="right" dangerouslySetInnerHTML={{__html: marked(content)}}/>
    </div>
}

