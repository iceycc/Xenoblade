import Home from '../../markdown/home.md'
export default function MdRender(){
    return <div>
        <div className="right" dangerouslySetInnerHTML={{__html: Home}}/>
    </div>
}
