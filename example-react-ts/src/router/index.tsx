/**
 * 自己封装React-Router映射
 */
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

const Page1 = () => <div>Page1</div>
const Page2 = () => <div>Page1</div>
const Page3 = () => <div>Page1</div>

interface IRoute {
    path: string
    name: string
    meta?: Record<any, any>
    component?: (props:any) => JSX.Element
    children?: IRoute[]
}

const routes: IRoute[] = [{
    path: '/',
    name: '',
    meta: {
        title: '111111',
    },
    children: [
        {
            path: '/page1',
            name: 'page1',
            component: Page1,
        },
        {
            path: '/page2',
            name: 'page2',
            component: Page2,
        },
        {
            path: '/page3',
            name: 'page3',
            component: Page3,
        }
    ]
}]

export default function (props:Record<string, any>) {
    let i = 0
    const RouteMap = function (propsOption: { routes: IRoute[] }) {
        i++
        return <>
            {
                propsOption.routes.map((item, index) => {
                    return <div key={`${i}-${index}`}>
                        {
                            item.children ? <RouteMap routes={item.children}/> : <Route path={item.path}>
                                {item.component && item.component({...propsOption, meta: item.meta} as any)}
                            </Route>
                        }
                    </div>
                })
            }
        </>
    }
    return <>
        <Router>
            <Switch>
                <RouteMap routes={routes} {...props}/>
            </Switch>
        </Router>
    </>
}
