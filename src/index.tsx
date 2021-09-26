
import ReactDOM from 'react-dom'
import { App } from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
	<App />,
	document.getElementById('root')
)

// https://cra.link/PWA
serviceWorkerRegistration.register()

// TODO send to an analytics endpoint. 
// https://bit.ly/CRA-vitals
reportWebVitals()
