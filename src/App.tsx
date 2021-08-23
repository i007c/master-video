import React from 'react'
import ReactDOM from 'react-dom'

// components
import Head from './components/Head'
import Home from './components/Home'

const App = () => {
    return (
        <>
            <Head />
            <Home />
        </>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
