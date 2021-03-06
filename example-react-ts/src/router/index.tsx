/**
 * 自己封装React-Router映射
 */
import {
    Switch,
    Route,
} from 'react-router-dom'

import MdEditor from '../pages/MdEditor'
import MdRender from '../pages/MdRender'
import WorkFlow from '../pages/WorkFlow'
import okMdxx from '../pages/Mdxx/ok.mdxx'
import * as React from "react";
import ExampleMdx from '../pages/Mdx/exmple.mdx'

interface IRoute {
    path: string
    name: string
    meta?: Record<any, any>
    component?: ((props?: any) => JSX.Element | null) | (new(props?: any) => React.Component<any, any>)
    routes?: IRoute[]
    title?: string
}

export const routes: IRoute[] = [
    {
        path: '/mdxxParse',
        name: 'mdxxParse',
        component: okMdxx,
        title: 'mdxx解析'
    },
    {
        path: '/mdxParse',
        name: 'mdxParse',
        component: ExampleMdx,
        title: 'mdx解析'
    },
    {
        path: '/mdEditor',
        name: 'mdEditor',
        component: MdEditor,
        title: 'markdown编辑器'
    },
    {
        path: '/MdRender',
        name: 'MdRender',
        component: MdRender,
        title: 'md转string'
    },
    {
        path: '/workFlow',
        name: 'WorkFlow',
        component: WorkFlow,
        title: '工作流程'
    },
    {
        path: '/errorBoundary',
        name: 'ErrorBoundary',
        component: React.lazy(()=> import('../pages/errorPage')),
        title: '异常边界'
    }
]

export default function Routers() {
    function RouteWithSubRoutes(route: IRoute) {
        return (
            <Route
                path={route.path}
                render={props => {
                    const Com = route.component
                    // pass the sub-routes down to keep nesting
                    // @ts-ignore todo
                    return <Com {...props} routes={route.routes}/>
                }
                }
            />
        );
    }

    return <>
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    </>
}
