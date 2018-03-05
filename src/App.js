import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import search591 from './components/search591'
import search104 from './components/search104'

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Make Live Easier</h1>
						<section className="nav-wrap">
							<Link to="/search591">Search 591</Link>
							<Link to="/search104">Search 104</Link>
						</section>
					</header>

					<Route path={`/search591`} component={search591} />
					<Route path={`/search104`} component={search104} />
				</div>
			</Router>
		)
	}
}

export default App
