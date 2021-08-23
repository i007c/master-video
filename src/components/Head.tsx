import React from 'react'

// helmet
import { Helmet } from 'react-helmet'

// favicon
import favicon from '../static/img/favicon.ico'

const Head = () => {
    return (
        <Helmet>
            <title>00 Team Video Player</title>
            <link rel='icon' href={favicon} />
            <meta charSet='UTF-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1.0'
            />
        </Helmet>
    )
}

export default Head
