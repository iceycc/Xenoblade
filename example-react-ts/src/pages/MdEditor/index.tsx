import {useState} from 'react'
import './style.less'
import './md_html.less'
import marked from './mark'
import * as React from 'react';
export default function MdEditor() {
    const [content, setContent] = useState('' +
        '---\n' +
        'title: 弄懂JavaScript面向对象\n' +
        'date: 2018-09-21 09:11:41\n' +
        'categories:\n' +
        '- 知识整理\n' +
        'tags:\n' +
        '- JavaScript\n' +
        '---\n' +
        '好好弄下JavaScript面向对象，毕竟自己没对象。。。  \n' +
        '![](http://image.icey.cc/2018-10-07-3729.jpg)\n' +
        '<!-- more -->\n' +
        '\n' +
        '> 基本概念\n' +
        '\n' +
        '哈哈，只是想简单的整理下js面向对象中的公有、私有、静态属性和方法的概念。\n' +
        '\n' +
        '# js面向对象之公有、私有、静态属性和方法详解\n' +
        '## 共有属性和共有方法\n' +
        '```javascript\n' +
        'function User(name,age){\n' +
        '    this.name = name; // 公有属性\n' +
        '    this.age = age; \n' +
        '}\n' +
        'User.prototype.sayHi = function(){ // 公有方法\n' +
        '    console.log(\'I am \'+this.name +\',\' + this.age + \'了\')\n' +
        '}\n' +
        '\n' +
        'let user1 = new User(\'冰洋\',26)\n' +
        'user1.sayHi()\n' +
        '```\n' +
        '\n' +
        '## 私有属性和私有方法\n' +
        '```javascript\n' +
        'function User2(name,age){\n' +
        '    var name = name; // 私有属性\n' +
        '    var age = age;\n' +
        '    function sayHi(){ // 私有方法\n' +
        '        console.log(\'I am \'+name +\',\' + age + \'了\') \n' +
        '    }\n' +
        '    sayHi()\n' +
        '}\n' +
        'let user2 = new User2(\'冰洋2\',26)\n' +
        '```\n' +
        '\n' +
        '## 静态属性和静态方法\n' +
        '在php中，无需实例化就可以调用的方法就叫静态方法，js也一样，无需实例化，即用new操作符实化对象，就可调用对象的方法和属性。\n' +
        '```javascript\n' +
        'function User3(){}\n' +
        'User3.age = 26;\n' +
        'User3.myName = \'冰洋3\'\n' +
        'User3.sayHi = function(){\n' +
        '    console.log(this.name)  // 返回该构造函数短name属性了\n' +
        '    console.log(\'I am \'+this.myName +\',\' + this.age + \'了\') \n' +
        '}\n' +
        '// 无需实例化\n' +
        'User3.sayHi()\n' +
        '```\n' +
        '## \n' +
        '## 静态类\n' +
        '静态方法和属性无需安装以上得方法\n' +
        '```javascript\n' +
        'var User4 = {\n' +
        '    init:function(name,age){\n' +
        '        this.name = name;\n' +
        '        this.age = age;\n' +
        '    },\n' +
        '    sayHi:function(){\n' +
        '        console.log(\'I am \'+this.name +\',\' + this.age + \'了\') \n' +
        '    }\n' +
        '}\n' +
        'User4.init(\'冰洋4\',26)\n' +
        'User4.sayHi()\n' +
        '```\n' +
        '\n' +
        '## 公有方法的调用规则\n' +
        '- 调用公有方法，我们必需先实例化对象\n' +
        '- ' +
        '')
    const onChange = function (event: any) {
        event.preventDefault();
        setContent(event.target.value)
    }
    return <div className="md_editor">
        <div className="left">
            <textarea defaultValue={content} rows={6} style={{width: '100%', height: '100%'}}
                      onChange={(e) => onChange(e)}/>
        </div>
        <div className="right md_html" dangerouslySetInnerHTML={{__html: marked(content)}}/>
    </div>
}

