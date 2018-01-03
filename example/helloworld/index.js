import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Route from '../../lib/Route'
import Link from '../../lib/Link'

const Home = () => (<div>home</div>)
const About = () => (<div>about</div>)
const Xxx = ({match}) => (<div>{match.params.id}</div>)
const NotFound = () => (<div>NotFound</div>)

class HelloWorld extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">about</Link></li>
                    <li><Link to="/xxx/12">xxx</Link></li>
                </ul>

                <hr />
                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/xxx/:id" component={Xxx} />
                    <Route component={NotFound} />
            </div>
        )
    }
}

ReactDOM.render(<HelloWorld/>, document.getElementById("root"))
