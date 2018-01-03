import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compilePath, matchPath } from './util'
import history from './history'

class Route extends Component {
    static propTypes = {
        path: PropTypes.string,
        component: PropTypes.func,
        render: PropTypes.func,
        exact: PropTypes.bool,
        strict: PropTypes.bool,
    }

    constructor(props) {
        super(props)

        this.pathReAndKeys = compilePath(props.path, {
            exact: props.exact,
            strict: props.strict,
            sensitive: props.sensitive
        })
        this.state = {
            match: matchPath(location.pathname, props, this.pathReAndKeys)
        }
        this.unlisten = history.listen(this.urlChange)
    }

    componentWillReceiveProps(nextProps) {
        const {path, exact, strict} = this.props
        if (nextProps.path !== path || nextProps.exact !== exact || nextProps.strict !== strict) {
            console.warn("you should not change path, exact, strict props")
        }
    }

    componentWillUnmount() {
        this.unlisten()
    }

    urlChange = () => {
        const pathname = location.pathname
        this.setState({
            match: matchPath(pathname, this.props, this.pathReAndKeys)
        })
    }

    render() {
        const { match } = this.state
        if(!match) return null

        const { children, component, render } = this.props

        if (component) {
            const Comp = component
            return <Comp match={match}/>
        }
        if (render) {
            return render({ match })
        }

        return React.cloneElement(React.Children.only(children), { match })
    }
}

export default Route