import React from 'react'
import ReactDOM, { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
try { injectTapEventPlugin() } catch (err) { console.error('err injectTapEventPlugin') }

import App from './components/App/App'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import darkBaseTheme from './themes/dark_theme'

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><App /></MuiThemeProvider>,
  document.getElementById('root')
)
