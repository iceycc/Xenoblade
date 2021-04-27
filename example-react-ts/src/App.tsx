import React from 'react';
import StopWatch from './components/StopWatch'
import Router from './router'
function App() {
    console.log((StopWatch as any).isTestable)
    return (
        <div className="App" style={{width: '100%', height: '100%'}}>
            <Router/>
        </div>
    );
}

export default App;
