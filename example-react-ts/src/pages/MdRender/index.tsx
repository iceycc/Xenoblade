import Home from '../../markdown/home.md'
import {Input, Button, InputProps} from 'antd';
import {useRef} from "react";
import * as React from 'react';

export default function MdRender() {
    let input1 = useRef< null>(null)
    return <div>
        <input ref={input1} placeholder="Basic usage"/>
        <Button onClick={()=>{
            console.log(input1)
        }}>按钮</Button>
        {/*<div className="right" dangerouslySetInnerHTML={{__html: Home}}/>*/}
    </div>

}
