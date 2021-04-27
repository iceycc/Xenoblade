// @ts-ignore
import React from 'react';
import StopWatch from './components/StopWatch'
import Router from './router'
function App() {
    console.log((StopWatch as any).isTestable)
    return (
        <div className="App">
            <Router/>
        </div>
    );
}

export default App;
