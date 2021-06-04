import React from 'react';
import StopWatch from './components/StopWatch'
import Routers, {routes} from './router'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import "./App.less"
function App() {
    console.log((StopWatch as any).isTestable)
    return (
        <div className="App" style={{width: '100%', height: '100%'}}>
            <Router>
                <nav>
                    <ul className="nav_list">
                        {
                            routes.map((lk,index) => {
                                return <li key={index}>
                                    <Link to={lk.path}>{lk.title}</Link>
                                </li>
                            })
                        }
                    </ul>
                </nav>
                <Routers/>
            </Router>
        </div>
    );
}

export default App;
