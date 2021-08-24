import React from 'react'
import ReactDOM from 'react-dom'

// import video player
import MasterVideo from '../src/index'

const App = () => {
    return (
        <MasterVideo VideoSource={''} />
    )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))
