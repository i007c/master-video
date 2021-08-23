import React from 'react'
import ReactDOM from 'react-dom'

import { Helmet } from 'react-helmet'

import favicon from './static/img/favicon.ico'

const App = () => {
    return (
        <>
            <Helmet>
                <title>00 Team Video Player</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            xx
        </>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
