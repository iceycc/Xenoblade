import * as React from 'react'


@testable('test')
export default class StopWatch extends React.Component {
    componentDidMount() {

    }
    render() {
        return <div>
            1
        </div>
    }
}

function testable(isTestable:string) {
    return function(target:any){
        target.isTestable = isTestable;
    }
}

