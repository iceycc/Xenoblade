/**
 * 自己封装React-Router映射
 */
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import MdEditor from '../pages/MdEditor'

interface IRoute {
    path: string
    name: string
    meta?: Record<any, any>
    component?: (props: any) => JSX.Element
    children?: IRoute[]
}

const routes: IRoute[] = [{
    path: '/',
    name: '',
    children: [
        {
            path: '/mdEditor',
            name: 'mdEditor',
            component: MdEditor,
        },
    ]
}]

export default function Routers(props: Record<string, any>) {
    // @ts-ignore
    const RouteMap = function (propsOption: { routes: IRoute[] }) {
        return propsOption.routes.reduce((prev: JSX.Element[], next: IRoute) => {
            let routes
            if (next.children && Array.isArray(next.children)) {
                routes = [...prev, RouteMap({routes: next.children})]
            } else {
                prev.push((
                    <Route path={next.path} key={`${next.path}`}>
                        {next.component && next.component({...propsOption, meta: next.meta} as Record<string,any>)}
                    </Route>
                ))
                routes = prev
            }
            return routes
        }, [] as JSX.Element[])
    }
    return <>
        <Router>
            <Switch>
                <RouteMap routes={routes} {...props}/>
            </Switch>
        </Router>
    </>
}
