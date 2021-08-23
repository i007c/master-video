import React from 'react'
import ReactDOM from 'react-dom'

// components
import Head from './components/Head'

const App = () => {
    return (
        <>
            <Head />
            <span>Welcome !</span>
        </>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
