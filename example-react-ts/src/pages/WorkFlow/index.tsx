import G6, {Graph} from '@antv/g6';
import ReactDOM from 'react-dom';
import {useEffect, useRef} from 'react';
import {data} from './data'
export default function WorkFlow(props: any) {
    const ref = useRef(null);
    let graph: Graph | null = null;
    console.log('1==')
    useEffect(() => {
        if (!graph) {
            console.log(graph, '==')
            // eslint-disable-next-line react-hooks/exhaustive-deps
            graph = new G6.Graph({
                // @ts-ignore
                container: ReactDOM.findDOMNode(ref.current), // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
                width: 800, // Number，必须，图的宽度
                height: 500, // Number，必须，图的高度
                defaultNode: {
                    shape: 'circle'
                },
                defaultEdge: {
                    style: {
                        stroke: 'red'
                    }
                }
            });
        }
        graph.data(data); // 读取 Step 2 中的数据源到图上
        graph.render(); // 渲染图
    }, [])
    return <div className="g6_box" ref={ref}/>
}
