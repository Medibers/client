import React from 'react'
import ReactDOM from 'react-dom'

import App from 'views/app/RootAppView'
import Wrapper from 'tests/Wrapper'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Wrapper>
      <App />
    </Wrapper>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
