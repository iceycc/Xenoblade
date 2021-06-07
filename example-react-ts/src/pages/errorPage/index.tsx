
import ErrorBoundary from '../../components/ErrorBoundary'
function UserList(){
    // throw new Error('1111111')
    return <div>
        <button onClick={()=>{
            throw new Error('抱错啊')
        }}>click</button>
    </div>
}
export default function ErrorPages(){
    return <ErrorBoundary fallback={<div>出错啦</div>} onError={()=>{console.error('出错啦')}}>
               <UserList />
        </ErrorBoundary>
}
