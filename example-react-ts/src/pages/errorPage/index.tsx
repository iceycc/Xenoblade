import { useEffect } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary'
import * as React from 'react';
import {useState} from 'react';
function UserList() {
    // throw new Error('1111111')
    return <div>
        <button onClick={() => {
            throw new Error('抱错啊')
        }}>click
        </button>
    </div>
}
const MakeError = () => {
    useEffect(() => {
        const number = Math.random();
        // if (number > 0.5) {
        //     throw new Error('大于0.5');
        // }
        throw new Error('大于0.5');
    }, []);

    return <div/>
}

export default function ErrorPages() {
    const [hasError, setHasError] = useState(false);

    const onError = (error: Error) => {
        // 日志上報
        console.log(error);
        setHasError(true);
    }
    const ErrorFallback = (props:any)=>{
        return <div {...props}>
            出错了2
        </div>
    }
    return (
        <div>
            <ErrorBoundary fallback={<div>出错啦</div>} onError={onError}>
                <MakeError />
            </ErrorBoundary>

            <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
                <MakeError />
            </ErrorBoundary>

            <ErrorBoundary
                fallbackRender={(fallbackProps) => <ErrorFallback {...fallbackProps} />}
                onError={onError}
            >
                <MakeError />
            </ErrorBoundary>
        </div>
    )
}
